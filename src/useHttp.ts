import { useContext, useLayoutEffect, useState, useMemo } from 'react';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';
import { from, Subject, of, merge } from 'rxjs';

import { StoreContext } from './context';
import {
  StoreActionTypes,
  Entities,
  UpdatedEntitiesAndIds,
} from './interfaces';

enum RequestStates {
  loading = 'LOADING',
  error = 'ERROR',
  success = 'SUCCESS',
}

type LoadingState = {
  type: RequestStates.loading;
};
type ErrorState = {
  type: RequestStates.error;
  error: Error;
};

type SuccessState = {
  type: RequestStates.success;
  data: unknown;
};

type LoadDataState = LoadingState | ErrorState | SuccessState;

type State = {
  data?: unknown;
  loading: boolean;
  error?: Error;
};

type Result = [(params: unknown) => void, State];

type RequestFunction = (...args: unknown[]) => Promise<unknown>;

type OnSuccessProps = {
  entities: Entities;
  response: unknown;
  merge: (newEntities: Entities) => void;
  delete: (deletedEntitiesAndIds: UpdatedEntitiesAndIds) => void;
};

type Options = {
  onSuccess: (props: OnSuccessProps) => void;
  onError: (err: Error) => void;
};

export function useHttp(
  requestFunction: RequestFunction,
  options?: Options
): Result {
  const { dispatch, getEntities, dispatchError } = useContext(StoreContext);
  const onError = options?.onError || dispatchError;

  const [state, setState] = useState<State>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { init, triggerRequestHandler } = useMemo(() => {
    const request$ = new Subject<unknown[]>();
    const loadDataState$ = new Subject<LoadDataState>();

    const triggerRequestHandler = (...args: unknown[]) => request$.next(args);

    const requestHandler$ = request$.pipe(
      mergeMap((args) => {
        return merge(
          of<LoadingState>({
            type: RequestStates.loading,
          }),
          from(requestFunction(...args)).pipe(
            map<unknown, SuccessState>((responseData) => ({
              type: RequestStates.success,
              data: responseData,
            })),
            tap((successState) => {
              if (options?.onSuccess) {
                options.onSuccess({
                  response: successState.data,
                  entities: getEntities(),
                  merge: (newEntities) => {
                    dispatch({
                      type: StoreActionTypes.merge,
                      newEntities,
                    });
                  },
                  delete: (deletedEntitiesAndIds) => {
                    dispatch({
                      type: StoreActionTypes.delete,
                      deletedEntitiesAndIds,
                    });
                  },
                });
              }
            }),
            catchError((err) =>
              of<ErrorState>({
                type: RequestStates.error,
                error: err,
              }).pipe(
                tap((errorState) => {
                  onError(errorState.error);
                })
              )
            )
          )
        );
      })
    );

    const loadDataStateHandler$ = loadDataState$.pipe(
      map((loadDataState) => {
        switch (loadDataState.type) {
          case RequestStates.loading: {
            return {
              data: state.data,
              loading: true,
              error: undefined,
            };
          }
          case RequestStates.error: {
            return {
              data: state.data,
              loading: false,
              error: loadDataState.error,
            };
          }
          case RequestStates.success: {
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

    const init = () => {
      const loadDataStateSubscription = loadDataStateHandler$.subscribe();
      const requestHandlerSubscription = requestHandler$.subscribe(
        loadDataState$
      );

      return () => {
        loadDataStateSubscription.unsubscribe();
        requestHandlerSubscription.unsubscribe();

        request$.complete();
        loadDataState$.complete();
      };
    };

    return {
      init,
      triggerRequestHandler,
    };
  }, []);

  useLayoutEffect(() => {
    const cleanup = init();

    return () => {
      cleanup();
    };
  }, []);

  return [
    triggerRequestHandler,
    {
      ...state,
    },
  ];
}
