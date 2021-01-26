import { Subject, BehaviorSubject, EMPTY, of } from 'rxjs';
import { Observer } from 'rxjs/internal/types';

import {
  map,
  filter,
  mergeMap,
  pluck,
  shareReplay,
  skip,
  tap,
} from 'rxjs/operators';

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
  const entitiesSubject = new BehaviorSubject<Entities>({});
  const queryPoolSubject = new BehaviorSubject<QueryPool>({});

  const getEntities = () => entitiesSubject.getValue();
  const getQueryPool = () => queryPoolSubject.getValue();
  const getLastUpdates = () => lastUpdatesSubject.getValue();

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
    skip(1), // skip the default Behavior Subject value
    map((entities) => {
      const queryPool = getQueryPool();
      const updates = getLastUpdates();
      return { entities, queryPool, updates };
    }),
    shareReplay(1)
  );

  if (process.env.NODE_ENV === 'development') {
    const logSubscription = entitiesSubject
      .pipe(
        tap((entities) => {
          const queryPool = getQueryPool();
          const updates = getLastUpdates();

          console.groupCollapsed(
            '%c Store State',
            'color: #9E9E9E;',
            `@ ${new Date().toLocaleTimeString()}`
          );

          console.log(
            '%c updates',
            'color: #03A9F4; font-weight: bold',
            updates
          );
          console.log(
            '%c entities',
            'color: #4CAF50; font-weight: bold',
            entities
          );
          console.log(
            '%c queryPool',
            'color: #03A9F4; font-weight: bold',
            queryPool
          );

          console.groupEnd();
        })
      )
      .subscribe();
    entitiesSubscription.add(logSubscription);
  }

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
