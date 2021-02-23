import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { filter } from 'rxjs/operators';

import { Subject } from 'rxjs';
import * as normalizr from 'normalizr';

import { StoreContext } from './context';
import { Entities, StoreUpdates } from './interfaces';

type MapStoreToHook = (entities: Entities) => unknown;

export function useStore(
  mapStoreToHook: MapStoreToHook,
  deps?: React.DependencyList | undefined,
  depsSchemas?: normalizr.schema.Entity[] | undefined
) {
  const { getEntities, subscribeUpdates } = useContext(StoreContext);

  const [state, setState] = useState<unknown>();

  useLayoutEffect(() => {
    const storeUpdate$ = new Subject<StoreUpdates>();

    const storeUpdateHandlerSubscription = storeUpdate$
      .pipe(
        filter(({ updates }) => {
          return (
            !depsSchemas || depsSchemas.some((schema) => !!updates[schema.key])
          );
        })
      )
      .subscribe(() => {
        const data = mapStoreToHook(getEntities());
        setState(data);
      });

    const storeUpdateSubscription = subscribeUpdates(storeUpdate$);

    return () => {
      storeUpdateSubscription.unsubscribe();
      storeUpdateHandlerSubscription.unsubscribe();
      storeUpdate$.complete();
    };
  }, []);

  useEffect(() => {
    const data = mapStoreToHook(getEntities());
    setState(data);
  }, deps);

  return state;
}
