import * as normalizr from 'normalizr';

import { Schema, LookupTypes, IdCollection } from './interfaces';

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

export const validateSchemaAndParseLookupType = (
  schema?: Schema
): Exclude<LookupTypes, LookupTypes.never> => {
  if (!schema) {
    throw new Error('Expected a schema definition, but got undefined');
  }

  if (schema instanceof normalizr.schema.Entity) return LookupTypes.id;

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
    return LookupTypes.entity;
  }

  if (typeof schema === 'object' && schema !== null) {
    Object.values(schema).forEach((s) => validateSchemaAndParseLookupType(s));
    return LookupTypes.union;
  }

  throw new Error(`Invalid schema`);
};

// export const getFlattenEntitiesFromSchema = (
//   schema: Schema
// ): normalizr.schema.Entity[] => {
//   if (schema instanceof normalizr.schema.Entity) {
//     return [schema];
//   }

//   if (Array.isArray(schema)) {
//     return schema;
//   }

//   if (typeof schema === 'object' && schema !== null) {
//     return Object.values(schema).reduce(
//       (entities, val) => [...entities, ...getFlattenEntitiesFromSchema(val)],
//       [] as normalizr.schema.Entity[]
//     );
//   }

//   return [];
// };

const flattenIdCollection = (
  idCollection: IdCollection | string | string[]
): string[] => {
  if (Array.isArray(idCollection)) {
    return idCollection;
  }

  if (typeof idCollection === 'object' && idCollection !== null) {
    return Object.values(idCollection).reduce(
      (entities: string[], val) => [...entities, ...flattenIdCollection(val)],
      [] as string[]
    );
  }
  return [idCollection];
};

export const validateIdCollection = (idCollection: IdCollection) => {
  if (typeof idCollection === 'object' && idCollection !== null) {
    const flattenValue = flattenIdCollection(idCollection);

    const invalidValue = flattenValue.find((v) => typeof v !== 'string');

    if (invalidValue) {
      console.error(`Expect string, but got ${JSON.stringify(invalidValue)}`);
      return false;
    }
    return true;
  }

  console.error(
    `Expect an object type, but got ${JSON.stringify(idCollection)}`
  );
  return false;
};
