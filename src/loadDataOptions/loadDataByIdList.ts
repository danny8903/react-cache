import * as normalizr from 'normalizr';

import { getSubSchemasKeys } from '../utils';

import {
  Entities,
  Entity,
  UpdatedEntitiesAndIds,
  LoadData,
} from '../interfaces';

export type LoadDataByIdListOptions = {
  schema: [normalizr.schema.Entity];
  findEntityIds?: (entity: Entity, entities: Entities) => string[];
};

export default class LoadDataByIdList implements LoadData {
  public schema: LoadDataByIdListOptions['schema'];
  private findEntityIds: LoadDataByIdListOptions['findEntityIds'];

  constructor(options: LoadDataByIdListOptions) {
    this.schema = options.schema;
    this.findEntityIds = options.findEntityIds;
  }

  shouldFetchData({ entities }: { entities: Entities }) {
    const entity = entities[this.schema[0].key];

    if (!entity) return true;

    const entityIds = this.findEntityIds
      ? this.findEntityIds(entity, entities)
      : Object.keys(entity);

    return !(entityIds.length > 0);
  }

  filter({ updates }: { updates: UpdatedEntitiesAndIds }): boolean {
    const keys = getSubSchemasKeys(this.schema[0]);

    const intersection = Object.keys(updates).filter((key) =>
      keys.includes(key)
    );
    return intersection.length !== 0;
  }

  loadData(entities: Entities): unknown {
    const entity = entities[this.schema[0].key];
    if (!entity) {
      throw new Error(`schema ${this.schema[0].key} is not yet loaded`);
    }

    const dataIds = this.findEntityIds
      ? this.findEntityIds(entity, entities)
      : Object.keys(entity);
    return normalizr.denormalize(dataIds, this.schema, entities);
  }
}
