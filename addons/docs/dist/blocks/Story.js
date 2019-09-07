"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Story = exports.getStoryProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("@storybook/router");

var _components = require("@storybook/components");

var _shared = require("./shared");

var _DocsContext = require("./DocsContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var inferInlineStories = function inferInlineStories(framework) {
  switch (framework) {
    case 'react':
      return true;

    default:
      return false;
  }
};

var getStoryProps = function getStoryProps(props, _ref) {
  var currentId = _ref.id,
      storyStore = _ref.storyStore,
      parameters = _ref.parameters,
      mdxKind = _ref.mdxKind;
  var _ref2 = props,
      id = _ref2.id;
  var _ref3 = props,
      name = _ref3.name;
  var inputId = id === _shared.CURRENT_SELECTION ? currentId : id;
  var previewId = inputId || (0, _router.toId)(mdxKind, name);
  var height = props.height,
      inline = props.inline;
  var data = storyStore.fromId(previewId);

  var _ref4 = parameters || {},
      _ref4$framework = _ref4.framework,
      framework = _ref4$framework === void 0 ? null : _ref4$framework; // prefer props, then global options, then framework-inferred values


  var _ref5 = parameters && parameters.options && parameters.options.docs || {},
      _ref5$inlineStories = _ref5.inlineStories,
      inlineStories = _ref5$inlineStories === void 0 ? inferInlineStories(framework) : _ref5$inlineStories,
      _ref5$iframeHeight = _ref5.iframeHeight,
      iframeHeight = _ref5$iframeHeight === void 0 ? undefined : _ref5$iframeHeight;

  return {
    inline: typeof inline === 'boolean' ? inline : inlineStories,
    id: previewId,
    storyFn: data && data.storyFn,
    height: height || iframeHeight,
    title: data && data.name
  };
};

exports.getStoryProps = getStoryProps;

var StoryContainer = function StoryContainer(props) {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var storyProps = getStoryProps(props, context);
    return _react["default"].createElement(_components.Story, storyProps);
  });
};

exports.Story = StoryContainer;
StoryContainer.defaultProps = {
  children: null,
  name: null
};