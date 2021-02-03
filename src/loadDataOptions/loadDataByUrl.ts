import * as normalizr from 'normalizr';

import {
  QueryPool,
  Entities,
  UpdatedEntitiesAndIds,
  LoadData,
  Schema,
} from '../interfaces';

import { getFlattenEntityKeys } from '../utils';

export type LoadDataByUrlOptions = {
  schema: Schema;
  url: string;
  shouldUpdateQueryPool: boolean;
};

export default class LoadDataByUrl implements LoadData {
  public url: LoadDataByUrlOptions['url'];
  public schema: LoadDataByUrlOptions['schema'];
  public shouldUpdateQueryPool: LoadDataByUrlOptions['shouldUpdateQueryPool'] = true;

  constructor(options: LoadDataByUrlOptions) {
    this.schema = options.schema;
    this.url = options.url;
  }

  shouldFetchData({ queryPool }: { queryPool: QueryPool }) {
    return !queryPool[this.url];
  }

  loadData({
    entities,
    queryPool,
  }: {
    entities: Entities;
    queryPool: QueryPool;
  }): unknown {
    const dataIds = queryPool[this.url];
    return normalizr.denormalize(dataIds, this.schema, entities);
  }

  filter({
    updates,
    queryPool,
  }: {
    updates: UpdatedEntitiesAndIds;
    queryPool: QueryPool;
  }): boolean {
    const isUrlExist = queryPool[this.url];
    if (!isUrlExist) return false;
    const entityKeys = getFlattenEntityKeys(this.schema);

    const intersection = Object.keys(updates).filter((key) =>
      entityKeys.includes(key)
    );
    return intersection.length !== 0;
  }
}
