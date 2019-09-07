"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _Swatch = _interopRequireDefault(require("./Swatch"));

var _constants = _interopRequireWildcard(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codeSample = "\nimport { storiesOf } from '@storybook/react-native';\nimport { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';\n\naddDecorator(withBackgrounds);\n\nstoriesOf('First Component', module)\n  .addParameters({\n    backgrounds: [\n      { name: 'warm', value: 'hotpink', default: true },\n      { name: 'cool', value: 'deepskyblue' },\n    ],\n  })\n  .add(\"First Button\", () => <Button>Click me</Button>);\n".trim();

var Instructions = function Instructions() {
  return _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_reactNative.Text, {
    style: {
      fontSize: 16
    }
  }, "Setup Instructions"), _react["default"].createElement(_reactNative.Text, null, "Please add the background decorator definition to your story. The background decorate accepts an array of items, which should include a name for your color (preferably the css class name) and the corresponding color / image value."), _react["default"].createElement(_reactNative.Text, null, "Below is an example of how to add the background decorator to your story definition."), _react["default"].createElement(_reactNative.Text, null, codeSample));
};

var BackgroundPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(BackgroundPanel, _Component);

  function BackgroundPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BackgroundPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BackgroundPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.setBackgroundFromSwatch = function (background) {
      _this.props.channel.emit(_constants["default"].UPDATE_BACKGROUND, background);
    };

    _this.onStorySelected = function (selection) {
      _this.setState({
        selection: selection
      });
    };

    return _this;
  }

  _createClass(BackgroundPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.channel.on(_coreEvents["default"].SELECT_STORY, this.onStorySelected);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.channel.removeListener(_coreEvents["default"].SELECT_STORY, this.onStorySelected);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          active = _this$props.active,
          api = _this$props.api;

      if (!active) {
        return null;
      }

      var story = api.store().getStoryAndParameters(this.state.selection.kind, this.state.selection.story);
      var backgrounds = story.parameters[_constants.PARAM_KEY];
      return _react["default"].createElement(_reactNative.View, null, backgrounds ? backgrounds.map(function (_ref) {
        var value = _ref.value,
            name = _ref.name;
        return _react["default"].createElement(_reactNative.View, {
          key: "".concat(name, " ").concat(value)
        }, _react["default"].createElement(_Swatch["default"], {
          value: value,
          name: name,
          setBackground: _this2.setBackgroundFromSwatch
        }));
      }) : _react["default"].createElement(Instructions, null));
    }
  }]);

  return BackgroundPanel;
}(_react.Component);

exports["default"] = BackgroundPanel;