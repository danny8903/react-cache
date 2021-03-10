import { schema } from 'normalizr';

import { validateSchema, isObject, getSubSchemasKeys } from '../utils';

test('validateSchema should pass', () => {
  const user = new schema.Entity('user');

  const comment = new schema.Entity('comments', {
    commenter: user,
  });

  const post = new schema.Entity('posts', {
    author: user,
    comments: [comment],
  });

  expect(() => {
    validateSchema([post]);
  }).not.toThrowError();

  expect(() => {
    validateSchema(post);
  }).not.toThrowError();
});

test('validateSchema should throw error', () => {
  expect(() => {
    validateSchema();
  }).toThrow(new Error('Expected a schema definition, but got undefined'));

  const org = new schema.Entity('org');
  const project = new schema.Entity('project');

  expect(() => {
    // @ts-expect-error test two schemas
    validateSchema([org, project]);
  }).toThrowError();
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema([1]);
  }).toThrowError();
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema(1);
  }).toThrow(new Error('Invalid schema, got 1'));
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema('1');
  }).toThrow(new Error('Invalid schema, got 1'));
  expect(() => {
    // @ts-expect-error test passing invalid schema
    validateSchema({ org, project: 1 });
  }).toThrowError();
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

test('getSubSchemasKeys should work properly', () => {
  const user = new schema.Entity('user');

  const comment = new schema.Entity('comments', {
    commenter: user,
  });

  const post = new schema.Entity('posts', {
    author: user,
    comments: [comment],
  });
  expect(getSubSchemasKeys(post)).toEqual([
    'posts',
    'user',
    'comments',
    'user',
  ]);
  expect(getSubSchemasKeys([post])).toEqual([
    'posts',
    'user',
    'comments',
    'user',
  ]);
});
