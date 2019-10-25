const path = require('path');
const fse = require('fs-extra');
const md5File = require('md5-file');

function hashThemeAssets(cwd, rawTheme) {
  let { name, location, template, options } = rawTheme;
  if (!options) {
    return rawTheme;
  }

  let { styles, scripts } = options;
  styles = hashAssets(cwd, name, location, styles);
  scripts = hashAssets(cwd, name, location, scripts);
  options = { styles, scripts };

  const theme = {
    name,
    location,
    template,
    options
  };

  return theme;
}

function hashAssets(cwd, themeName, themeLocation, assets) {
  if (!Array.isArray(assets)) {
    return [];
  }

  return assets.map(src => {
    if (src.includes('//')) {
      return src;
    }

    try {
      const name = path.basename(src).split('.')[0];
      const hash = md5File.sync(path.join(themeLocation, src));
      const ext = path.extname(src);

      const outFile = `${name}-${hash}${ext}`;
      fse.copySync(
        path.join(themeLocation, src),
        path.join(cwd, '_build', 'themes', themeName, outFile));

      return `/themes/${themeName}/${outFile}`;
    } catch (e) {}
  });
}

module.exports = hashThemeAssets;
