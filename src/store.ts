import { Subject, BehaviorSubject, EMPTY, of } from 'rxjs';
import { Observer } from 'rxjs/internal/types';

import { map, filter, mergeMap, pluck, shareReplay } from 'rxjs/operators';

import {
  StoreAction,
  StoreActionTypes,
  Entities,
  StoreOptions,
  IStoreContextValue,
  QueryPool,
  HttpRequestFunction,
  SchemaIdCollection,
  StoreUpdates,
  UpdatedEntitiesAndIds,
} from './interfaces';

import { convertEntitiesToNameAndIds } from './utils';

export const createStore = (
  storeOptions?: StoreOptions
): IStoreContextValue => {
  const actionSubject = new Subject<StoreAction>();
  const lastUpdatesSubject = new BehaviorSubject<UpdatedEntitiesAndIds>({});
  const entitiesSubject = new BehaviorSubject<Entities>(null as any);
  const queryPoolSubject = new BehaviorSubject<QueryPool>({});

  const parseQueryPool = (url: string, id: SchemaIdCollection): QueryPool => {
    const queryPool = queryPoolSubject.getValue();

    return {
      ...queryPool,
      [url]: id,
    };
  };

  const parseEntities = (newEntities: Entities): Entities => {
    const entities = entitiesSubject.getValue();
    return Object.entries(newEntities).reduce((mergedEntities, [id, value]) => {
      return {
        ...mergedEntities,
        [id]: {
          ...(mergedEntities[id] || {}),
          ...value,
        },
      };
    }, entities);
  };

  const actionHandler$ = actionSubject.pipe(
    mergeMap((action) => {
      if (action.type === StoreActionTypes.fetchSuccess) {
        const { options, url, data } = action;

        try {
          return of(options.normalize({ data, url }));
        } catch (err) {
          console.error('failed to normalize data', err);
          return EMPTY;
        }
      }

      console.error(`Invalid action: ${JSON.stringify(action)}`);
      return EMPTY;
    })
  );

  const updateEntities$ = actionHandler$.pipe(
    pluck('entities'),
    map(parseEntities)
  );

  const updateQueryPool$ = actionHandler$.pipe(
    filter(({ url }) => !!url),
    map(({ url, result }) => parseQueryPool(url as string, result))
  );

  const lastUpdate$ = actionHandler$.pipe(
    pluck('entities'),
    map(convertEntitiesToNameAndIds)
  );

  const queryPoolSubscription = updateQueryPool$.subscribe(queryPoolSubject);
  const lastUpdateSubscription = lastUpdate$.subscribe(lastUpdatesSubject);
  const entitiesSubscription = updateEntities$.subscribe(entitiesSubject);

  const storeUpdates$ = entitiesSubject.pipe(
    filter((entities) => !!entities), // this is used to exclude the init value of BehaviorSubject
    map((entities) => {
      const queryPool = getQueryPool();
      const updates = getLastUpdates();
      console.log({ entities, queryPool, updates });
      return { entities, queryPool, updates };
    }),
    shareReplay(1)
  );

  const cleanup = () => {
    entitiesSubscription.unsubscribe();
    queryPoolSubscription.unsubscribe();
    lastUpdateSubscription.unsubscribe();
    entitiesSubject.complete();
    queryPoolSubject.complete();
    lastUpdatesSubject.complete();
  };

  const dispatch = (action: StoreAction) => actionSubject.next(action);
  const subscribeUpdates = (observer: Observer<StoreUpdates>) =>
    storeUpdates$.subscribe(observer);

  const getEntities = () => entitiesSubject.getValue();
  const getQueryPool = () => queryPoolSubject.getValue();
  const getLastUpdates = () => lastUpdatesSubject.getValue();

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
    getEntities,
    getQueryPool,
    subscribeUpdates,
    httpRequestFunction,
    cleanup,
  };
};
