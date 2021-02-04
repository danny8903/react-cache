import React from 'react';
import { render, screen } from '@testing-library/react';
import { schema } from 'normalizr';

import { StoreProvider, useGet, createStore } from '../index';

describe('test useGet', () => {
  describe('test api return valid data', () => {
    const user = new schema.Entity('users');
    const httpRequestFunction = () => {
      return Promise.resolve([{ id: 1, name: 'test' }]);
    };
    const initStore = createStore({ httpRequestFunction });

    test('store should be updated', async () => {
      function App() {
        const { data, loading } = useGet('/getList', {
          schema: [user],
        });

        if (loading) return <div data-testid="loading">Loading...</div>;

        return <div data-testid="data">{JSON.stringify(data)}</div>;
      }
      render(
        <StoreProvider store={initStore}>
          <App />
        </StoreProvider>
      );

      const loading = screen.getByTestId('loading');
      expect(loading.textContent).toEqual('Loading...');

      await screen.findByTestId('data');

      const entities = initStore.getEntities();
      expect(entities).toMatchObject({
        users: {
          1: {
            id: 1,
            name: 'test',
          },
        },
      });
    });
  });

  describe('test data return as null', () => {
    const user = new schema.Entity('users');
    const httpRequestFunction = (url: string) => {
      return Promise.resolve(null);
    };
    const initStore = createStore({ httpRequestFunction });

    test('store should not be updated', async () => {
      function App() {
        const { data, loading } = useGet('/getList', {
          schema: [user],
        });

        if (loading) return <div data-testid="loading">Loading...</div>;

        return <div data-testid="data">{JSON.stringify(data)}</div>;
      }
      render(
        <StoreProvider store={initStore}>
          <App />
        </StoreProvider>
      );

      const loading = screen.getByTestId('loading');
      expect(loading.textContent).toEqual('Loading...');

      const dataNode = await screen.findByTestId('data');
      expect(dataNode.textContent).toEqual('null');

      const entities = initStore.getEntities();
      expect(entities).toEqual({});
    });
  });
});
