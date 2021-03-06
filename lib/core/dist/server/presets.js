"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeLogger = require("@storybook/node-logger");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function interopRequireDefault(filePath) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const result = require(`${filePath}`);

  const isES6DefaultExported = typeof result === 'object' && result !== null && typeof result.default !== 'undefined';
  return isES6DefaultExported ? result.default : result;
}

function loadPreset(preset) {
  try {
    if (typeof preset === 'string') {
      return {
        preset: interopRequireDefault(preset),
        options: {}
      };
    }

    const {
      name,
      options
    } = preset;
    return {
      preset: interopRequireDefault(name),
      options
    };
  } catch (e) {
    _nodeLogger.logger.warn(`  Failed to load preset: ${JSON.stringify(preset)}`);

    _nodeLogger.logger.error(e);

    return false;
  }
}

function loadPresets(presets) {
  if (!presets || !Array.isArray(presets) || !presets.length) {
    return [];
  }

  _nodeLogger.logger.info('=> Loading presets');

  const result = presets.map(loadPreset).filter(preset => preset);
  return result;
}

function applyPresets(presets, extension, config, args) {
  const presetResult = new Promise(resolve => resolve(config));

  if (!presets.length) {
    return presetResult;
  }

  return presets.reduce((accumulationPromise, {
    preset,
    options
  }) => {
    const extensionFn = preset[extension];

    if (extensionFn && typeof extensionFn === 'function') {
      const context = {
        extensionFn,
        preset,
        combinedOptions: _objectSpread({}, args, {}, options)
      };
      return accumulationPromise.then(newConfig => context.extensionFn.call(context.preset, newConfig, context.combinedOptions));
    }

    return accumulationPromise;
  }, presetResult);
}

function getPresets(presets) {
  const loadedPresets = loadPresets(presets);
  return {
    apply: async (extension, config, args = {}) => applyPresets(loadedPresets, extension, config, args)
  };
}

var _default = getPresets;
exports.default = _default;