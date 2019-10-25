const fse = require('fs-extra');

/**
 * Read Markdown file at "src",
 * use "theme" and "renderFunction" to render it to html,
 * and save html to "dest".
 */
async function buildFile(src, dest, theme, renderFunction) {
  try {
    const content = await fse.readFile(src, 'utf-8');
    const rendered = renderFunction(content, theme);

    await fse.outputFile(dest, rendered);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = buildFile;
