"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _ToolBarControl = require("./ToolBarControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ToolBar = _react["default"].memo(function (_ref) {
  var nodes = _ref.nodes,
      state = _ref.state,
      setSelected = _ref.setSelected;
  return nodes.length ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_components.Separator, null), nodes.map(function (_ref2) {
    var components = _ref2.components,
        forwardProps = _objectWithoutProperties(_ref2, ["components"]);

    return _react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, forwardProps, {
      setSelected: setSelected,
      selected: state[forwardProps.nodeId] || '',
      key: forwardProps.nodeId
    }));
  })) : null;
});

exports.ToolBar = ToolBar;