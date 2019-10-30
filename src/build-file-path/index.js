const path = require('path');

/**
 * Return absolute html path.
 */
function buildFilePath(cwd, mdPath) {
  if (!mdPath.startsWith(cwd)) {
    return undefined;
  }

  const relativeSrc = path.relative(cwd, mdPath);
  const relativeDest = relativeSrc.replace(/^documents/,'_build');

  const dirname = path.dirname(relativeDest);
  const basename = path.basename(relativeDest, '.md');

  const filename = ['index', '404'].includes(basename)
    ? basename + '.html'
    : path.join(basename, 'index.html');

  return path.join(cwd, dirname, filename);
}

module.exports = buildFilePath;
