"use strict";

require("core-js/modules/es.string.replace");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _craConfig = require("./cra-config");

var _mockRules = _interopRequireDefault(require("./__mocks__/mockRules"));

var _mockConfig = _interopRequireDefault(require("./__mocks__/mockConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('fs', () => ({
  realpathSync: jest.fn(() => '/test-project'),
  readFileSync: jest.fn(),
  existsSync: jest.fn(() => true)
}));
jest.mock('mini-css-extract-plugin', () => {});
const SCRIPT_PATH = '.bin/react-scripts';

const stripCwd = loaderPath => loaderPath.replace(process.cwd(), '');

describe('cra-config', () => {
  describe('when used with the default react-scripts package', () => {
    beforeEach(() => {
      _fs.default.realpathSync.mockImplementationOnce(filePath => filePath.replace(SCRIPT_PATH, `react-scripts/${SCRIPT_PATH}`));
    });
    it('should locate the react-scripts package', () => {
      expect((0, _craConfig.getReactScriptsPath)({
        noCache: true
      })).toEqual('/test-project/node_modules/react-scripts');
    });
  });
  describe('when used with a custom react-scripts package', () => {
    beforeEach(() => {
      _fs.default.realpathSync.mockImplementationOnce(filePath => filePath.replace(SCRIPT_PATH, `custom-react-scripts/${SCRIPT_PATH}`));
    });
    it('should locate the react-scripts package', () => {
      expect((0, _craConfig.getReactScriptsPath)({
        noCache: true
      })).toEqual('/test-project/node_modules/custom-react-scripts');
    });
  });
  describe('when used with a custom react-scripts package without symlinks in .bin folder', () => {
    beforeEach(() => {
      // In case of .bin/react-scripts is not symlink (like it happens on Windows),
      // realpathSync() method does not translate the path.
      _fs.default.realpathSync.mockImplementationOnce(filePath => filePath);

      _fs.default.readFileSync.mockImplementationOnce(() => `#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case \`uname\` in
    *CYGWIN*) basedir=\`cygpath -w "$basedir"\`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../custom-react-scripts/bin/react-scripts.js" "$@"
  ret=$?
else
  node  "$basedir/../custom-react-scripts/bin/react-scripts.js" "$@"
  ret=$?
fi
exit $ret`);
    });
    it('should locate the react-scripts package', () => {
      expect((0, _craConfig.getReactScriptsPath)({
        noCache: true
      })).toEqual('/test-project/node_modules/custom-react-scripts');
    });
  });
  describe('when used with TypeScript', () => {
    it('should return the correct config', () => {
      // Normalise the return, as we know our new rules object will be an array, whereas a string is expected.
      const rules = (0, _craConfig.getTypeScriptRules)(_mockRules.default, './.storybook');

      const rulesObject = _objectSpread({}, rules[0], {
        include: rules[0].include[0]
      });

      expect(rulesObject).toMatchObject(_mockRules.default[2].oneOf[1]);
    }); // Allows using TypeScript in the `.storybook` (or config) folder.

    it('should add the Storybook config directory to `include`', () => {
      const rules = (0, _craConfig.getTypeScriptRules)(_mockRules.default, './.storybook');
      expect(rules[0].include.findIndex(string => string.includes('.storybook'))).toEqual(1);
    });
    it('should get the baseUrl from a tsconfig.json', () => {
      jest.spyOn(_path.default, 'join').mockImplementation(() => 'project/tsconfig.json');
      jest.mock('project/tsconfig.json', () => ({
        compilerOptions: {
          baseUrl: 'src'
        }
      }), {
        virtual: true
      });
      expect((0, _craConfig.getModulePath)()).toEqual('src');

      _path.default.join.mockRestore();
    });
  });
  describe('when used with react-scripts < 2.1.0', () => {
    beforeEach(() => {
      _fs.default.realpathSync.mockImplementationOnce(() => _path.default.join(__dirname, '__mocks__/react-scripts-2-0-0/sub1/sub2'));

      (0, _craConfig.getReactScriptsPath)({
        noCache: true
      });
    });
    it('should apply styling webpack rules', () => {
      const webpackConfig = (0, _craConfig.applyCRAWebpackConfig)(_mockConfig.default, '/test-project'); // We don't want full paths in snapshots.

      webpackConfig.resolveLoader.modules = webpackConfig.resolveLoader.modules.map(stripCwd);
      expect(webpackConfig).toMatchSnapshot();
    });
  });
  describe('when used with react-scripts >= 2.1.0', () => {
    beforeEach(() => {
      _fs.default.realpathSync.mockImplementationOnce(() => _path.default.join(__dirname, '__mocks__/react-scripts-2-1-0/sub1/sub2'));

      (0, _craConfig.getReactScriptsPath)({
        noCache: true
      });
    });
    it('should apply Babel, styling rules and merge plugins', () => {
      const webpackConfig = (0, _craConfig.applyCRAWebpackConfig)(_mockConfig.default, '/test-project'); // We don't want full paths in snapshots.

      webpackConfig.resolveLoader.modules = webpackConfig.resolveLoader.modules.map(stripCwd);
      expect(webpackConfig).toMatchSnapshot();
    });
  });
});