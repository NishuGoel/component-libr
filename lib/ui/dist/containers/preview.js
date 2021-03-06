"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _preview = require("../components/preview/preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var nonAlphanumSpace = /[^a-z0-9 ]/gi;
var doubleSpace = /\s\s/gi;

var replacer = function replacer(match) {
  return " ".concat(match, " ");
};

var addExtraWhiteSpace = function addExtraWhiteSpace(input) {
  return input.replace(nonAlphanumSpace, replacer).replace(doubleSpace, ' ');
};

var mapper = function mapper(_ref) {
  var api = _ref.api,
      _ref$state = _ref.state,
      layout = _ref$state.layout,
      location = _ref$state.location,
      selected = _ref$state.selected,
      customQueryParams = _ref$state.customQueryParams;
  return Object.assign({
    api: api,
    getElements: api.getElements,
    options: layout,
    description: selected ? addExtraWhiteSpace("".concat(selected.kind, " - ").concat(selected.name)) : ''
  }, api.getUrlState(), {
    queryParams: customQueryParams,
    location: location
  });
};

function getBaseUrl() {
  try {
    // eslint-disable-next-line no-undef
    return PREVIEW_URL || 'iframe.html'; // webpack-injected
  } catch (e) {
    return 'iframe.html';
  }
}

var PreviewConnected = _react["default"].memo(function (props) {
  return _react["default"].createElement(_api.Consumer, {
    filter: mapper
  }, function (fromState) {
    return _react["default"].createElement(_preview.Preview, _extends({}, props, {
      baseUrl: getBaseUrl()
    }, fromState, {
      customCanvas: fromState.api.renderPreview
    }));
  });
});

PreviewConnected.displayName = 'PreviewConnected';
var _default = PreviewConnected;
exports["default"] = _default;