"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithEvents = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prevEvents;
var currentEmit;

var onEmit = function onEmit(event) {
  currentEmit(event.name, event.payload);
};

var subscription = function subscription() {
  var channel = _addons["default"].getChannel();

  channel.on(_constants.EVENTS.EMIT, onEmit);
  return function () {
    prevEvents = null;

    _addons["default"].getChannel().emit(_constants.EVENTS.ADD, []);

    channel.removeListener(_constants.EVENTS.EMIT, onEmit);
  };
};

var addEvents = function addEvents(_ref) {
  var emit = _ref.emit,
      events = _ref.events;

  if (prevEvents !== events) {
    _addons["default"].getChannel().emit(_constants.EVENTS.ADD, events);

    prevEvents = events;
  }

  currentEmit = emit;

  _addons["default"].getChannel().emit(_coreEvents["default"].REGISTER_SUBSCRIPTION, subscription);
};

var WithEvents = (0, _utilDeprecate["default"])(function (_ref2) {
  var children = _ref2.children,
      options = _objectWithoutProperties(_ref2, ["children"]);

  addEvents(options);
  return children;
}, "<WithEvents> usage is deprecated, use .addDecorator(withEvents({emit, events})) instead");
exports.WithEvents = WithEvents;