import { Subject, BehaviorSubject } from 'rxjs';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';

import { map, filter } from 'rxjs/operators';
import { normalize } from 'normalizr';

import {
  StoreAction,
  StoreActionTypes,
  Entities,
  FlattenJson,
  LookupTypes,
  StoreOptions,
  IStoreContextValue,
} from './interfaces';

export const createStore = (
  initState: unknown,
  options?: StoreOptions
): IStoreContextValue => {
  const actionSubject = new Subject<StoreAction>();
  // const stateSubject = new BehaviorSubject<T>(initState);
  const entitiesSubject = new BehaviorSubject<Entities>({});
  const queryPoolSubject = new BehaviorSubject<{
    [url: string]: [
      string /** Schema Name */,
      /** id or id list, depended on if input data is an array or not */
      string | string[]
    ];
  }>({});

  const updateQueryPool = (
    url: string,
    schemaName: string,
    id: string | string[]
  ) => {
    const queryPool = queryPoolSubject.getValue();

    const result = {
      ...queryPool,
      [url]: [schemaName, id] as [string, string | string[]],
    };
    queryPoolSubject.next(result);
  };

  const updateStore = (newEntities: Entities) => {
    const entities = entitiesSubject.getValue();
    const result = Object.entries(newEntities).reduce(
      (mergedEntities, [id, value]) => {
        return {
          ...mergedEntities,
          [id]: {
            ...(mergedEntities[id] || {}),
            ...value,
          },
        };
      },
      entities
    );
    entitiesSubject.next(result);
  };

  const lookup$ = actionSubject.pipe(
    map((action) => {
      if (action.type === StoreActionTypes.fetch) {
        const queryPool = queryPoolSubject.getValue();
        const entities = entitiesSubject.getValue();

        const { options, url } = action;
        if (
          !options ||
          !options.lookupType ||
          options.lookupType === LookupTypes.url
        ) {
          if (Object.keys(queryPool).includes(url)) {
            const [schemaName, dataId] = queryPool[url];

            if (entities[schemaName]) {
              return Array.isArray(dataId)
                ? dataId.map((id) => (entities[schemaName] as FlattenJson)[id])
                : (entities[schemaName] as FlattenJson)[dataId];
            }
          }
          return null;
        }
        console.error(`Invalid lookupType: ${options.lookupType}`);
        return new Error();
      }

      if (action.type === StoreActionTypes.fetchSuccess) {
        const { options, url, data, schema } = action;
        if (
          !options ||
          !options.lookupType ||
          options.lookupType === LookupTypes.url
        ) {
          try {
            const normalized = normalize(
              data,
              Array.isArray(data) ? [schema] : schema
            ); /** pass userMergeStrategy and userProcessStrategy */

            updateStore(normalized.entities);
            updateQueryPool(url, schema.key, normalized.result);
            return normalized.entities;
          } catch (err) {
            console.error('failed to normalize data', err);
            return new Error();
          }
        }
        console.error(`Invalid lookupType: ${options.lookupType}`);
        return new Error();
      }

      console.error(`Invalid action: ${JSON.stringify(action)}`);
      return new Error();
    }),
    filter((result) => !(result instanceof Error))
  );

  const dispatch = (action: StoreAction) => actionSubject.next(action);
  const subscribeChange = <T = unknown>(observer: Observer<T>) =>
    (lookup$ as Observable<T>).subscribe(observer);

  return {
    dispatch,
    subscribeChange,
    httpRequestFunction: options && options.httpRequestFunction,
    // getState: () => finalStateSubject.getValue(),
    // subscribe: (observer: Observer<{ action: A; state: T }>) =>
    //   store$.subscribe(observer),
    // cleanup,
  };
};
