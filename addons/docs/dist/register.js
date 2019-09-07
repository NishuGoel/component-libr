"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _shared = require("./shared");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_addons["default"].register(_shared.ADDON_ID, function (api) {
  _addons["default"].add(_shared.PANEL_ID, {
    type: _addons.types.TAB,
    title: 'Docs',
    route: function route(_ref) {
      var storyId = _ref.storyId;
      return "/docs/".concat(storyId);
    },
    match: function match(_ref2) {
      var viewMode = _ref2.viewMode;
      return viewMode === 'docs';
    },
    render: function render() {
      return null;
    }
  });
});