/* global test,expect */

/*
  1) Check content of /_build
  /_build is created (empty folder)
  /_build/static is NOT created (reason: no static files)
  /_build/themes is NOT created (reason: no theme assets)

  2) Returned "theme" should have empty options if
  they were malformed (styles/scripts were not array).

  3) Returned "pathsToWatch" should be an array
  of absolute glob paths to "documents" and "draft".
*/

const path = require('path');
const {
  expectPath,
  donotexpectPath,
  dummyRenderFunction
} = require('./helpers');

const { build } = require('../../../');

test('build', async () => {
  const cwd = path.join(__dirname, 'my-blog-dummy');
  const rawTheme = {
    name: 'dummy',
    location: path.join(cwd, 'themes', 'dummy'),
    template: data => data,
    options: {
      styles: 'styles.css', // should be an array
      scripts: undefined
    }
  };

  const {
    theme,
    pathsToWatch
  } = await build(cwd, rawTheme, dummyRenderFunction);

  // 1
  expectPath(path.join(cwd, '_build'));
  donotexpectPath(path.join(cwd, '_build', 'static'));
  donotexpectPath(path.join(cwd, '_build', 'themes'));

  // 2
  expect(theme.name).toEqual(rawTheme.name);
  expect(theme.location).toEqual(rawTheme.location);
  expect(theme.template).toEqual(rawTheme.template);
  expect(theme.options).toEqual({
    styles: [],
    scripts: []
  });

  // 3
  expect(pathsToWatch).toEqual([
    path.join(cwd, 'documents/**/*.md'),
    path.join(cwd, 'draft/**/*.md'),
  ]);
});
