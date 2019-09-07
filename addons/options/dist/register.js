"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = _interopRequireWildcard(require("./constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons["default"].register(_constants.ADDON_ID, function (api) {
  var channel = _addons["default"].getChannel();

  channel.on(_constants["default"].SET, function (data) {
    api.setOptions(data.options);
  });
});