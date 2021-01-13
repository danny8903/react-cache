// @ts-nocheck
import { schema } from 'normalizr';

import { validateSchemaAndParseLookupType } from '../utils';

test('validateUnion should throw error', () => {
  expect(() => {
    validateSchemaAndParseLookupType();
  }).toThrow(new Error('Expected a schema definition, but got undefined'));

  const org = new schema.Entity('org');
  const project = new schema.Entity('project');

  expect(() => {
    validateSchemaAndParseLookupType([org, project]);
  }).toThrow(
    new Error('Expected schema definition to be a single schema, but found 2')
  );
  expect(() => {
    validateSchemaAndParseLookupType([1]);
  }).toThrow(
    new Error('Invalid schema, expect an instance of normalizr.schema.Entity')
  );
  expect(() => {
    validateSchemaAndParseLookupType(1);
  }).toThrow(new Error('Invalid schema'));
  expect(() => {
    validateSchemaAndParseLookupType('1');
  }).toThrow(new Error('Invalid schema'));
  expect(() => {
    validateSchemaAndParseLookupType({
      org,
      project: 1,
    });
  }).toThrow(new Error('Invalid schema'));
  //   expect(validateSchemaAndParseLookupType()).toThrow(new Error(''));
  //   expect(validateSchemaAndParseLookupType()).toThrow(new Error(''));
});
