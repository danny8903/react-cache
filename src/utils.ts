import * as normalizr from 'normalizr';

import { Schema, Entities } from './interfaces';

export const validateSchema = (schema?: Schema): void => {
  if (!schema) {
    throw new Error('Expected a schema definition, but got undefined');
  }

  if (schema instanceof normalizr.schema.Entity) return;

  if (Array.isArray(schema)) {
    if (schema.length > 1) {
      throw new Error(
        `Expected schema definition to be a single schema, but found ${schema.length}`
      );
    }
    if (!(schema[0] instanceof normalizr.schema.Entity)) {
      throw new Error(
        `Invalid schema, expect an instance of normalizr.schema.Entity`
      );
    }
    return;
  }

  if (typeof schema === 'object' && schema !== null) {
    Object.values(schema).forEach((s) => validateSchema(s));
    return;
  }

  throw new Error(`Invalid schema`);
};

export const getFlattenEntityKeys = (schema: Schema): string[] => {
  if (schema instanceof normalizr.schema.Entity) {
    return [schema.key];
  }

  if (Array.isArray(schema)) {
    return [schema[0].key];
  }

  if (typeof schema === 'object' && schema !== null) {
    return Object.values(schema).reduce(
      (keys, val) => [...keys, ...getFlattenEntityKeys(val)],
      [] as string[]
    );
  }

  return [];
};

export const parseEntitiesUpdates = (entities: Entities) => {
  const entitiesNames = Object.keys(entities);

  const pair = entitiesNames
    .map<false | [string, string[]]>((name) => {
      const entity = entities[name];
      if (!entity) return false;
      const ids = Object.keys(entity);
      return [name, ids];
    })
    .filter((v) => !!v);
  return Object.fromEntries(pair as [string, string[]][]);
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const isEntitiesValid = (data: Entities): void => {
  if (isEmptyObject(data))
    throw new Error(`There is no updates, store will not be updated`);

  const invalidEntity = Object.entries(data).find(([, entity]) => {
    if (!entity) return false;
    return !!entity['undefined'];
  });

  if (invalidEntity)
    throw new Error(
      `Invalid Id found in schema "${invalidEntity[0]}", please check if the schema "idAttribute" is set properly`
    );
};

// const isResponseDataValid = (data: unknown): boolean => {
//   if(!data) return false; // null or undefined
//   if(Array.isArray(data)) {
//     if(data.length === 0) return false

//   }
// }
