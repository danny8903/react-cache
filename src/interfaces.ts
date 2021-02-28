import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import * as normalizr from 'normalizr';

export { Observable, Subscription };

export enum StoreActionTypes {
  fetch = 'FETCH_DATA',
  update = 'UPDATE',
  merge = 'MERGE',
  delete = 'DELETE',
  error = 'ERROR',
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

interface MergeAction {
  type: StoreActionTypes.merge;
  newEntities: Entities;
}

interface DeleteAction {
  type: StoreActionTypes.delete;
  deletedEntitiesAndIds: UpdatedEntitiesAndIds;
}

export type StoreAction = MergeAction | DeleteAction;

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
  onError?: (err: Error) => void;
};

export type StoreUpdates = {
  entities: Entities;
  updates: UpdatedEntitiesAndIds;
};

export interface IStoreContextValue {
  dispatch: (fieldAction: StoreAction) => void;
  dispatchError: (error: Error) => void;
  getEntities: () => Entities;
  subscribeUpdates: (observer: Observer<StoreUpdates>) => Subscription;
  cleanup: () => void;
}

export interface LoadData {
  schema: Schema;
  shouldFetchData(props: { entities: Entities }): boolean;
  filter(props: { updates: UpdatedEntitiesAndIds }): boolean;
  loadData(props: { entities: Entities }): unknown;
}

/**
 * includes the changes of entity update, add and delete
 */
export type UpdatedEntitiesAndIds = {
  [entityName: string]: string[];
};
