import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import normalizr from 'normalizr';

export { Observable, Subscription };
export type HttpRequestFunction<T = unknown> = (url: string) => Promise<T>;

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  fetchSuccess = 'FETCH_SUCCESS',
}

export enum LookupTypes {
  id = 'ID',
  union = 'UNION',
  entity = 'ENTITY',
  never = 'NEVER',
}

export type LoadDataById = {
  lookupType: LookupTypes.id;
  id: string;
  schema: normalizr.schema.Entity;
  lookup?: (normalizeData: unknown) => boolean;
  // shouldFetchData?: (normalizeData: unknown) => boolean;
  // mapEntityToHook?: (
  //   normalizeData: unknown,
  //   denormalize: (input: string) => unknown
  // ) => unknown;
};

export type LoadDataByEntity = {
  lookupType: LookupTypes.entity;
  schema: [normalizr.schema.Entity];
  lookup?: (
    entity: Entity,
    entities: Entities
    // entityIdsFromResponse: string[],
    // queryPool: QueryPool
  ) => string[];
  // mapEntityToHook?: (
  //   entity: Entity,
  //   denormalize: (input: string[]) => unknown
  // ) => unknown;
  // shouldFetchData?: (
  //   entity: Entity,
  //   idsFromResponseData: string[],
  //   queryPool: QueryPool
  // ) => boolean;
};

export type Schema =
  | normalizr.schema.Entity
  | [normalizr.schema.Entity]
  | Union;

export type Union = {
  [key: string]: Schema;
};

export type IdCollection = {
  [key: string]: string | string[] | IdCollection;
};

export type LoadDataByUnion = {
  lookupType: LookupTypes.union;
  schema: Union;
  lookup: (
    entities: Entities
    // entityIdsFromResponse: IdCollection,
    // queryPool: QueryPool
  ) => false | IdCollection;
  // mapEntityToHook?: (
  //   entities: Entities,
  //   denormalize: (input: IdCollection) => unknown
  // ) => unknown;
  // shouldFetchData?: (
  //   entities: Entities,
  //   idsFromResponseData: IdCollection,
  //   queryPool: QueryPool
  // ) => boolean;
};

export type NeverLoadData = {
  lookupType: LookupTypes.never;
};

export type LoadDataOptions =
  | LoadDataById
  | LoadDataByEntity
  | LoadDataByUnion
  | NeverLoadData;

interface FetchSuccessAction {
  type: StoreActionTypes.fetchSuccess;
  url: string;
  options: LoadDataOptions;
  data: unknown;
}

export type StoreAction = FetchSuccessAction;

export type Entity = {
  [id: string]: unknown;
};

export type Entities = {
  [schemaName: string]: Entity | undefined;
};

export type ResponseData = {
  data: Entities;
  loading: boolean;
  error: Error | undefined;
};

export type StoreOptions = {
  httpRequestFunction?: HttpRequestFunction;
};

export type Remove = {
  [EntityName: string]: string[];
};

export type StoreUpdate = {
  entities: Entities;
  changes: Entities;
  url?: string;
};

export type LoadFromStore = (
  loadDataOptions: Exclude<LoadDataOptions, NeverLoadData>,
  url?: string
) => unknown;

type FlattenId = {
  [EntityName: string]: string[];
};

/**
 * IdCollection is used to denormalize data
 * FlattenId is used to compare changes
 */
export type QueryPool = {
  [url: string]: [IdCollection, FlattenId] | undefined;
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  loadFromStore: LoadFromStore;
  getEntities: () => Entities;
  getQueryPool: () => QueryPool;
  // subscribe: (observer: Observer<StoreUpdate>) => Subscription;
  subscribeChange: <T = unknown>(observer: Observer<T>) => Subscription;
  // getStore: () => Store;

  // updateStore: (normalizedData: unknown) => void;
  httpRequestFunction: HttpRequestFunction;
}

export interface LoadData {
  shouldFetchData(props: { queryPool: QueryPool; entities: Entities }): boolean;
  filter(props: {
    changes: Entities;
    remove: Remove;
    queryPool: QueryPool;
  }): boolean;
  distinct(current: unknown, next: unknown): boolean;
}
