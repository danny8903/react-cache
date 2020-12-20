import { createContext } from 'react';
import { IStoreContextValue } from './interfaces';

const StoreContext = createContext({} as IStoreContextValue);

const { Provider, Consumer } = StoreContext;


export {
  Provider as StoreProvider,
  Consumer as StoreConsumer,
  StoreContext,
};
