import * as normalizr from 'normalizr';

import { Entities, LoadData, UpdatedEntitiesAndIds } from '../interfaces';

export type LoadDataByIdOptions = {
  id: string;
  schema: normalizr.schema.Entity;
  shouldFetchData?: (normalizeData: unknown) => boolean;
};

export default class LoadDataById implements LoadData {
  public id: LoadDataByIdOptions['id'];
  public schema: LoadDataByIdOptions['schema'];
  public shouldUpdateQueryPool: boolean;
  private shouldFetchDataCheck?: LoadDataByIdOptions['shouldFetchData'];

  constructor(options: LoadDataByIdOptions) {
    this.id = options.id;
    this.schema = options.schema;
    this.shouldFetchDataCheck = options.shouldFetchData;
    this.shouldUpdateQueryPool = false;
  }

  shouldFetchData({ entities }: { entities: Entities }) {
    const entity = entities[this.schema.key];

    if (!entity || !entity[this.id]) {
      // fetch data
      return true;
    }

    if (!!this.shouldFetchDataCheck) {
      return this.shouldFetchDataCheck(entity[this.id]);
    }

    // load data from store
    return false;
  }

  filter({ updates }: { updates: UpdatedEntitiesAndIds }) {
    const updatedIds = updates[this.schema.key];
    return updatedIds.includes(this.id);
  }

  loadData({ entities }: { entities: Entities }) {
    const entity = entities[this.schema.key];
    if (!entity) {
      throw new Error(`schema ${this.schema.key} is not yet loaded`);
    }
    return normalizr.denormalize(entity[this.id], this.schema, entities);
  }
}
