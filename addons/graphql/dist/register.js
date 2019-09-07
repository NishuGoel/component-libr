"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _addons = require("@storybook/addons");

var _manager = _interopRequireDefault(require("./manager"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register() {
  _addons.addons.register(_.ADDON_ID, function () {
    _addons.addons.add(_.ADDON_ID, {
      title: 'GraphiQL',
      type: _addons.types.TAB,
      route: function route(_ref) {
        var storyId = _ref.storyId;
        return "/graphql/".concat(storyId);
      },
      match: function match(_ref2) {
        var viewMode = _ref2.viewMode;
        return viewMode === 'graphql';
      },
      render: _manager["default"],
      paramKey: _.PARAM_KEY
    });
  });
};

exports.register = register;