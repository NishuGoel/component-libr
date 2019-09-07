"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withQuery = void 0;

var _global = require("global");

var _qs = _interopRequireDefault(require("qs"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var withQuery = (0, _addons.makeDecorator)({
  name: 'withQuery',
  parameterName: _constants.PARAM_KEY,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    var location = _global.document.location;

    var currentQuery = _qs["default"].parse(location.search, {
      ignoreQueryPrefix: true
    });

    var additionalQuery = typeof parameters === 'string' ? _qs["default"].parse(parameters, {
      ignoreQueryPrefix: true
    }) : parameters;

    var newQuery = _qs["default"].stringify(Object.assign({}, currentQuery, additionalQuery));

    var newLocation = location.href.replace(location.search, "?".concat(newQuery));

    _global.history.replaceState({}, _global.document.title, newLocation);

    return getStory(context);
  }
});
exports.withQuery = withQuery;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}