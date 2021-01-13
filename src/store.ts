import { Subject, BehaviorSubject, EMPTY, of, merge } from 'rxjs';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';

import { map, filter, mergeMap } from 'rxjs/operators';
import normalizr, { normalize, denormalize } from 'normalizr';

import {
  StoreAction,
  StoreActionTypes,
  Entities,
  Entity,
  LookupTypes,
  StoreOptions,
  IStoreContextValue,
  LoadDataOptions,
  LoadFromStore,
  QueryPool,
  HttpRequestFunction,
} from './interfaces';

type Changes = {
  [schemaName: string]: string | string[];
};

export const createStore = (
  initState: unknown,
  storeOptions?: StoreOptions
): IStoreContextValue => {
  const actionSubject = new Subject<StoreAction>();
  const changesSubject = new BehaviorSubject<Changes>({});
  const entitiesSubject = new BehaviorSubject<Entities>({});
  const queryPoolSubject = new BehaviorSubject<QueryPool>({});

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

  const storeUpdate$ = actionSubject.pipe(
    mergeMap((action) => {
      if (action.type === StoreActionTypes.fetchSuccess) {
        const { options, url, data } = action;

        if (options.lookupType === LookupTypes.id) {
          try {
            const normalized = normalize(
              data,
              options.schema
            ); /** pass userMergeStrategy and userProcessStrategy */

            updateStore(normalized.entities);
            return of(normalized.entities);
          } catch (err) {
            console.error('failed to normalize data', err);
            return EMPTY;
          }
        }

        if (options.lookupType === LookupTypes.entity) {
          try {
            const normalized = normalize(
              data,
              options.schema
            ); /** pass userMergeStrategy and userProcessStrategy */

            updateStore(normalized.entities);
            updateQueryPool(url, options.schema[0].key, normalized.result);
            return of(normalized.entities);
          } catch (err) {
            console.error('failed to normalize data', err);
            return EMPTY;
          }
        }

        console.error(`Invalid lookupType: ${JSON.stringify(options)}`);
        return EMPTY;
      }

      console.error(`Invalid action: ${JSON.stringify(action)}`);
      return EMPTY;
    })
  );

  const dispatch = (action: StoreAction) => actionSubject.next(action);
  const subscribeChange = <T = unknown>(observer: Observer<T>) =>
    (storeUpdate$ as Observable<T>).subscribe(observer);

  const getEntities = () => entitiesSubject.getValue();
  const getQueryPool = () => queryPoolSubject.getValue();

  function denormalizeData(
    normalizeData: unknown,
    schema:
      | normalizr.schema.Entity
      | [normalizr.schema.Entity]
      | normalizr.schema.Object,
    entities: Entities,
    returnNormalizeData: boolean
  ) {
    return returnNormalizeData
      ? normalizeData
      : denormalize(normalizeData, schema, entities);
  }

  const loadFromStore: LoadFromStore = (loadDataOptions, url) => {
    const entities = getEntities();
    if (loadDataOptions.lookupType === LookupTypes.entity) {
      const entity = entities[loadDataOptions.schema[0].key];
      if (!entity) {
        throw new Error(
          `schema ${loadDataOptions.schema[0].key} is not yet loaded`
        );
      }

      if (!!loadDataOptions.mapEntityToData) {
        return loadDataOptions.mapEntityToData(entity, (input: string[]) => {
          denormalize(input, loadDataOptions.schema, entities);
        });
      }

      /**
       * if not url passed in, return the whole entity data list
       */
      if (!url)
        return denormalize(
          Object.keys(entity),
          loadDataOptions.schema,
          entities
        );
      const queryPool = queryPoolSubject.getValue();
      return denormalize(
        queryPool[url] || [],
        loadDataOptions.schema,
        entities
      );
    }

    /**
     *
     *
     * {
     * org: 1,
     * projects: [2,3,4]
     *
     * }
     */
    if (loadDataOptions.lookupType === LookupTypes.union) {
      return denormalize(Object.keys(entity), loadDataOptions.schema, entities);

      // const entity = entities[loadDataOptions.schema[0].key];
      // if (!entity) {
      //   throw new Error(
      //     `schema ${loadDataOptions.schema[0].key} is not yet loaded`
      //   );
      // }
      // return denormalizeData(
      //   entity,
      //   loadDataOptions.schema[0],
      //   entities,
      //   returnNormalizeData
      // );
    }

    if (loadDataOptions.lookupType === LookupTypes.id) {
      const entity = entities[loadDataOptions.schema.key];
      if (!entity) {
        throw new Error(
          `schema ${loadDataOptions.schema.key} is not yet loaded`
        );
      }
      return denormalizeData(
        entity[loadDataOptions.id],
        loadDataOptions.schema,
        entities,
        returnNormalizeData
      );
    }

    throw new Error(`Invalid lookupType ${JSON.stringify(loadDataOptions)}`);
  };

  const DEFAULT_HTTP_REQUEST_FUNCTION: HttpRequestFunction = (url: string) => {
    return fetch(url).then((response) =>
      response
        .json()
        .then((json) => (!response.ok ? Promise.reject(json) : json))
    );
  };

  const httpRequestFunction =
    !storeOptions || !storeOptions.httpRequestFunction
      ? DEFAULT_HTTP_REQUEST_FUNCTION
      : storeOptions.httpRequestFunction;

  return {
    dispatch,
    loadFromStore,
    getEntities,
    getQueryPool,
    subscribeChange,
    httpRequestFunction,
    // subscribe: (observer: Observer<{ action: A; state: T }>) =>
    //   store$.subscribe(observer),
    // cleanup,
  };
};
