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

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _coreEvents = require("@storybook/core-events");

var _shared = require("../shared");

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

var provideTests = function provideTests(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(TestProvider, _React$Component);

    function TestProvider() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, TestProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TestProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.stopListeningOnStory = void 0;
      _this.mounted = void 0;
      _this.state = {};

      _this.onAddTests = function (_ref) {
        var kind = _ref.kind,
            storyName = _ref.storyName,
            tests = _ref.tests;

        _this.setState({
          kind: kind,
          storyName: storyName,
          tests: tests
        });
      };

      return _this;
    }

    _createClass(TestProvider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.mounted = true;
        var api = this.props.api;
        this.stopListeningOnStory = api.on(_coreEvents.STORY_CHANGED, function () {
          var _this2$state = _this2.state,
              kind = _this2$state.kind,
              storyName = _this2$state.storyName,
              tests = _this2$state.tests;

          if (_this2.mounted && (kind || storyName || tests)) {
            _this2.onAddTests({});
          }
        });
        api.on(_shared.ADD_TESTS, this.onAddTests);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mounted = false;
        var api = this.props.api;
        this.stopListeningOnStory();
        api.off(_shared.ADD_TESTS, this.onAddTests);
      }
    }, {
      key: "render",
      value: function render() {
        var active = this.props.active;
        var tests = this.state.tests;
        return active && tests ? _react["default"].createElement(Component, {
          tests: tests
        }) : null;
      }
    }]);

    return TestProvider;
  }(_react["default"].Component), _class.defaultProps = {
    active: false
  }, _temp;
};

var _default = provideTests;
exports["default"] = _default;