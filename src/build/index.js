const path = require('path');
const fse = require('fs-extra');
const readdirp = require('readdirp');

const hashThemeAssets = require('./hash-theme-assets');
const buildFilePath = require('../build-file-path');
const buildFile = require('../build-file');

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
async function build(cwd, rawTheme, renderFunction) {
  // 1 Recreate _build
  await fse.emptyDir(`${cwd}/_build`);

  // 2 Copy static to _build/static
  try {
    await fse.copy(
      `${cwd}/static`,
      `${cwd}/_build/static`);
  } catch (e) {}

  // 3 Hash assets and save them to _build/themes/<theme>/
  const theme = hashThemeAssets(cwd, rawTheme);

  // 4 Create html files for "documents" and "draft"
  await buildAllFiles(cwd, theme, renderFunction);

  // 5 Glob to be used for watcher
  const pathsToWatch = [
    path.join(cwd, 'documents', '**/*.md'),
    path.join(cwd, 'draft', '**/*.md')
  ];

  // 6
  return {
    theme,
    pathsToWatch
  };
}

/**
 * Convert every Markdown to html:
 * - /documents to /_build
 * - /draft to /draft
 */
async function buildAllFiles(cwd, theme, renderFunction) {
  const roots = [
    path.join(cwd, 'documents'),
    path.join(cwd, 'draft')
  ];

  for (const root of roots) {
    const entries = await readdirp.promise(root, { fileFilter: '*.md' });
    for (const entry of entries) {
      const mdPath = entry.fullPath; // absolute path
      const outPath = buildFilePath(cwd, mdPath);
      await buildFile(mdPath, outPath, theme, renderFunction);
    }
  }

  return true;
}

module.exports = build;
