"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = register;

var React = _interopRequireWildcard(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _shared = require("./shared");

var _Panel = _interopRequireDefault(require("./Panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// TODO: fix eslint in tslint (igor said he fixed it, should ask him)
function register(type) {
  _addons["default"].register(_shared.ADDON_ID, function (api) {
    _addons["default"].add(_shared.PANEL_ID, {
      type: type,
      title: 'Notes',
      route: function route(_ref) {
        var storyId = _ref.storyId;
        return "/info/".concat(storyId);
      },
      // todo add type
      match: function match(_ref2) {
        var viewMode = _ref2.viewMode;
        return viewMode === 'info';
      },
      // todo add type
      render: function render(_ref3) {
        var active = _ref3.active;
        return React.createElement(_Panel["default"], {
          api: api,
          active: active
        });
      },
      paramKey: _shared.PARAM_KEY
    });
  });
}