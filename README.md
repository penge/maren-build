# Maren Build

## API

```js
const {
  build,
  buildFile,
  buildFilePath
} = require('maren-build');
```

### build

```js
/**
 * Build blog in <cwd> and put files in <cwd>/_build
 *
 * @param cwd - Absolute path to the blog
 *
 * @param rawTheme - Theme that will have its styles and scripts hashed
 * @param rawTheme.name - Theme name (ie. "brown")
 * @param rawTheme.location - Absolute path to the theme
 * @param rawTheme.template - (data) => html
 * @param rawTheme.options
 * @param rawTheme.options.styles - ['brown-styles.min.css']
 * @param rawTheme.options.scripts - ['brown-scripts.min.js']
 *
 * @param renderFunction - (markdownString, theme) => html;
 *
 * @return { theme, pathsToWatch }
 * @return theme - Same as rawTheme with styles and scripts being hashed
 * @return theme.name
 * @return theme.location
 * @return theme.template
 * @return theme.options
 * @return theme.options.styles - ['/themes/brown/brown-styles-8a1...5ee.css']
 * @return theme.options.scripts - ['/themes/brown/brown-scripts-3c2...82a.js']
 * @return pathsToWatch - Glob paths to md files in "documents" and "draft"
 */
const {
  theme,
  pathsToWatch
} = await build(cwd, rawTheme, renderFunction);
```

### buildFile

```js
/**
 * Read Markdown file at "src",
 * use "theme" and "renderFunction" to render it to html,
 * and save html to "dest".
 */
const success = await buildFile(src, dest, theme, renderFunction);
```

### buildFilePath

```js
/**
 * Return absolute html path.
 */
const dest = buildFilePath(cwd, mdPath);
```

## Tests

```
npm test
```
