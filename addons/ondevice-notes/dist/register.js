"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAM_KEY = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeSimpleMarkdown = _interopRequireDefault(require("react-native-simple-markdown"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

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

var PARAM_KEY = "notes";
exports.PARAM_KEY = PARAM_KEY;

var Notes =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Notes, _React$Component);

  function Notes() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notes);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notes)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onStorySelected = function (selection) {
      _this.setState({
        selection: selection
      });
    };

    return _this;
  }

  _createClass(Notes, [{
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
      var _this$props = this.props,
          active = _this$props.active,
          api = _this$props.api;

      if (!active) {
        return null;
      }

      var story = api.store().getStoryAndParameters(this.state.selection.kind, this.state.selection.story);
      var text = story.parameters[PARAM_KEY];
      var textAfterFormatted = text ? text.trim() : '';
      return _react["default"].createElement(_reactNative.View, {
        style: {
          padding: 10,
          flex: 1
        }
      }, _react["default"].createElement(_reactNativeSimpleMarkdown["default"], null, textAfterFormatted));
    }
  }]);

  return Notes;
}(_react["default"].Component);

_addons["default"].register('storybook/notes', function (api) {
  var channel = _addons["default"].getChannel();

  _addons["default"].addPanel('storybook/notes/panel', {
    title: 'Notes',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return _react["default"].createElement(Notes, {
        key: key,
        channel: channel,
        api: api,
        active: active
      });
    },
    paramKey: PARAM_KEY
  });
});