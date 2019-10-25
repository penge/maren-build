/* global test,expect */
const {
  build,
  buildFile,
  buildFilePath
} = require('../');

test('maren-build', () => {
  expect(typeof build).toBe('function');
  expect(typeof buildFile).toBe('function');
  expect(typeof buildFilePath).toBe('function');
});
