"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Report = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _Item = require("./Item");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Report = function Report(_ref) {
  var items = _ref.items,
      empty = _ref.empty,
      type = _ref.type;
  return _react["default"].createElement(_react.Fragment, null, items && items.length ? items.map(function (item) {
    return _react["default"].createElement(_Item.Item, {
      item: item,
      key: "".concat(type, ":").concat(item.id),
      type: type
    });
  }) : _react["default"].createElement(_components.Placeholder, {
    key: "placeholder"
  }, empty));
};

exports.Report = Report;