import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import * as normalizr from 'normalizr';

export { Observable, Subscription };
export type HttpRequestFunction<T = unknown> = (url: string) => Promise<T>;

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  fetchSuccess = 'FETCH_SUCCESS',
}

export type Schema =
  | normalizr.schema.Entity
  | [normalizr.schema.Entity]
  | Union;

export type Union = {
  [key: string]: Schema;
};

/**
 * This will be passed as input of denormalize
 */
export type IdCollection = {
  [key: string]: string | string[] | IdCollection;
};

export type SchemaIdCollection = string | string[] | IdCollection;

interface FetchSuccessAction {
  type: StoreActionTypes.fetchSuccess;
  url: string;
  options: LoadData;
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

export type StoreUpdates = {
  entities: Entities;
  updates: UpdatedEntitiesAndIds;
  queryPool: QueryPool;
};

/**
 * SchemaIdCollection is used to denormalize data
 */
export type QueryPool = {
  [url: string]: SchemaIdCollection | undefined;
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  getEntities: () => Entities;
  getQueryPool: () => QueryPool;
  subscribeUpdates: (observer: Observer<StoreUpdates>) => Subscription;
  httpRequestFunction: HttpRequestFunction;
  cleanup: () => void;
}

export type NormalizeData = (props: {
  data: unknown;
  url: string;
}) => {
  entities: Entities;
  result: any;
  url?: string;
};

export interface LoadData {
  shouldFetchData(props: { queryPool: QueryPool; entities: Entities }): boolean;
  filter(props: {
    updates: UpdatedEntitiesAndIds;
    queryPool: QueryPool;
  }): boolean;
  loadData(props: { queryPool: QueryPool; entities: Entities }): unknown;
  normalize: NormalizeData;
}

/**
 * includes the changes of entity update, add and delete
 */
export type UpdatedEntitiesAndIds = {
  [entityName: string]: string[];
};
