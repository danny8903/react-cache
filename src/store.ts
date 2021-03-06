import { Subject, BehaviorSubject } from 'rxjs';
import { Observer } from 'rxjs/internal/types';

import { map, shareReplay, skip, tap } from 'rxjs/operators';

import {
  StoreAction,
  StoreActionTypes,
  Entities,
  StoreOptions,
  IStoreContextValue,
  StoreUpdates,
  UpdatedEntitiesAndIds,
} from './interfaces';

import { parseEntitiesUpdates } from './utils';

export const createStore = (
  storeOptions?: StoreOptions
): IStoreContextValue => {
  const actionSubject = new Subject<StoreAction>();
  const lastUpdatesSubject = new BehaviorSubject<UpdatedEntitiesAndIds>({});
  const entitiesSubject = new BehaviorSubject<Entities>({});

  const errorSubject = new Subject<Error>();

  const getEntities = () => entitiesSubject.getValue();
  const getLastUpdates = () => lastUpdatesSubject.getValue();

  const mergeEntities = (newEntities: Entities): Entities => {
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

  const deleteEntities = (
    deletedEntitiesAndIds: UpdatedEntitiesAndIds
  ): Entities => {
    const entities = entitiesSubject.getValue();

    return Object.entries(entities).reduce(
      (newEntities, [entitiesName, entity]) => {
        if (!deletedEntitiesAndIds[entitiesName] || !entity)
          return Object.assign(newEntities, { [entitiesName]: entity });

        const idsToRemove = deletedEntitiesAndIds[entitiesName];
        const pairs = Object.entries(entity).filter(
          ([id]) => !idsToRemove.includes(id)
        );
        return Object.fromEntries(pairs);
      },
      {}
    );
  };

  const actionHandlerSubscription = actionSubject
    .pipe(
      tap((action) => {
        if (action.type === StoreActionTypes.merge) {
          const { newEntities } = action;
          lastUpdatesSubject.next(parseEntitiesUpdates(newEntities));
          entitiesSubject.next(mergeEntities(newEntities));
          return;
        }

        if (action.type === StoreActionTypes.delete) {
          const { deletedEntitiesAndIds } = action;
          lastUpdatesSubject.next(deletedEntitiesAndIds);
          entitiesSubject.next(deleteEntities(deletedEntitiesAndIds));
          return;
        }
        console.error(`Invalid action: ${JSON.stringify(action)}`);
      })
    )
    .subscribe();

  const errorSubscription = errorSubject
    .pipe(
      tap((err) => {
        if (storeOptions?.onError) {
          storeOptions.onError(err);
        }
      })
    )
    .subscribe();

  const storeUpdates$ = entitiesSubject.pipe(
    skip(1), // skip the default BehaviorSubject value
    map((entities) => {
      const updates = getLastUpdates();
      return { entities, updates };
    }),
    shareReplay(1)
  );

  if (process.env.NODE_ENV === 'development') {
    const logSubscription = entitiesSubject
      .pipe(
        tap((entities) => {
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

          console.groupEnd();
        })
      )
      .subscribe();
    actionHandlerSubscription.add(logSubscription);
  }

  const cleanup = () => {
    actionHandlerSubscription.unsubscribe();
    errorSubscription.unsubscribe();
    entitiesSubject.complete();
    lastUpdatesSubject.complete();
    errorSubject.complete();
  };

  const dispatch = (action: StoreAction) => actionSubject.next(action);
  const subscribeUpdates = (observer: Observer<StoreUpdates>) =>
    storeUpdates$.subscribe(observer);

  const dispatchError = (error: Error) => errorSubject.next(error);

  return {
    dispatch,
    dispatchError,
    getEntities,
    subscribeUpdates,
    cleanup,
  };
};
