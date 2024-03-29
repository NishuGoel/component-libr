"use strict";

var preset = _interopRequireWildcard(require("./framework-preset-react-docgen"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('framework-preset-react-docgen', () => {
  const babelPluginReactDocgenPath = require.resolve('babel-plugin-react-docgen');

  it('should return the config with the extra plugins when `plugins` is an array.', () => {
    const babelConfig = {
      babelrc: false,
      presets: ['env', 'foo-preset'],
      plugins: ['foo-plugin']
    };
    const config = preset.babel(babelConfig);
    expect(config).toEqual({
      babelrc: false,
      plugins: ['foo-plugin', [babelPluginReactDocgenPath, {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
      }]],
      presets: ['env', 'foo-preset']
    });
  });
  it('should return the config with the extra plugins when `plugins` is not an array.', () => {
    const babelConfig = {
      babelrc: false,
      presets: ['env', 'foo-preset'],
      plugins: ['bar-plugin']
    };
    const config = preset.babel(babelConfig);
    expect(config).toEqual({
      babelrc: false,
      plugins: ['bar-plugin', [babelPluginReactDocgenPath, {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
      }]],
      presets: ['env', 'foo-preset']
    });
  });
  it('should return the config only with the extra plugins when `plugins` is not present.', () => {
    const babelConfig = {
      babelrc: false,
      presets: ['env', 'foo-preset']
    };
    const config = preset.babel(babelConfig);
    expect(config).toEqual({
      babelrc: false,
      plugins: [[babelPluginReactDocgenPath, {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
      }]],
      presets: ['env', 'foo-preset']
    });
  });
});