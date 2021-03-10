## Introduction

This React Cache library is inspired by redux and apollo-graphQL. It helps you manage your data and render your app properly.
Compare to redux:

- by default, it supports nested data.
- no need to define many actions and corresponding reducers, just define a schema (like graphQL), it will automatically updated the data store. And UI component consuming related schema will get re-render.

Compare to apollo-graphQL:

- it supports REST API, no need to use the Apollo link or change backend to apply graphQL
  <br><br>

## Installation

Install rxjs (">=6.5.x) and normalizr (">=3.6.1") if you don't have it.

> npm install --save rxjs normalizr

Install react-cache

> npm install --save @danny-ui/react-cache

<br><br>

## Usage

```jsx static
import { StoreProvider, useGet, createStore } from '@danny-ui/react-cache';
import { schema } from 'normalizr';

const user = new schema.Entity('user');

const comment = new schema.Entity('comments', {
  commenter: user,
});

const post = new schema.Entity('posts', {
  author: user,
  comments: [comment],
});

const restfulData = [
  {
    id: '1',
    title: 'My first post!',
    author: {
      id: '123',
      name: 'Paul',
    },
    comments: [
      {
        id: '249',
        content: 'Nice post!',
        commenter: {
          id: '245',
          name: 'Jane',
        },
      },
      {
        id: '250',
        content: 'Thanks!',
        commenter: {
          id: '123',
          name: 'Paul',
        },
      },
    ],
  },
  {
    id: '2',
    title: 'This other post',
    author: {
      id: '123',
      name: 'Paul',
    },
    comments: [
      {
        id: '251',
        content: 'Your other post was nicer',
        commenter: {
          id: '245',
          name: 'Jane',
        },
      },
      {
        id: '252',
        content: 'I am a spammer!',
        commenter: {
          id: '246',
          name: 'Spambot5000',
        },
      },
    ],
  },
];

function Home() {
  const { data, loading, error } = useGet(
    async () => {
      //return fetch("/getList");
      return new Promise((res) => {
        setTimeout(() => {
          res(restfulData);
        }, 1000);
      });
    },
    [],
    {
      schema: [post],
    }
  );

  if (loading || !data) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
- `findEntityIds: (entity: Entity, entities: Entities) => string[]`
  - Optional if schema is [normalizr.schema.Entity]
  - The return array string id will be used to denormalize the flatten store data, it is like a filter function.
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
