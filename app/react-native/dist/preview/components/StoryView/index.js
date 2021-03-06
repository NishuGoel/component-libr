"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _native = _interopRequireDefault(require("@emotion/native"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HelpContainer =
/*#__PURE__*/
_native["default"].View("flex:1;padding-horizontal:15;padding-vertical:15;align-items:center;justify-content:center;");

var StoryView =
/*#__PURE__*/
function (_Component) {
  _inherits(StoryView, _Component);

  function StoryView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StoryView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StoryView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.forceReRender = function () {
      _this.forceUpdate();
    };

    _this.renderHelp = function () {
      var url = _this.props.url;
      return _react["default"].createElement(HelpContainer, null, url && url.length ? _react["default"].createElement(_reactNative.Text, null, "Please open the Storybook UI (", url, ") with a web browser and select a story for preview.") : _react["default"].createElement(_reactNative.Text, null, "Please open the Storybook UI with a web browser and select a story for preview."));
    };

    _this.renderOnDeviceUIHelp = function () {
      return _react["default"].createElement(HelpContainer, null, _react["default"].createElement(_reactNative.Text, null, "Please open navigator and select a story to preview."));
    };

    return _this;
  }

  _createClass(StoryView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var channel = _addons["default"].getChannel();

      channel.on(_coreEvents["default"].STORY_RENDER, this.forceReRender);
      channel.on(_coreEvents["default"].FORCE_RE_RENDER, this.forceReRender);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var channel = _addons["default"].getChannel();

      channel.removeListener(_coreEvents["default"].STORY_RENDER, this.forceReRender);
      channel.removeListener(_coreEvents["default"].FORCE_RE_RENDER, this.forceReRender);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onDevice = _this$props.onDevice,
          stories = _this$props.stories;

      var _stories$getSelection = stories.getSelection(),
          storyId = _stories$getSelection.storyId;

      var story = stories.fromId(storyId);

      if (story && story.storyFn) {
        var id = story.id,
            storyFn = story.storyFn;
        return _react["default"].createElement(_reactNative.View, {
          key: id,
          style: {
            flex: 1
          }
        }, storyFn());
      }

      if (onDevice) {
        return this.renderOnDeviceUIHelp();
      }

      return this.renderHelp();
    }
  }]);

  return StoryView;
}(_react.Component);

exports["default"] = StoryView;