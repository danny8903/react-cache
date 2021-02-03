import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import * as normalizr from 'normalizr';

export { Observable, Subscription };
export type HttpRequestFunction<T = unknown> = (url: string) => Promise<T>;

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  update = 'UPDATE',
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

export type DenormalizeInput = string | string[] | IdCollection;

interface UpdateAction {
  type: StoreActionTypes.update;
  url: string;
  denormalizeInput: DenormalizeInput;
  entities: Entities;
  shouldUpdateQueryPool: boolean;
}

export type StoreAction = UpdateAction;

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
 * DenormalizeInput is used to denormalize data
 */
export type QueryPool = {
  [url: string]: DenormalizeInput | undefined;
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  getEntities: () => Entities;
  getQueryPool: () => QueryPool;
  subscribeUpdates: (observer: Observer<StoreUpdates>) => Subscription;
  httpRequestFunction: HttpRequestFunction;
  cleanup: () => void;
}

export interface LoadData {
  schema: Schema;
  shouldUpdateQueryPool: boolean;
  shouldFetchData(props: { queryPool: QueryPool; entities: Entities }): boolean;
  filter(props: {
    updates: UpdatedEntitiesAndIds;
    queryPool: QueryPool;
  }): boolean;
  loadData(props: { queryPool: QueryPool; entities: Entities }): unknown;
}

/**
 * includes the changes of entity update, add and delete
 */
export type UpdatedEntitiesAndIds = {
  [entityName: string]: string[];
};
