/* global test,expect */

/*
  Should:
  - replace first occurance of "documents" with "_build"
  - and change file extension from .md to .html
*/

const { buildFilePath } = require('../../../');

test('buildPath', () => {

// 1. "index.md" is changed to "index.html"

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/index.md'
  )).toBe(
    '~/environment/blog/_build/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/contact/index.md'
  )).toBe(
    '~/environment/blog/_build/contact/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/travel/documents/index.md'
  )).toBe(
    '~/environment/blog/_build/travel/documents/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/extentions/.md/index.md'
  )).toBe(
    '~/environment/blog/_build/extentions/.md/index.html'
  );


// 2. "404.md" (only in root) is changed to "404.html"

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/404.md'
  )).toBe(
    '~/environment/blog/_build/404.html'
  );


// 3. "<other>.md" is changed to "/other/index.html"

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/changelog.md'
  )).toBe(
    '~/environment/blog/_build/changelog/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/about.md'
  )).toBe(
    '~/environment/blog/_build/about/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/authors/pavel.md'
  )).toBe(
    '~/environment/blog/_build/authors/pavel/index.html'
  );

  expect(buildFilePath(
    '~/environment/blog/',
    '~/environment/blog/documents/api/cars/GET.md'
  )).toBe(
    '~/environment/blog/_build/api/cars/GET/index.html'
  );
});
