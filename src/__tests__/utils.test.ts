import { schema } from 'normalizr';

import { validateSchema, isObject } from '../utils';

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
});

test('isObject should work properly', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject({ a: 1 })).toBeTruthy();
  expect(
    isObject({
      a: {
        b: 1,
      },
    })
  ).toBeTruthy();

  expect(isObject([])).toBeFalsy();
  expect(isObject(1)).toBeFalsy();
  expect(isObject(0)).toBeFalsy();
  expect(isObject('1')).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(undefined)).toBeFalsy();
});
