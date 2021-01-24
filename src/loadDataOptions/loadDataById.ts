import * as normalizr from 'normalizr';

import {
  Entities,
  LoadData,
  UpdatedEntitiesAndIds,
  NormalizeData,
} from '../interfaces';

export type LoadDataByIdOptions = {
  id: string;
  schema: normalizr.schema.Entity;
  shouldFetchData?: (normalizeData: unknown) => boolean;
};

export default class LoadDataById implements LoadData {
  private id: LoadDataByIdOptions['id'];
  private schema: LoadDataByIdOptions['schema'];
  private shouldFetchDataCheck?: LoadDataByIdOptions['shouldFetchData'];

  constructor(options: LoadDataByIdOptions) {
    this.id = options.id;
    this.schema = options.schema;
    this.shouldFetchDataCheck = options.shouldFetchData;
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

  normalize({ data }: Parameters<NormalizeData>[0]): ReturnType<NormalizeData> {
    const normalized = normalizr.normalize(
      data,
      this.schema
    ); /** pass userMergeStrategy and userProcessStrategy */

    return {
      ...normalized,
    };
  }
}
