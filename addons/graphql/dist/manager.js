"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _graphiql = _interopRequireDefault(require("graphiql"));

require("graphiql/graphiql.css");

var _api = require("@storybook/api");

var _ = require(".");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GQL = function GQL(_ref) {
  var active = _ref.active;
  return active ? _react["default"].createElement(_api.Consumer, null, function (_ref2) {
    var api = _ref2.api,
        state = _ref2.state;
    var story = state.storiesHash[state.storyId];
    var parameters = story ? api.getParameters(story.id, _.PARAM_KEY) : null;

    if (parameters) {
      var query = (0, _shared.reIndentQuery)(parameters.query);
      var variables = parameters.variables || '{}';
      var url = parameters.url || '';
      var fetcher = parameters.fetcher || (0, _shared.getDefaultFetcher)(url);
      return _react["default"].createElement(_graphiql["default"], {
        query: query,
        variables: variables,
        fetcher: fetcher
      });
    }

    return _react["default"].createElement("div", null, "You have not configured GraphiQL yet");
  }) : null;
};

GQL.propTypes = {
  active: _propTypes["default"].bool.isRequired
};
var _default = GQL;
exports["default"] = _default;