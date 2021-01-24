import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import { schema } from 'normalizr';

import { StoreProvider, useGet, createStore } from '../src/index';

const httpRequestFunction = (url: string) => {
  if (url === '/getList') {
    return Promise.resolve(MOCK_DATA);
  }
  const re = /\/getDetail\/(\d+)/;
  if (re.test(url)) {
    const [, id] = re.exec(url) as RegExpExecArray;
    return Promise.resolve(
      (MOCK_DATA as ListData[]).find((d) => String(d.id) === id)
    );
  }

  throw new Error(`Invalid url: ${url}`);
};

const initStore = createStore({ httpRequestFunction });

const MOCK_DATA: unknown = [
  {
    id: 1,
    first_name: 'Ruprecht',
    last_name: 'Fetherston',
    email: 'rfetherston0@gravatar.com',
    gender: 'Male',
  },
  {
    id: 2,
    first_name: 'Kev',
    last_name: 'Seamon',
    email: 'kseamon1@symantec.com',
    gender: 'Male',
  },
  {
    id: 3,
    first_name: 'Janine',
    last_name: 'Boffey',
    email: 'jboffey2@rambler.ru',
    gender: 'Female',
  },
  {
    id: 4,
    first_name: 'Audrey',
    last_name: 'Niess',
    email: 'aniess3@wordpress.org',
    gender: 'Female',
  },
  {
    id: 5,
    first_name: 'Emmit',
    last_name: 'McGiffie',
    email: 'emcgiffie4@behance.net',
    gender: 'Male',
  },
  {
    id: 6,
    first_name: 'Lydon',
    last_name: 'Kike',
    email: 'lkike5@domainmarket.com',
    gender: 'Male',
  },
  {
    id: 7,
    first_name: 'Richy',
    last_name: 'Wann',
    email: 'rwann6@dmoz.org',
    gender: 'Male',
  },
  {
    id: 8,
    first_name: 'Klarika',
    last_name: 'Saynor',
    email: 'ksaynor7@va.gov',
    gender: 'Female',
  },
  {
    id: 9,
    first_name: 'Neil',
    last_name: 'Corley',
    email: 'ncorley8@ucoz.com',
    gender: 'Male',
  },
  {
    id: 10,
    first_name: 'Karola',
    last_name: 'Machan',
    email: 'kmachan9@joomla.org',
    gender: 'Female',
  },
];

type ListData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

const schemas = {
  USER: new schema.Entity('users'),
};

function Home() {
  // const { data, loading } = useGet('/detail/1', schemas.USER, { cacheStrategy: strategy.lookupById(1) } /** options */);

  const { data, loading } = useGet<ListData[]>('/getList', {
    schema: [schemas.USER],
  });
  console.log({ data, loading });
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.map((d) => (
          <li key={d.id}>
            <Link to={`/${d.id}`}>{d.email}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGet<ListData>(`/getDetail/${id}`, {
    schema: schemas.USER,
    id,
  });
  console.log({ data, loading });
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}

function App() {
  return (
    <StoreProvider value={initStore}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:id">
              <Detail />
            </Route>
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
