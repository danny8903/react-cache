import {
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { mergeMap, catchError, tap, map, filter } from 'rxjs/operators';
import { from, Subject, of, merge, EMPTY } from 'rxjs';
import { normalize } from 'normalizr';

import { StoreContext } from './context';
import { StoreActionTypes, StoreUpdates, LoadData } from './interfaces';

import { LoadDataByIdOptions } from './loadDataOptions/loadDataById';
import { LoadDataByIdListOptions } from './loadDataOptions/loadDataByIdList';
import NeverLoadData from './loadDataOptions/neverLoadData';

import { createLoadDataOptions, Options } from './loadDataOptions';
import { isEntitiesValid } from './utils';

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

type RequestFunction = () => Promise<unknown>;

type OnError = (err: Error) => void;

export function useGet<T>(
  requestFunction: RequestFunction,
  deps: unknown[],
  options: LoadDataByIdOptions & { onError?: OnError }
): State<T>;
export function useGet<T>(
  requestFunction: RequestFunction,
  deps: unknown[],
  options: LoadDataByIdListOptions & { onError?: OnError }
): State<T>;
export function useGet<T>(
  requestFunction: RequestFunction,
  deps?: unknown[]
): State<T>;
export function useGet<T>(
  requestFunction: RequestFunction,
  deps: unknown[] = [],
  options?: Options & { onError?: OnError }
): State<T> {
  const { dispatch, subscribeUpdates, getEntities, dispatchError } = useContext(
    StoreContext
  );
  const onError = options?.onError || dispatchError;
  const loadDataOptions = createLoadDataOptions(options);

  /**
   * isUnmount is used to prevent store update.
   * When a component is unmount, but the request promise is not yet resolved,
   * "isUnmount" will prevent store update.
   *
   * It tries to fix similar bug of below
   * https://www.freecodecamp.org/news/how-to-easily-cancel-useeffect-http-calls-with-rxjs-d1be418014e8/
   */
  const isUnmount = useRef(false);

  const [state, setState] = useState<State<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { init, triggerRequest } = useMemo(() => {
    const request$ = new Subject();
    const loadDataState$ = new Subject<LoadDataState<T>>();
    const storeUpdate$ = new Subject<StoreUpdates>();

    const triggerRequest = () => request$.next(void 0);

    const requestHandler$ = request$.pipe(
      mergeMap(() => {
        const entities = getEntities();

        if (loadDataOptions.shouldFetchData({ entities })) {
          // fetch data
          return fetchData();
        }

        return of((loadDataOptions as LoadData).loadData({ entities })).pipe(
          map<unknown, FromStoreState<T>>((data) => ({
            type: LoadDataStateTypes.fromStore,
            data: data as T,
          })),
          catchError((err) => {
            onError(err);
            return of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            });
          })
        );
      })
    );

    const fetchData = () =>
      merge(
        of<LoadingState>({
          type: LoadDataStateTypes.loading,
        }),
        from(requestFunction()).pipe(
          filter(() => !isUnmount.current),
          mergeMap((responseData) => {
            if (loadDataOptions instanceof NeverLoadData) {
              return of<SuccessState<T>>({
                type: LoadDataStateTypes.success,
                data: responseData as T,
              });
            }

            try {
              const normalized = normalize(
                responseData,
                loadDataOptions.schema
              );

              isEntitiesValid(normalized.entities);

              dispatch({
                type: StoreActionTypes.merge,
                newEntities: normalized.entities,
              });
              return EMPTY;
            } catch (err) {
              console.warn(err.message || err);
              return of<SuccessState<T>>({
                type: LoadDataStateTypes.success,
                data: responseData as T,
              });
            }
          }),
          catchError((err) => {
            onError(err);
            return of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            });
          })
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
      filter(({ updates }) => {
        return loadDataOptions.filter({ updates });
      }),
      mergeMap(({ entities }) => {
        return of((loadDataOptions as LoadData).loadData({ entities })).pipe(
          map<unknown, FromStoreState<T>>((data) => ({
            type: LoadDataStateTypes.fromStore,
            data: data as T,
          })),
          catchError((err) => {
            onError(err);
            return of<ErrorState>({
              type: LoadDataStateTypes.error,
              error: err,
            });
          })
        );
      })
    );

    const init = () => {
      const loadDataStateSubscription = loadDataStateHandler$.subscribe();
      const requestSubscription = requestHandler$.subscribe(loadDataState$);

      const storeUpdateHandlerSubscription = storeUpdateHandler$.subscribe(
        loadDataState$
      );
      const storeUpdateSubscription = subscribeUpdates(storeUpdate$);

      return () => {
        isUnmount.current = true;

        loadDataStateSubscription.unsubscribe();
        requestSubscription.unsubscribe();
        storeUpdateSubscription.unsubscribe();
        storeUpdateHandlerSubscription.unsubscribe();

        request$.complete();
        loadDataState$.complete();
        storeUpdate$.complete();
      };
    };

    return {
      init,
      triggerRequest,
    };
  }, []);

  useLayoutEffect(() => {
    const cleanup = init();

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    triggerRequest();
  }, deps);

  return {
    ...state,
  };
}
