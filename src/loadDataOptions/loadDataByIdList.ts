import * as normalizr from 'normalizr';

import {
  Entities,
  Entity,
  QueryPool,
  UpdatedEntitiesAndIds,
  LoadData,
  DenormalizeInput,
} from '../interfaces';

export type LoadDataByIdListOptions = {
  schema: [normalizr.schema.Entity];
  url: string;
  findEntityIds: (entity: Entity, entities: Entities) => DenormalizeInput;
};

export default class LoadDataByIdList implements LoadData {
  public schema: LoadDataByIdListOptions['schema'];
  public url: LoadDataByIdListOptions['url'];
  public shouldUpdateQueryPool: boolean;
  private findEntityIds: LoadDataByIdListOptions['findEntityIds'];

  constructor(options: LoadDataByIdListOptions) {
    this.schema = options.schema;
    this.url = options.url;
    this.findEntityIds = options.findEntityIds;
    this.shouldUpdateQueryPool = true;
  }

  shouldFetchData({
    entities,
    queryPool,
  }: {
    entities: Entities;
    queryPool: QueryPool;
  }) {
    const entity = entities[this.schema[0].key];

    if (!entity) return true;

    const entityIds = this.findEntityIds(entity, entities);

    if (entityIds.length > 0) return false;
    return !queryPool[this.url];
  }

  filter({ updates }: { updates: UpdatedEntitiesAndIds }): boolean {
    return !!updates[this.schema[0].key];
  }

  loadData(entities: Entities): unknown {
    const entity = entities[this.schema[0].key];
    if (!entity) {
      throw new Error(`schema ${this.schema[0].key} is not yet loaded`);
    }

    const dataIds = this.findEntityIds(entity, entities);
    return normalizr.denormalize(dataIds, this.schema, entities);
  }

  // parseForDistinct({ entities }: { entities: Entities }) {
  //   const entity = entities[this.schema[0].key] as Entity;
  //   const entityIds = this.findEntityIds(entity, entities);
  //   return entityIds;
  // }

  // distinct(currentEntityIds: string[], nextEntityIds: string[]) {
  //   return (
  //     currentEntityIds.length == nextEntityIds.length &&
  //     currentEntityIds.every((id, idx) => {
  //       return id === nextEntityIds[idx];
  //     })
  //   );
  // }
}
