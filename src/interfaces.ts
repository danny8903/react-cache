import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import normalizr from 'normalizr';

export { Observable, Subscription };
export type HttpRequestFunction<T = unknown> = (url: string) => Promise<T>;

export type Query = {
  url: string;
};

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  fetchSuccess = 'FETCH_SUCCESS',
}

export enum LookupTypes {
  id = 'ID',
  url = 'URL',
  union = 'UNION',
  entity = 'ENTITY',
  none = 'NONE',
}

type LoadDataById = {
  lookupType: LookupTypes.id;
  id: string;
  schema: normalizr.schema.Entity;
  returnNormalizeData?: boolean;
};

type LoadDataByEntity = {
  lookupType: LookupTypes.entity;
  schema: [normalizr.schema.Entity];
  returnNormalizeData?: boolean;
};

type LoadDataByUnion = {
  lookupType: LookupTypes.union;
  schema: unknown;
  returnNormalizeData?: boolean;
};

export type LoadDataOptions = LoadDataById | LoadDataByEntity | LoadDataByUnion;

interface FetchSuccessAction {
  type: StoreActionTypes.fetchSuccess;
  url: string;
  options: LoadDataOptions;
  data: unknown;
}

interface FetchDataAction {
  type: StoreActionTypes.fetch;
  url: string;
  options: LoadDataOptions;
}

export type StoreAction = FetchDataAction | FetchSuccessAction;

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

export type StoreUpdate = {
  entities: Entities;
  changes: Entities;
};

// export type LoadFromStore = <B extends LoadDataOptions, T>(
//   loadDataOptions: B
// ) => (
//   entities: Entities
// ) => B extends { returnNormalizeData: true } ? unknown : T;

export type LoadFromStore = (
  loadDataOptions: LoadDataOptions
) => (entities: Entities) => unknown;

export type QueryPool = {
  [url: string]: {
    [entity: string]: string[] /** id string list */;
  };
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  loadFromStore: LoadFromStore;
  getEntities: () => Entities;
  getQueryPool: () => QueryPool;
  // subscribe: (observer: Observer<StoreUpdate>) => Subscription;
  subscribeChange: <T = unknown>(observer: Observer<T>) => Subscription;
  // state: unknown;
  // getStore: () => Store;

  // updateStore: (normalizedData: unknown) => void;
  // queryEmitter$: Subject<string>;
  // queryEmitter$: Subject<Query>;
  // queryPool$: BehaviorSubject<{
  //   [url: string]: [
  //     string /** Schema Name */,
  //     /** id or id list, depended on if input data is an array or not */
  //     string | string[]
  //   ];
  // }>;
  httpRequestFunction: HttpRequestFunction;
}
