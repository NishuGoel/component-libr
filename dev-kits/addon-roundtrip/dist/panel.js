"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Content = _react["default"].memo(function (_ref) {
  var results = _ref.results;
  return _react["default"].createElement(_react.Fragment, null, results.length ? _react["default"].createElement("ol", null, results.map(function (i) {
    return _react["default"].createElement("li", null, i);
  })) : null);
});

var Panel = function Panel() {
  var _useAddonState = (0, _api.useAddonState)(_constants.ADDON_ID, []),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      results = _useAddonState2[0],
      setState = _useAddonState2[1];

  var emit = (0, _api.useChannel)(_defineProperty({}, _constants.EVENTS.RESULT, function (newResults) {
    return setState(newResults);
  }));
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Content, {
    results: results
  }), _react["default"].createElement(_components.ActionBar, {
    key: "actionbar",
    actionItems: [{
      title: 'emit',
      onClick: function onClick() {
        return emit(_constants.EVENTS.REQUEST);
      }
    }, {
      title: 'setState',
      onClick: function onClick() {
        return setState(['foo']);
      }
    }, {
      title: 'setState with options',
      onClick: function onClick() {
        return setState(['bar'], {
          persistence: 'session'
        });
      }
    }, {
      title: 'setState with function',
      onClick: function onClick() {
        return setState(function (s) {
          return [].concat(_toConsumableArray(s), ['baz']);
        });
      }
    }]
  }));
};

exports.Panel = Panel;