import * as normalizr from 'normalizr';

import { Schema, LookupTypes } from './interfaces';

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
