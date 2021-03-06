"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _presets = _interopRequireDefault(require("../presets"));

var _customPresets = _interopRequireDefault(require("../common/custom-presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function getManagerWebpackConfig(options, presets) {
  const babelOptions = await presets.apply('babel', {}, options);
  const entries = await presets.apply('managerEntries', [], options);
  return presets.apply('managerWebpack', {}, _objectSpread({}, options, {
    babelOptions,
    entries
  }));
}

var _default = async options => {
  const {
    corePresets = [],
    frameworkPresets = [],
    overridePresets = []
  } = options,
        restOptions = _objectWithoutProperties(options, ["corePresets", "frameworkPresets", "overridePresets"]);

  const presetsConfig = [...corePresets, require.resolve('../common/babel-cache-preset.js'), ...frameworkPresets, ...(0, _customPresets.default)(options), ...overridePresets];
  const presets = (0, _presets.default)(presetsConfig);
  return getManagerWebpackConfig(_objectSpread({}, restOptions, {
    presets
  }), presets);
};

exports.default = _default;