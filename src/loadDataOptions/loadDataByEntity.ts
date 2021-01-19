import * as normalizr from 'normalizr';

import { Entities, Entity, QueryPool } from '../interfaces';

type Options = {
  schema: [normalizr.schema.Entity];
  lookup?: (entity: Entity, entities: Entities) => string[];
};

export default class LoadDataByEntity {
  private schema: [normalizr.schema.Entity];
  private lookup?: (entity: Entity, entities: Entities) => string[];

  constructor(options: Options) {
    this.schema = options.schema;
    this.lookup = options.lookup;
  }

  shouldFetchData(entities: Entities, queryPool: QueryPool, url: string) {
    const entity = entities[this.schema[0].key];

    if (!entity) return true;
    /**
     * below logic is wrong, page1 fetch active RI, page2 fetch all RI.
     * in this case, page 2 will not fetch
     */
    if (!!this.lookup) return !this.lookup(entity, entities);

    return !Object.keys(queryPool).includes(url);
  }

  /**
   * current only response to change, add
   * need to handle case for delete
   *
   */
  shouldHookUpdate(changes: Entities, entities: Entities) {
    const updatedEntity = changes[this.schema[0].key];
    const entity = entities[this.schema[0].key];
    if (!updatedEntity || !entity) return false;

    if (!!this.lookup) {
      const dataIds = this.lookup(entity, entities);
      if (dataIds.length === 0) return true;
      return Object.keys(updatedEntity).some((id) => dataIds.includes(id));
    }

    return !!changes[this.schema[0].key];
  }
}
