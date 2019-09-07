"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withOptions = exports.setOptions = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function emitOptions(options) {
  var channel = _addons["default"].getChannel();

  if (!channel) {
    throw new Error('Failed to find addon channel. This may be due to https://github.com/storybookjs/storybook/issues/1192.');
  } // since 'undefined' and 'null' are the valid values we don't want to
  // override the hierarchySeparator or hierarchyRootSeparator if the prop is missing


  channel.emit(_constants["default"].SET, {
    options: options
  });
} // setOptions function will send Storybook UI options when the channel is
// ready. If called before, options will be cached until it can be sent.


var globalOptions = {};
var setOptions = (0, _utilDeprecate["default"])(function (options) {
  globalOptions = options;
  emitOptions(options);
}, '`setOptions(options)` is deprecated. Please use the `withOptions(options)` decorator globally.');
exports.setOptions = setOptions;
var withOptions = (0, _addons.makeDecorator)({
  name: 'withOptions',
  parameterName: 'options',
  skipIfNoParametersOrOptions: false,
  wrapper: (0, _utilDeprecate["default"])(function (getStory, context, _ref) {
    var inputOptions = _ref.options,
        parameters = _ref.parameters;

    // do not send hierachy related options over the channel
    var _globalOptions$inputO = Object.assign({}, globalOptions, {}, inputOptions, {}, parameters),
        hierarchySeparator = _globalOptions$inputO.hierarchySeparator,
        hierarchyRootSeparator = _globalOptions$inputO.hierarchyRootSeparator,
        change = _objectWithoutProperties(_globalOptions$inputO, ["hierarchySeparator", "hierarchyRootSeparator"]);

    if (Object.keys(change).length) {
      emitOptions(Object.assign({}, globalOptions, {}, inputOptions, {}, parameters));
    } // MUTATION !
    // eslint-disable-next-line no-param-reassign


    context.options = Object.assign({}, globalOptions, {}, inputOptions, {}, parameters);
    return getStory(Object.assign({}, context, {
      options: Object.assign({}, globalOptions, {}, inputOptions, {}, parameters)
    }));
  }, 'withOptions is deprecated, use addParameters({ options: {} }) instead')
});
exports.withOptions = withOptions;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}