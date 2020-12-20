import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import normalizr from 'normalizr';

export { Observable, Subscription };
export type HttpRequestFunction = (url: string) => Promise<unknown>;

export type Query = {
  url: string;
};

export type FlattenJson<T = unknown> = {
  [id: string]: T;
};

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  fetchSuccess = 'FETCH_SUCCESS',
}

export enum LookupTypes {
  id = 'ID',
  url = 'URL',
  none = 'NONE',
}

export type ActionOptions = {
  lookupType?: LookupTypes;
};

interface IFetchSuccessAction {
  type: StoreActionTypes.fetchSuccess;
  url: string;
  options?: ActionOptions;
  data: unknown;
  schema: normalizr.schema.Entity;
}

interface IFetchDataAction {
  type: StoreActionTypes.fetch;
  url: string;
  options?: ActionOptions;
}

export type StoreAction = IFetchDataAction | IFetchSuccessAction;

export type Entities = {
  [schemaName: string]: FlattenJson | undefined;
};

export type ResponseData = {
  data: Entities;
  loading: boolean;
  error: Error | undefined;
};

export type StoreOptions = {
  httpRequestFunction?: HttpRequestFunction;
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  // subscribe: (observer: Observer<Entities>) => Subscription;
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
  httpRequestFunction?: HttpRequestFunction;
}
