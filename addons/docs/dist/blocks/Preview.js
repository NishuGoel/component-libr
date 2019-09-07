"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = exports.SourceState = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _router = require("@storybook/router");

var _Source = require("./Source");

var _DocsContext = require("./DocsContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SourceState;
exports.SourceState = SourceState;

(function (SourceState) {
  SourceState["OPEN"] = "open";
  SourceState["CLOSED"] = "closed";
  SourceState["NONE"] = "none";
})(SourceState || (exports.SourceState = SourceState = {}));

var getPreviewProps = function getPreviewProps(_ref, _ref2) {
  var mdxKind = _ref2.mdxKind,
      storyStore = _ref2.storyStore;

  var _ref$withSource = _ref.withSource,
      withSource = _ref$withSource === void 0 ? SourceState.CLOSED : _ref$withSource,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["withSource", "children"]);

  if (withSource === SourceState.NONE && !children) {
    return props;
  }

  var childArray = Array.isArray(children) ? children : [children];
  var stories = childArray.filter(function (c) {
    return c.props && (c.props.id || c.props.name);
  });
  var targetIds = stories.map(function (s) {
    return s.props.id || (0, _router.toId)(mdxKind, s.props.name);
  });
  var sourceProps = (0, _Source.getSourceProps)({
    ids: targetIds
  }, {
    storyStore: storyStore
  });
  return Object.assign({}, props, {
    // pass through columns etc.
    withSource: sourceProps,
    isExpanded: withSource === SourceState.OPEN
  });
};

var Preview = function Preview(props) {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var previewProps = getPreviewProps(props, context);
    return _react["default"].createElement(_components.Preview, previewProps, props.children);
  });
};

exports.Preview = Preview;