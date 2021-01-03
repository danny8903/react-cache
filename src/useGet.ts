import {
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { mergeMap, catchError, tap, map, filter, pluck } from 'rxjs/operators';
import { from, Subject, of, merge, EMPTY } from 'rxjs';
import normalizr from 'normalizr';

import { StoreContext } from './context';
import {
  StoreActionTypes,
  LoadDataOptions,
  Entities,
  LookupTypes,
  StoreUpdate,
  QueryPool,
} from './interfaces';

import { parseSchema } from './utils';

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

type UseGetOptions = {
  schema: normalizr.schema.Entity | [normalizr.schema.Entity] | unknown;
  id?: string;
  returnNormalizeData?: boolean;
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
  loadDataOptions: LoadDataOptions | undefined;
}): boolean => {
  if (!loadDataOptions) {
    return true;
  }

  if (loadDataOptions.lookupType === LookupTypes.id) {
    const entity = entities[loadDataOptions.schema.key];
    if (!entity || !entity[loadDataOptions.id]) {
      // fetch data
      return true;
    }
    // load data from store
    return false;
  }

  if (loadDataOptions.lookupType === LookupTypes.entity) {
    const entity = entities[loadDataOptions.schema[0].key];
    /**
     * assuming LookupTypes.entity will fetch all data
     * TODO: need to implement partial fetch
     * */
    const loadedEntityUrl = Object.keys(queryPool);
    if (!entity || !loadedEntityUrl.includes(url)) {
      // fetch data
      return true;
    }
    // load data from store
    return false;
  }

  if (loadDataOptions.lookupType === LookupTypes.union) {
    const entityKeys = parseSchema(loadDataOptions.schema).map((s) => s.key);
    const loadedEntityKeys = Object.keys(entities);
    const loadedEntityUrl = Object.keys(queryPool);
    if (
      entityKeys.some((ek) => !loadedEntityKeys.includes(ek)) ||
      !loadedEntityUrl.includes(url)
    ) {
      // fetch data
      return true;
    }
    // load data from store
    return false;
  }

  throw new Error(`Invalid lookupType: ${JSON.stringify(loadDataOptions)}`);
};

const parseOptions = (useGetOptions?: UseGetOptions) => {
  if (!useGetOptions) return undefined;
};

export const useGet = <T = unknown>(
  requestUrl: string,
  useGetOptions?: UseGetOptions
) => {
  const {
    dispatch,
    loadFromStore,
    subscribeChange,
    getEntities,
    getQueryPool,
    httpRequestFunction,
  } = useContext(StoreContext);

  const [state, setState] = useState<State<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const loadDataOptions = parseOptions(useGetOptions);

  const { init, triggerUrlChangeHandler } = useMemo(() => {
    const url$ = new Subject<string>();
    const loadDataState$ = new Subject<LoadDataState<T>>();
    const storeUpdate$ = new Subject<StoreUpdate>();

    const triggerUrlChangeHandler = (url: string) => url$.next(url);

    const newUrlRequestHandler$ = url$.pipe(
      mergeMap((url) => {
        const entities = getEntities();
        const queryPool = getQueryPool();
        if (
          !loadDataOptions ||
          shouldFetchData({ url, entities, queryPool, loadDataOptions })
        ) {
          // fetch data
          return fetchData(url);
        }

        return of(loadFromStore(loadDataOptions)(entities)).pipe(
          map<unknown, FromStoreState<T>>((data) => ({
            type: LoadDataStateTypes.fromStore,
            data: data as T,
          }))
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
            if (!loadDataOptions) {
              return of<SuccessState<T>>({
                type: LoadDataStateTypes.success,
                data: responseData as T,
              });
            }

            dispatch({
              type: StoreActionTypes.fetchSuccess,
              data: responseData,
              url: requestUrl,
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
      filter(({ changes }) => {
        if (!loadDataOptions) {
          return false;
        }

        if (loadDataOptions.lookupType === LookupTypes.id) {
          const updatedEntity = changes[loadDataOptions.schema.key];
          if (updatedEntity && updatedEntity[loadDataOptions.id]) {
            return true;
          }
          return false;
        }

        if (loadDataOptions.lookupType === LookupTypes.entity) {
          const updatedEntity = changes[loadDataOptions.schema[0].key];
          if (updatedEntity) {
            return true;
          }
          return false;
        }

        if (loadDataOptions.lookupType === LookupTypes.union) {
          const updatedEntityKeys = Object.keys(changes);
          const entityKeys = parseSchema(loadDataOptions.schema).map(
            (s) => s.key
          );

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
      pluck('entities'),
      map(loadFromStore(loadDataOptions as LoadDataOptions)),
      map<unknown, FromStoreState<T>>((data) => ({
        type: LoadDataStateTypes.fromStore,
        data: data as T,
      }))
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
};
