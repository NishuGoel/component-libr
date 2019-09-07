"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGraphiQL = void 0;

var _react = _interopRequireDefault(require("react"));

var _graphiql = _interopRequireDefault(require("graphiql"));

require("graphiql/graphiql.css");

var _FullScreen = require("./components/FullScreen");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setupGraphiQL = function setupGraphiQL(config) {
  return function (_query) {
    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{}';
    var query = (0, _shared.reIndentQuery)(_query);
    var fetcher = config.fetcher || (0, _shared.getDefaultFetcher)(config.url);
    return function () {
      return _react["default"].createElement(_FullScreen.FullScreen, null, _react["default"].createElement(_graphiql["default"], {
        query: query,
        variables: variables,
        fetcher: fetcher
      }));
    };
  };
};

exports.setupGraphiQL = setupGraphiQL;