/* global test,expect */

/*
  If path does NOT start with "documents" (like "draft"),
  it should be put in same folder.
*/

const { buildFilePath } = require('../../../');

test('buildPath', () => {
  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/draft/upcoming-article/index.md'
  )).toBe(
    '~/environment/blog/draft/upcoming-article/index.html'
  );
});
