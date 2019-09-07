"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var iframeId = 'storybook-preview-iframe';

var GridSelector = function GridSelector() {
  var _useAddonState = (0, _api.useAddonState)("".concat(_constants.ADDON_ID, "/grid")),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      state = _useAddonState2[0],
      setState = _useAddonState2[1];

  return _react["default"].createElement(_components.IconButton, {
    key: "background",
    active: state,
    title: "Change the background of the preview",
    onClick: function onClick() {
      return setState(!state);
    }
  }, _react["default"].createElement(_components.Icons, {
    icon: "grid"
  }), state ? _react["default"].createElement(_theming.Global, {
    styles: _defineProperty({}, "#".concat(iframeId), {
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
      backgroundBlendMode: 'difference',
      backgroundImage: ['linear-gradient(rgba(130, 130, 130,0.5) 1px,transparent 1px)', 'linear-gradient(90deg,rgb(130, 130, 130,0.5) 1px,transparent 1px)', 'linear-gradient(rgba(130, 130, 130, 0.25) 1px,transparent 1px)', 'linear-gradient(90deg,rgba(130, 130, 130, 0.25) 1px,transparent 1px)'].join(',')
    })
  }) : null);
};

exports.GridSelector = GridSelector;