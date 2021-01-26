import { createContext } from 'react';
import { IStoreContextValue } from './interfaces';

const StoreContext = createContext({} as IStoreContextValue);

const { Consumer } = StoreContext;

export { Consumer as StoreConsumer, StoreContext };
