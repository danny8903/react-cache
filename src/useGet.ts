import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { mergeMap, catchError, tap, mapTo } from 'rxjs/operators';
import { from, Subject, of, merge } from 'rxjs';
import normalizr from 'normalizr';

import { StoreContext } from './context';
import {
  Observable,
  HttpRequestFunction,
  StoreActionTypes,
  ActionOptions,
} from './interfaces';

const DEFAULT_HTTP_REQUEST_FUNCTION: HttpRequestFunction = (url: string) => {
  return fetch(url).then((response) =>
    response.json().then((json) => (!response.ok ? Promise.reject(json) : json))
  );
};

type HttpGetState<T = unknown> = {
  loading: boolean;
  error: undefined | Error;
  data: undefined | T;
};

export const useGet = <T = unknown>(
  requestUrl: string,
  schema: normalizr.schema.Entity,
  options?: ActionOptions
) => {
  const {
    dispatch,
    // subscribe,
    subscribeChange,
    // getStore,
    // updateStore,
    // updateQueryPool,
    // queryEmitter$,
    // queryPool$,
    httpRequestFunction = DEFAULT_HTTP_REQUEST_FUNCTION,
  } = useContext(StoreContext);

  const [state, setState] = useState<HttpGetState<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  useLayoutEffect(() => {
    const loadFromHttp$ = (url: string): Observable<HttpGetState<T> | null> =>
      merge(
        of({
          data: state.data,
          error: undefined,
          loading: true,
        }),
        from(httpRequestFunction(url)).pipe(
          tap((responseData) => {
            dispatch({
              type: StoreActionTypes.fetchSuccess,
              data: responseData,
              url: requestUrl,
              schema,
              options,
            });
          }),
          mapTo(null),
          catchError((err) =>
            of({
              data: state.data,
              loading: false,
              error: err,
            })
          )
        )
      );

    const result$ = new Subject<T>();
    const state$ = result$.pipe(
      mergeMap((result) => {
        if (result === null) {
          return loadFromHttp$(requestUrl);
        }
        return of({
          data: result,
          loading: false,
          error: undefined,
        });
      })
    );
    const responseSubscription = subscribeChange<T>(result$);
    const stateSubscription = state$.subscribe((s) => {
      !!s && setState(s);
    });

    return () => {
      responseSubscription.unsubscribe();
      stateSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: StoreActionTypes.fetch,
      url: requestUrl,
    });
  }, [requestUrl]);

  return {
    ...state,
  };
};
