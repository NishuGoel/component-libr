"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBarControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _ToolBarMenu = require("./ToolBarMenu");

var _constants = require("../../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ToolBarControl = function ToolBarControl(_ref) {
  var nodeId = _ref.nodeId,
      icon = _ref.icon,
      title = _ref.title,
      params = _ref.params,
      options = _ref.options,
      selected = _ref.selected,
      setSelected = _ref.setSelected;

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expanded = _React$useState2[0],
      setExpanded = _React$useState2[1];

  var paramNames = params.map(function (_ref2) {
    var name = _ref2.name;
    return name;
  });
  var activeName = // validate the integrity of the selected name
  [].concat(_toConsumableArray(paramNames), [options.cancelable && _constants.OPT_OUT]).includes(selected) && selected || // fallback to default
  (params.find(function (param) {
    return !!param["default"];
  }) || {
    name: null
  }).name || // fallback to the first
  params[0].name;
  var list = options.cancelable ? [_constants.OPT_OUT].concat(_toConsumableArray(paramNames)) : paramNames;
  var props = {
    title: title,
    active: activeName !== _constants.OPT_OUT,
    expanded: expanded,
    setExpanded: setExpanded,
    optionsProps: {
      activeName: activeName,
      list: list,
      onSelectOption: function onSelectOption(name) {
        return function () {
          setExpanded(false);
          setSelected(nodeId, name);
        };
      }
    }
  };
  return Array.isArray(list) && list.length && !options.disable ? _react["default"].createElement(_ToolBarMenu.ToolBarMenu, _extends({
    icon: icon
  }, props)) : null;
};

exports.ToolBarControl = ToolBarControl;