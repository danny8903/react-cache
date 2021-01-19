import * as normalizr from 'normalizr';

import {
  Entities,
  Entity,
  QueryPool,
  Union,
  IdCollection,
} from '../interfaces';

import { validateIdCollection } from '../utils';

type Options = {
  schema: Union;
  lookup: (entities: Entities) => false | IdCollection;
};

export default class LoadDataByUnion {
  private schema: Union;
  private lookup: (entities: Entities) => false | IdCollection;

  constructor(options: Options) {
    this.schema = options.schema;
    this.lookup = options.lookup;
  }

  shouldFetchData(entities: Entities, queryPool: QueryPool, url: string) {
    return !this.lookup(entities);

    //   return !Object.keys(queryPool).includes(url);
  }

  shouldHookUpdate(changes: Entities, entities: Entities) {
    const updatedEntityKeys = Object.keys(changes);

    const IdCollection = this.lookup(entities);
    if (!IdCollection) return false;

    const isValid = validateIdCollection(IdCollection);
    if (!isValid) return false;

    /**
     * schema key: id
     */
    return Object.keys(updatedEntity).some((id) => dataIds.includes(id));
  }
}
