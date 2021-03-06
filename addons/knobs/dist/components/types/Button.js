"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var serialize = function serialize() {
  return undefined;
};

var deserialize = function deserialize() {
  return undefined;
};

var ButtonType = function ButtonType(_ref) {
  var knob = _ref.knob,
      _onClick = _ref.onClick;
  return _react["default"].createElement(_components.Form.Button, {
    type: "button",
    name: knob.name,
    onClick: function onClick() {
      return _onClick(knob);
    }
  }, knob.name);
};

ButtonType.defaultProps = {
  knob: {}
};
ButtonType.propTypes = {
  // TODO: remove `any` once DefinitelyTyped/DefinitelyTyped#31280 has been resolved
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string
  }).isRequired,
  onClick: _propTypes["default"].func.isRequired
};
ButtonType.serialize = serialize;
ButtonType.deserialize = deserialize;
var _default = ButtonType;
exports["default"] = _default;