"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBarMenuOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _constants = require("../../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ToolBarMenuOptions = function ToolBarMenuOptions(_ref) {
  var activeName = _ref.activeName,
      list = _ref.list,
      onSelectOption = _ref.onSelectOption;
  return _react["default"].createElement(_components.TooltipLinkList, {
    links: list.map(function (name) {
      return {
        key: name,
        id: name,
        title: name !== _constants.OPT_OUT ? name : 'Off',
        active: name === activeName,
        onClick: onSelectOption(name)
      };
    })
  });
};

exports.ToolBarMenuOptions = ToolBarMenuOptions;