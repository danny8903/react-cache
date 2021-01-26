import React, { useEffect } from 'react';

import { StoreContext } from './context';

import { IStoreContextValue } from './interfaces';

interface StoreProps {
  children: React.ReactNode;
  store: IStoreContextValue;
}

export function StoreProvider(props: StoreProps) {
  useEffect(() => {
    return () => {
      props.store.cleanup();
    };
  });

  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
}
