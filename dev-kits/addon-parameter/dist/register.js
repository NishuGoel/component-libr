"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Content = function Content() {
  var results = (0, _api.useParameter)(_constants.PARAM_KEY, []);
  return (0, _react.useMemo)(function () {
    return results.length ? _react["default"].createElement("ol", null, results.map(function (i) {
      return _react["default"].createElement("li", null, i);
    })) : null;
  }, [results]);
};

exports.Content = Content;

_addons.addons.register(_constants.ADDON_ID, function () {
  _addons.addons.add(_constants.PANEL_ID, {
    title: 'parameter',
    type: _addons.types.PANEL,
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return _react["default"].createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, _react["default"].createElement(Content, null));
    }
  });
});