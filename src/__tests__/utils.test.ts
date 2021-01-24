import { schema } from 'normalizr';

import { validateSchema } from '../utils';

test('validateUnion should throw error', () => {
  expect(() => {
    validateSchema();
  }).toThrow(new Error('Expected a schema definition, but got undefined'));

  const org = new schema.Entity('org');
  const project = new schema.Entity('project');

  expect(() => {
    // @ts-expect-error test two schemas
    validateSchema([org, project]);
  }).toThrow(
    new Error('Expected schema definition to be a single schema, but found 2')
  );
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema([1]);
  }).toThrow(
    new Error('Invalid schema, expect an instance of normalizr.schema.Entity')
  );
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema(1);
  }).toThrow(new Error('Invalid schema'));
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema('1');
  }).toThrow(new Error('Invalid schema'));
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema({
      org,
      project: 1,
    });
  }).toThrow(new Error('Invalid schema'));
  //   expect(validateSchemaAndParseLookupType()).toThrow(new Error(''));
  //   expect(validateSchemaAndParseLookupType()).toThrow(new Error(''));
});
