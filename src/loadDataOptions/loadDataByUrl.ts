import * as normalizr from 'normalizr';

import {
  QueryPool,
  Entities,
  UpdatedEntitiesAndIds,
  LoadData,
  Schema,
  NormalizeData,
} from '../interfaces';

import { getFlattenEntityKeys } from '../utils';

export type LoadDataByUrlOptions = {
  schema: Schema;
  url: string;
};

export default class LoadDataByUrl implements LoadData {
  private schema: LoadDataByUrlOptions['schema'];
  private url: LoadDataByUrlOptions['url'];

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

  normalize({
    data,
    url,
  }: Parameters<NormalizeData>[0]): ReturnType<NormalizeData> {
    const normalized = normalizr.normalize(
      data,
      this.schema
    ); /** pass userMergeStrategy and userProcessStrategy */

    return {
      ...normalized,
      url,
    };
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

    // if (!!changes) {

    //   return intersection.some((key) => {
    //     const updatedIds = Object.keys(changes[key] as Entity);
    //     const urlLoadedEntityIds = urlLoadedEntity[key];
    //     const idIntersection = updatedIds.filter((id) =>
    //       urlLoadedEntityIds.includes(id)
    //     );

    //     return idIntersection.length !== 0;
    //   });
    // }

    // if (!!remove) {
    //   const removedEntityKeys = Object.keys(remove);
    //   const urlLoadedEntityKeys = Object.keys(urlLoadedEntity);
    //   const intersection = removedEntityKeys.filter((key) =>
    //     urlLoadedEntityKeys.includes(key)
    //   );
    //   if (intersection.length === 0) return false;

    //   return intersection.some((key) => {
    //     const removedIds = remove[key];
    //     const urlLoadedEntityIds = urlLoadedEntity[key];
    //     const idIntersection = removedIds.filter((id) =>
    //       urlLoadedEntityIds.includes(id)
    //     );

    //     return idIntersection.length !== 0;
    //   });
    // }

    // return false;
  }
}
