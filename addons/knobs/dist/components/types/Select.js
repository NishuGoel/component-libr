"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var serialize = function serialize(value) {
  return value;
};

var deserialize = function deserialize(value) {
  return value;
};

var SelectType = function SelectType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  var options = knob.options;
  var entries = Array.isArray(options) ? options.reduce(function (acc, k) {
    return Object.assign(acc, _defineProperty({}, k, k));
  }, {}) : options;
  var selectedKey = Object.keys(entries).find(function (k) {
    return entries[k] === knob.value;
  });
  return _react["default"].createElement(_components.Form.Select, {
    value: selectedKey,
    name: knob.name,
    onChange: function onChange(e) {
      _onChange(entries[e.target.value]);
    },
    size: "flex"
  }, Object.entries(entries).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        key = _ref3[0];

    return _react["default"].createElement("option", {
      key: key,
      value: key
    }, key);
  }));
};

SelectType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
SelectType.propTypes = {
  // TODO: remove `any` once DefinitelyTyped/DefinitelyTyped#31280 has been resolved
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].any,
    options: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object])
  }),
  onChange: _propTypes["default"].func
};
SelectType.serialize = serialize;
SelectType.deserialize = deserialize;
var _default = SelectType;
exports["default"] = _default;