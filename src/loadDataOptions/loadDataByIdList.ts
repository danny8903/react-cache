import * as normalizr from 'normalizr';

import { Entities, Entity, QueryPool, Remove, LoadData } from '../interfaces';

export type LoadDataByIdListOptions = {
  schema: [normalizr.schema.Entity];
  findEntityIds: (entity: Entity, entities: Entities) => string[];
};

export default class LoadDataByIdList implements LoadData {
  private schema: LoadDataByIdListOptions['schema'];
  private findEntityIds: LoadDataByIdListOptions['findEntityIds'];

  constructor(options: LoadDataByIdListOptions) {
    this.schema = options.schema;
    this.findEntityIds = options.findEntityIds;
  }

  shouldFetchData({ entities }: { entities: Entities }) {
    const entity = entities[this.schema[0].key];

    if (!entity) return true;

    const entityIds = this.findEntityIds(entity, entities);
    return entityIds.length === 0;
  }

  filter({ changes, remove }: { changes: Entities; remove: Remove }): boolean {
    if (!!changes) {
      return !!changes[this.schema[0].key];
    }

    if (!!remove) {
      return !!remove[this.schema[0].key];
    }

    console.error('Expect changes or remove, but got undefined');
    return false;
  }

  distinct(currentEntityIds: string[], nextEntityIds: string[]) {
    return (
      currentEntityIds.length == nextEntityIds.length &&
      currentEntityIds.every((id, idx) => {
        return id === nextEntityIds[idx];
      })
    );
  }
}
