"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Story = exports.StoryError = void 0;

var _react = _interopRequireDefault(require("react"));

var _IFrame = require("./IFrame");

var _EmptyBlock = require("./EmptyBlock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'iframe.html';
var StoryError;
exports.StoryError = StoryError;

(function (StoryError) {
  StoryError["NO_STORY"] = "No component or story to display";
})(StoryError || (exports.StoryError = StoryError = {}));

var InlineStory = function InlineStory(_ref) {
  var storyFn = _ref.storyFn,
      height = _ref.height;
  return _react["default"].createElement("div", {
    style: {
      height: height
    }
  }, storyFn());
};

InlineStory.displayName = "InlineStory";

var IFrameStory = function IFrameStory(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? '500px' : _ref2$height;
  return _react["default"].createElement("div", {
    style: {
      width: '100%',
      height: height
    }
  }, _react["default"].createElement(_IFrame.IFrame, {
    key: "iframe",
    id: "storybook-Story-".concat(id),
    title: title,
    src: "".concat(BASE_URL, "?id=").concat(id, "&viewMode=story"),
    allowFullScreen: true,
    scale: 1,
    style: {
      width: '100%',
      height: '100%',
      border: '0 none'
    }
  }));
};

IFrameStory.displayName = "IFrameStory";

/**
 * A story element, either renderend inline or in an iframe,
 * with configurable height.
 */
var Story = function Story(props) {
  var _ref3 = props,
      error = _ref3.error;
  var _ref4 = props,
      storyFn = _ref4.storyFn;
  var _ref5 = props,
      id = _ref5.id;
  var inline = props.inline,
      title = props.title,
      height = props.height;

  if (error) {
    return _react["default"].createElement(_EmptyBlock.EmptyBlock, null, error);
  }

  return inline ? _react["default"].createElement(InlineStory, {
    storyFn: storyFn,
    title: title,
    height: height
  }) : _react["default"].createElement(IFrameStory, {
    id: id,
    title: title,
    height: height
  });
};

exports.Story = Story;