import * as normalizr from 'normalizr';

import { getSubSchemasKeys } from '../utils';

import { Entities, LoadData, UpdatedEntitiesAndIds } from '../interfaces';

export type LoadDataByIdOptions = {
  id: string;
  schema: normalizr.schema.Entity;
  shouldFetchData?: (normalizeData: unknown) => boolean;
};

export default class LoadDataById implements LoadData {
  public id: LoadDataByIdOptions['id'];
  public schema: LoadDataByIdOptions['schema'];
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
    const keys = getSubSchemasKeys(this.schema);

    const intersection = Object.keys(updates).filter((key) =>
      keys.includes(key)
    );
    return intersection.length !== 0;
  }

  loadData({ entities }: { entities: Entities }) {
    const entity = entities[this.schema.key];
    if (!entity) {
      throw new Error(`schema ${this.schema.key} is not yet loaded`);
    }
    return normalizr.denormalize(entity[this.id], this.schema, entities);
  }
}
