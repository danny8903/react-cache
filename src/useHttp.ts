import { useContext, useLayoutEffect, useState, useMemo } from 'react';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';
import { from, Subject, of, merge } from 'rxjs';
import { normalize } from 'normalizr';

import { isEntitiesValid } from './utils';

import { StoreContext } from './context';
import {
  StoreActionTypes,
  Entities,
  UpdatedEntitiesAndIds,
  Schema,
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

type RequestFunction = (params: unknown) => Promise<unknown>;

type UpdateStrategyProps = {
  entities: Entities;
  response: unknown;
  merge: (newEntities: Entities) => void;
  delete: (deletedEntitiesAndIds: UpdatedEntitiesAndIds) => void;
  fetch: (url: string, schema: Schema) => void;
};
type UpdateStrategy = (props: UpdateStrategyProps) => void;

export function useHttp(
  requestFunction: RequestFunction,
  updateStrategy: UpdateStrategy
): Result {
  const { dispatch, getEntities, httpRequestFunction } = useContext(
    StoreContext
  );

  const [state, setState] = useState<State>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { init, triggerRequestHandler } = useMemo(() => {
    const request$ = new Subject();
    const loadDataState$ = new Subject<LoadDataState>();

    const triggerRequestHandler = (params: unknown) => request$.next(params);

    const requestHandler$ = request$.pipe(
      mergeMap((params) => {
        return merge(
          of<LoadingState>({
            type: RequestStates.loading,
          }),
          from(requestFunction(params)).pipe(
            map<unknown, SuccessState>((responseData) => ({
              type: RequestStates.success,
              data: responseData,
            })),
            tap((successState) => {
              updateStrategy({
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
                fetch: (url, schema) => {
                  httpRequestFunction(url).then((responseData) => {
                    const normalized = normalize(responseData, schema);
                    isEntitiesValid(normalized.entities);
                    dispatch({
                      type: StoreActionTypes.merge,
                      newEntities: normalized.entities,
                    });
                  });
                },
              });
            }),
            catchError((err) =>
              of<ErrorState>({
                type: RequestStates.error,
                error: err,
              })
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
