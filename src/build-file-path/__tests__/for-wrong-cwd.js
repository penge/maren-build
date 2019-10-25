/* global test,expect */

/*
  If mdPath is in wrong cwd,
  should return undefined.
*/

const { buildFilePath } = require('../../../');

test('buildPath', () => {
  expect(buildFilePath(
    '~/environment/blog/',
    '~/wrong/cwd/documents/index.md'
  )).toBe(
    undefined
  );
});
