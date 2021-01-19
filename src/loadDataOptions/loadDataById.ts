import * as normalizr from 'normalizr';

import { Entities, LoadData } from '../interfaces';

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

  shouldFetchData(entities: Entities) {
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

  filter({ changes }: { changes: Entities }) {
    const updatedEntity = changes[this.schema.key];
    return !!updatedEntity && !!updatedEntity[this.id];
  }
  distinct() {
    return false;
  }
}
