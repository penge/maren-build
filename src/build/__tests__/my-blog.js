/* global test,expect */

/*
  1) Check content of /_build
  /_build is created (contains rendered files)
  /_build/static is created (copy of /static)
  /_build/themes is created (hashed assets)
  /_draft is updated (contains rendered files)

  2) returned "theme" assets (in options) are:
  - hashed and start with /themes/<theme>/
  - in same order
  - unchanged if external

  Asset is hashed using md5 and has same name till
  the first occurance of a dot, and so ".min"
  is not part of a name.

  3) Returned "pathsToWatch" should be an array
  of absolute glob paths to markdown files in
  "documents" and "draft".
*/

const path = require('path');
const { expectPath, dummyRenderFunction } = require('./helpers');

const { build } = require('../../../');

test('build', async () => {
  const cwd = path.join(__dirname, 'my-blog');
  const rawTheme = {
    name: 'brown',
    location: path.join(cwd, 'themes', 'brown'),
    template: data => data,
    options: {
      styles: [
        'https://fonts.googleapis.com/css?family=Lato:900,300',
        'brown-styles.min.css'
      ],
      scripts: [
        'https://code.jquery.com/jquery-3.4.1.min.js',
        'brown-scripts.min.js'
      ]
    }
  };

  const {
    theme,
    pathsToWatch
  } = await build(cwd, rawTheme, dummyRenderFunction);

  [
    // Copied
    path.join(cwd, '_build', 'static', 'data', 'cars.json'),
    path.join(cwd, '_build', 'static', 'data', 'people.json'),
    path.join(cwd, '_build', 'static', 'example.md'),
    path.join(cwd, '_build', 'static', 'notes.txt'),
    path.join(cwd, '_build', 'static', 'page.html'),

    // Hashed
    path.join(cwd, '_build', 'themes', 'brown', 'brown-styles-8a1871b624f236f9c2dd8556ebc535ee.css'),
    path.join(cwd, '_build', 'themes', 'brown', 'brown-scripts-3c24b78b2e22a573abff9bf264bf282a.js'),

    // Rendered
    path.join(cwd, '_build', 'about', 'index.html'),
    path.join(cwd, '_build', 'books', 'book-one', 'chapter-one', 'index.html'),
    path.join(cwd, '_build', 'contact', 'index.html'),
    path.join(cwd, '_build', '404.html'),
    path.join(cwd, '_build', 'index.html'),
    path.join(cwd, 'draft', 'planets', 'earth', 'index.html'),
    path.join(cwd, 'draft', 'planets', 'mars', 'index.html'),
    path.join(cwd, 'draft', 'in-progress.html'),
    path.join(cwd, 'draft', 'README.html'),
  ].forEach(outPath => expectPath(outPath));

  // 2
  expect(theme.name).toEqual(rawTheme.name);
  expect(theme.location).toEqual(rawTheme.location);
  expect(theme.template).toEqual(rawTheme.template);
  expect(theme.options).toEqual({
    styles: [
      'https://fonts.googleapis.com/css?family=Lato:900,300',
      '/themes/brown/brown-styles-8a1871b624f236f9c2dd8556ebc535ee.css'
    ],
    scripts: [
      'https://code.jquery.com/jquery-3.4.1.min.js',
      '/themes/brown/brown-scripts-3c24b78b2e22a573abff9bf264bf282a.js'
    ]
  });

  // 3
  expect(pathsToWatch).toEqual([
    path.join(cwd, 'documents/**/*.md'),
    path.join(cwd, 'draft/**/*.md'),
  ]);
});
