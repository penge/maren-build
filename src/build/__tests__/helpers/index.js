/* global expect */
const fse = require('fs-extra');

const expectPath = path => {
  expect(fse.pathExistsSync(path)).toBe(true);
};

const donotexpectPath = path => {
  expect(fse.pathExistsSync(path)).toBe(false);
};

const dummyRenderFunction = (markdownString, theme) => {
  return `Markdown: ${markdownString}
Theme: ${theme.name}
`;
};

module.exports = {
  expectPath,
  donotexpectPath,

  dummyRenderFunction
};
