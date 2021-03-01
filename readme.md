## Introduction

This React Cache library is an alternative of redux. It helps you manage your data store without defining too many actions and reducer. It helps you efficiently render the updated data in the UI
<br><br>

## Installation

> npm install --save @danny-ui/react-cache

<br><br>

## Usage

```jsx static
import { StoreProvider, useGet, createStore } from '@danny-ui/react-cache';
import { schema } from 'normalizr';

const schemas = {
  USER: new schema.Entity('user'),
};

function Home() {
  const { data, loading } = useGet<ListData[]>(
    () => {
      return fetch('/getList');
    },
    [],
    {
      schema: [schemas.USER],
    }
  );
  if (loading || !data) return <div>Loading...</div>;

  return <div> /** rendering list data */ </div>;
}

const initStore = createStore({});
function App() {
  return (
    <StoreProvider store={initStore}>
      <Home />
    </StoreProvider>
  );
}
```

<br><br>

## API

### _StoreProvider Properties_

```jsx static
const initStore = createStore({onError?: (err) => alert(err.message)});
function App() {
  return (
    <StoreProvider store={initStore}>
      /** your app component  */
    </StoreProvider>
  );
}

```

| Name       | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| children\* | node   | The content of the app.          |
| store\*    | object | Created by _createStore_ method. |

<br>

### _useGet Properties_

```jsx static
const { data, loading, error } = useGet(queryFn, dependenciesList, {
  schema,
  id,
  shouldFetchData,
  findEntityIds,
});
```

#### Options

- `queryFn: () => Promise<unknow>`
  - Required
  - This function will be used to request data.
  - Must return a promise
- `dependenciesList: any[]`
  - Required
  - By setting this dependency list, it will conditionally firing the effect, like "useEffect"
- `schema: normalizr.schema.Entity | [normalizr.schema.Entity]`
  - It is used to normalize data
- `id: string`
  - Required if schema is normalizr.schema.Entity
- `shouldFetchData: (normalizeData: unknown) => boolean`
  - Optional if schema is normalizr.schema.Entity
  - it is used to control if it should run queryFn
- `findEntityIds: (entity: Entity, entities: Entities) => string[]` - Optional if schema is [normalizr.schema.Entity] - The return array string id will be used to denormalize the flatten store data, it is like a filter function.
  <br>

### _useStore Properties_

```jsx static
const data = useStore(mapStoreToHook, dependenciesList, depsSchemas);
```

#### Options

- `mapStoreToHook: (entities: Entities) => unknown`
  - Required
  - This function will be used to map store data to component.
- `dependenciesList: any[]`
  - Optional
  - By setting this dependency list, it will conditionally firing the effect, like "useEffect"
- `depsSchemas: normalizr.schema.Entity[]`
  - Optional
  - If store updated and the updated schemas is in the depsSchemas, it will run mapStoreToHook again

### _useHttp Properties_

```jsx static
const [runRequestFn, { data, loading, error }] = useHttp(requestFunction, {
  onSuccess,
  onError,
});
```

#### Options

- `requestFunction: (...args: unknown[]) => Promise<unknown>;`
  - Required
  - This function will be used to make a http request.
- `onError: (err: Error) => void`
  - Optional
- `onSuccess: ({ entities: Entities, response: unknown, merge: (newEntities: Entities) => void, delete: (deletedEntitiesAndIds: UpdatedEntitiesAndIds) => void }) => void`
  - Optional
  - merge function can be used to modify store manually
  - delete function can be used to modify store manually

<br><br>

## License

[MIT License](http://opensource.org/licenses/mit-license.html).
<br><br>
