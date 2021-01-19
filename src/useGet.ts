import {
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { mergeMap, catchError, tap, map, filter, pluck } from 'rxjs/operators';
import { from, Subject, of, merge, EMPTY } from 'rxjs';
import * as normalizr from 'normalizr';

import { StoreContext } from './context';
import {
  StoreActionTypes,
  LoadDataOptions,
  Entities,
  LookupTypes,
  StoreUpdate,
  QueryPool,
  Schema,
  LoadDataById,
  LoadDataByUnion,
  LoadDataByEntity,
  NeverLoadData,
  IdCollection,
} from './interfaces';

import { validateSchemaAndParseLookupType } from './utils';

enum LoadDataStateTypes {
  loading = 'LOADING',
  error = 'ERROR',
  success = 'SUCCESS',
  fromStore = 'FROM_STORE',
}

type LoadingState = {
  type: LoadDataStateTypes.loading;
};
type ErrorState = {
  type: LoadDataStateTypes.error;
  error: Error;
};

type SuccessState<T = unknown> = {
  type: LoadDataStateTypes.success;
  data: T;
};

type FromStoreState<T = unknown> = {
  type: LoadDataStateTypes.fromStore;
  data: T;
};

type LoadDataState<T> =
  | LoadingState
  | ErrorState
  | FromStoreState<T>
  | SuccessState<T>;

type State<T = unknown> = {
  data?: T;
  loading: boolean;
  error?: Error;
};

type Options = {
  schema: Schema;
  id?: string;
  lookup?:
    | LoadDataById['lookup']
    | LoadDataByEntity['lookup']
    | LoadDataByUnion['lookup'];
};

const shouldFetchData = ({
  url,
  entities,
  queryPool,
  loadDataOptions,
}: {
  url: string;
  entities: Entities;
  queryPool: QueryPool;
  loadDataOptions: LoadDataOptions;
}): boolean => {
  if (loadDataOptions.lookupType === LookupTypes.never) {
    return true;
  }

  if (loadDataOptions.lookupType === LookupTypes.id) {
    const entity = entities[loadDataOptions.schema.key];

    if (!entity || !entity[loadDataOptions.id]) {
      // fetch data
      return true;
    }

    if (!!loadDataOptions.filter) {
      return loadDataOptions.filter(entity[loadDataOptions.id]);
    }

    // load data from store
    return false;
  }

  if (loadDataOptions.lookupType === LookupTypes.entity) {
    const entity = entities[loadDataOptions.schema[0].key];

    if (!entity) return true;

    if (!!loadDataOptions.filter) {
      const dataIds = loadDataOptions.filter(entity);
      return !dataIds;
    }

    return !Object.keys(queryPool).includes(url);
  }

  if (loadDataOptions.lookupType === LookupTypes.union) {
    if (!!loadDataOptions.filter) {
      const idCollection = loadDataOptions.filter(entities);
      return !idCollection;
    }

    return !Object.keys(queryPool).includes(url);
  }

  throw new Error(`Invalid lookupType: ${JSON.stringify(loadDataOptions)}`);
};

const prepareLoadDataOptions = (options?: Options): LoadDataOptions => {
  /** valify options */
  if (!options) return { lookupType: LookupTypes.never } as NeverLoadData;
  if (!options.schema)
    throw new Error('Expected a schema definition, but got undefined');

  const lookupType = validateSchemaAndParseLookupType(options.schema);

  if (lookupType === LookupTypes.id) {
    if (!options.id) throw new Error('id of schema definition is missing');

    return {
      lookupType: LookupTypes.id,
      ...options,
    } as LoadDataById;
  }

  if (lookupType === LookupTypes.entity) {
    return {
      lookupType: LookupTypes.entity,
      ...options,
    } as LoadDataByEntity;
  }

  return {
    lookupType: LookupTypes.union,
    ...options,
  } as LoadDataByUnion;
};

export function useGet<T>(
  requestUrl: string,
  options: Omit<LoadDataById, 'lookupType'>
): State<T>;
export function useGet<T>(
  requestUrl: string,
  options: Omit<LoadDataByEntity, 'lookupType'>
): State<T>;
export function useGet<T>(
  requestUrl: string,
  options: Omit<LoadDataByUnion, 'lookupType'>
): State<T>;
export function useGet<T>(requestUrl: string): State<T>;
export function useGet<T>(requestUrl: string, options?: Options): State<T> {
  const {
    dispatch,
    loadFromStore,
    subscribeChange,
    getEntities,
    getQueryPool,
    httpRequestFunction,
  } = useContext(StoreContext);

  const loadDataOptions = prepareLoadDataOptions(options);

  const [state, setState] = useState<State<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { init, triggerUrlChangeHandler } = useMemo(() => {
    const url$ = new Subject<string>();
    const loadDataState$ = new Subject<LoadDataState<T>>();
    const storeUpdate$ = new Subject<StoreUpdate>();

    const triggerUrlChangeHandler = (url: string) => url$.next(url);

    const newUrlRequestHandler$ = url$.pipe(
      mergeMap((url) => {
        const entities = getEntities();
        const queryPool = getQueryPool();

        try {
          if (shouldFetchData({ url, entities, queryPool, loadDataOptions })) {
            // fetch data
            return fetchData(url);
          }
        } catch (err) {
          // TODO: test if the error is an Observable
          return of<ErrorState>({
            type: LoadDataStateTypes.error,
            error: err,
          });
        }

        return of(
          loadFromStore(
            loadDataOptions as Exclude<LoadDataOptions, NeverLoadData>,
            url
          )
        ).pipe(
          map<unknown, FromStoreState<T>>((data) => ({
            type: LoadDataStateTypes.fromStore,
            data: data as T,
          })),
          catchError((err) =>
            of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            })
          )
        );
      })
    );

    const fetchData = (url: string) =>
      merge(
        of<LoadingState>({
          type: LoadDataStateTypes.loading,
        }),
        from(httpRequestFunction(url)).pipe(
          mergeMap((responseData) => {
            if (loadDataOptions.lookupType === LookupTypes.never) {
              return of<SuccessState<T>>({
                type: LoadDataStateTypes.success,
                data: responseData as T,
              });
            }

            dispatch({
              type: StoreActionTypes.fetchSuccess,
              data: responseData,
              url,
              options: loadDataOptions,
            });
            return EMPTY;
          }),
          catchError((err) =>
            of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            })
          )
        )
      );

    const loadDataStateHandler$ = loadDataState$.pipe(
      map((loadDataState) => {
        switch (loadDataState.type) {
          case LoadDataStateTypes.loading: {
            return {
              data: state.data,
              loading: true,
              error: undefined,
            };
          }
          case LoadDataStateTypes.error: {
            return {
              data: state.data,
              loading: false,
              error: loadDataState.error,
            };
          }
          case LoadDataStateTypes.success: {
            return {
              data: loadDataState.data,
              loading: false,
              error: undefined,
            };
          }
          case LoadDataStateTypes.fromStore: {
            return {
              data: loadDataState.data,
              loading: false,
              error: undefined,
            };
          }
        }
      }),
      tap(setState)
    );

    const storeUpdateHandler$ = storeUpdate$.pipe(
      filter(({ changes, entities, url, remove }) => {
        return loadDataOptions.filter({ changes, remove });
      }),
      filter(loadDataOptions.filter),
      filter(({ changes, entities, url }) => {
        if (loadDataOptions.lookupType === LookupTypes.never) {
          return false;
        }

        if (loadDataOptions.lookupType === LookupTypes.id) {
          const updatedEntity = changes[loadDataOptions.schema.key];
          return !!updatedEntity && !!updatedEntity[loadDataOptions.id];
        }

        if (loadDataOptions.lookupType === LookupTypes.entity) {
          const updatedEntity = changes[loadDataOptions.schema[0].key];
          const entity = entities[loadDataOptions.schema[0].key];
          if (!updatedEntity || !entity) return false;
          if (url === requestUrl) return true;

          if (!!loadDataOptions.filter) {
            const dataIds = loadDataOptions.filter(entity);
            if (!dataIds) return false;
            return Object.keys(updatedEntity).some((id) =>
              dataIds.includes(id)
            );
          }

          return !!changes[loadDataOptions.schema[0].key];
        }

        if (loadDataOptions.lookupType === LookupTypes.union) {
          const updatedEntityKeys = Object.keys(changes);
          const entityKeys = getFlattenEntitiesFromSchema(
            loadDataOptions.schema
          ).map((s) => s.key);

          /**
           * TODO: need a filter to improve performance,
           * schema not always an array, it can be a single entity, need that entity id to check if should update
           */
          if (entityKeys.some((ek) => updatedEntityKeys.includes(ek))) {
            return true;
          }
          return false;
        }

        return false;
      }),
      mergeMap(() => {
        return of(
          loadFromStore(
            loadDataOptions as Exclude<LoadDataOptions, NeverLoadData>,
            requestUrl
          )
        ).pipe(
          map<unknown, FromStoreState<T>>((data) => ({
            type: LoadDataStateTypes.fromStore,
            data: data as T,
          })),
          catchError((err) =>
            of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            })
          )
        );
      })
    );

    const init = () => {
      const loadDataStateSubscription = loadDataStateHandler$.subscribe();
      const newUrlSubscription = newUrlRequestHandler$.subscribe(
        loadDataState$
      );

      if (!loadDataOptions) {
        return () => {
          loadDataStateSubscription.unsubscribe();
          newUrlSubscription.unsubscribe();

          url$.complete();
          loadDataState$.complete();
          storeUpdate$.complete();
        };
      }

      const storeUpdateSubscription = storeUpdateHandler$.subscribe(
        loadDataState$
      );
      subscribeChange(storeUpdate$);

      return () => {
        loadDataStateSubscription.unsubscribe();
        newUrlSubscription.unsubscribe();
        storeUpdateSubscription.unsubscribe();

        url$.complete();
        loadDataState$.complete();
        storeUpdate$.complete();
      };
    };

    return {
      init,
      triggerUrlChangeHandler,
    };
  }, []);

  useLayoutEffect(() => {
    const cleanup = init();

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!!requestUrl) {
      triggerUrlChangeHandler(requestUrl);
    }
  }, [requestUrl]);

  return {
    ...state,
  };
}
