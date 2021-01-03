import normalizr, { schema as normalizrSchema } from 'normalizr';

export const parseSchema = (schema: unknown): normalizr.schema.Entity[] => {
  if (schema instanceof normalizrSchema.Entity) {
    return [schema];
  }

  if (typeof schema === 'object' && schema !== null) {
    return Object.values(schema).reduce((r, s) => {
      return r.concat(parseSchema(s));
    }, []);
  }

  if (Array.isArray(schema)) {
    if (schema.length > 1) {
      console.error(
        `Expected schema definition to be a single schema, but found ${schema.length}`
      );
      return [];
    }
    if (!(schema[0] instanceof normalizrSchema.Entity)) {
      console.error(
        `Invalid schema, you need to pass an instance of Entity to array`
      );
      return [];
    }

    return schema;
  }

  return [];
};

export const validateSchema = (schema: unknown): boolean => {
  if (!schema) {
    console.error('schema is undefined');
    return false;
  }

  if (typeof schema === 'object' && schema !== null) {
    const flattenValidation = Object.values(schema).reduce((r, s) => {
      return r.concat(validateSchema(s));
    }, []);
    return !flattenValidation.includes(false);
  }

  if (schema instanceof normalizrSchema.Entity) {
    return true;
  }
  if (Array.isArray(schema)) {
    if (schema.length > 1) {
      console.error(
        `Expected schema definition to be a single schema, but found ${schema.length}`
      );
      return false;
    }
    if (!(schema[0] instanceof normalizrSchema.Entity)) {
      console.error(
        `Invalid schema, you need to pass an instance of Entity to array`
      );
      return false;
    }
    return true;
  }
  return false;
};
