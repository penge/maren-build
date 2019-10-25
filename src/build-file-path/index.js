const path = require('path');

/**
 * Return absolute html path.
 */
function buildFilePath(cwd, mdPath) {
  if (!mdPath.startsWith(cwd)) {
    return undefined;
  }

  const relativeSrc = path.relative(cwd, mdPath);
  const relativeDest = relativeSrc
    .replace(/^documents/,'_build')
    .replace(/\.md$/, '.html');

  return path.join(cwd, relativeDest);
}

module.exports = buildFilePath;
