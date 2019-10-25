/* global test,expect */

/*
  Should:
  - replace first occurance of "documents" with "_build"
  - and change file extension from .md to .html
*/

const { buildFilePath } = require('../../../');

test('buildPath', () => {
  /*
    1) mdPath is in "documents" root
  */
  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/index.md'
  )).toBe(
    '~/environment/blog/_build/index.html'
  );

  /*
    2) mdPath is in "documents" nested folder
  */
  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/contact/index.md'
  )).toBe(
    '~/environment/blog/_build/contact/index.html'
  );

  /*
    3) mdPath is in "documents" nested documents folder
  */
  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/travel/documents/index.md'
  )).toBe(
    '~/environment/blog/_build/travel/documents/index.html'
  );

  /*
    4) mdPath is in "documents" nested .md folder
  */
  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/extentions/.md/index.md'
  )).toBe(
    '~/environment/blog/_build/extentions/.md/index.html'
  );
});
