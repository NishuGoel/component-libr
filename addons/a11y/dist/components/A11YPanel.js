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

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A11YPanel = exports.RuleType = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _reactRedux = require("react-redux");

var _Report = require("./Report");

var _Tabs = require("./Tabs");

var _constants = require("../constants");

var _reduxConfig = _interopRequireWildcard(require("../redux-config"));

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

var RuleType;
exports.RuleType = RuleType;

(function (RuleType) {
  RuleType[RuleType["VIOLATION"] = 0] = "VIOLATION";
  RuleType[RuleType["PASS"] = 1] = "PASS";
  RuleType[RuleType["INCOMPLETION"] = 2] = "INCOMPLETION";
})(RuleType || (exports.RuleType = RuleType = {}));

var Icon = (0, _theming.styled)(_components.Icons)({
  height: '12px',
  width: '12px',
  marginRight: '4px'
}, function (_ref) {
  var status = _ref.status,
      theme = _ref.theme;
  return status === 'running' ? {
    animation: "".concat(theme.animation.rotate360, " 1s linear infinite;")
  } : {};
});

var Passes = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    color: theme.color.positive
  };
});

var Violations = _theming.styled.span(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: theme.color.negative
  };
});

var Incomplete = _theming.styled.span(function (_ref4) {
  var theme = _ref4.theme;
  return {
    color: theme.color.warning
  };
});

var Loader = (0, _theming.styled)(function (_ref5) {
  var className = _ref5.className;
  return _react["default"].createElement("div", {
    className: className
  }, _react["default"].createElement(Icon, {
    inline: true,
    icon: "sync",
    status: "running"
  }), " Please wait while the accessibility scan is running ...");
})({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
});
Loader.displayName = 'Loader';

var A11YPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(A11YPanel, _Component);

  function A11YPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, A11YPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(A11YPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      status: 'ready',
      passes: [],
      violations: [],
      incomplete: []
    };

    _this.onUpdate = function (_ref6) {
      var passes = _ref6.passes,
          violations = _ref6.violations,
          incomplete = _ref6.incomplete;

      _this.setState({
        status: 'ran',
        passes: passes,
        violations: violations,
        incomplete: incomplete
      }, function () {
        setTimeout(function () {
          var status = _this.state.status;

          if (status === 'ran') {
            _this.setState({
              status: 'ready'
            });
          }
        }, 900);
      });
    };

    _this.request = function () {
      var _this$props = _this.props,
          api = _this$props.api,
          active = _this$props.active;

      if (active) {
        _this.setState({
          status: 'running'
        }, function () {
          api.emit(_constants.EVENTS.REQUEST); // removes all elements from the redux map in store from the previous panel

          _reduxConfig["default"].dispatch((0, _reduxConfig.clearElements)());
        });
      }
    };

    return _this;
  }

  _createClass(A11YPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(_coreEvents.STORY_RENDERED, this.request);
      api.on(_constants.EVENTS.RESULT, this.onUpdate);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // TODO: might be able to remove this
      var active = this.props.active;

      if (!prevProps.active && active) {
        // removes all elements from the redux map in store from the previous panel
        _reduxConfig["default"].dispatch((0, _reduxConfig.clearElements)());

        this.request();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(_coreEvents.STORY_RENDERED, this.request);
      api.off(_constants.EVENTS.RESULT, this.onUpdate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          passes = _this$state.passes,
          violations = _this$state.violations,
          incomplete = _this$state.incomplete,
          status = _this$state.status;
      var active = this.props.active;
      var actionTitle;

      if (status === 'ready') {
        actionTitle = 'Rerun tests';
      } else if (status === 'running') {
        actionTitle = _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Icon, {
          inline: true,
          icon: "sync",
          status: status
        }), " Running test");
      } else if (status === 'ran') {
        actionTitle = _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Icon, {
          inline: true,
          icon: "check"
        }), " Tests completed");
      }

      return active ? _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_reactRedux.Provider, {
        store: _reduxConfig["default"]
      }, status === 'running' ? _react["default"].createElement(Loader, null) : _react["default"].createElement(_components.ScrollArea, {
        vertical: true,
        horizontal: true
      }, _react["default"].createElement(_Tabs.Tabs, {
        key: "tabs",
        tabs: [{
          label: _react["default"].createElement(Violations, null, violations.length, " Violations"),
          panel: _react["default"].createElement(_Report.Report, {
            items: violations,
            type: RuleType.VIOLATION,
            empty: "No accessibility violations found."
          }),
          items: violations,
          type: RuleType.VIOLATION
        }, {
          label: _react["default"].createElement(Passes, null, passes.length, " Passes"),
          panel: _react["default"].createElement(_Report.Report, {
            items: passes,
            type: RuleType.PASS,
            empty: "No accessibility checks passed."
          }),
          items: passes,
          type: RuleType.PASS
        }, {
          label: _react["default"].createElement(Incomplete, null, incomplete.length, " Incomplete"),
          panel: _react["default"].createElement(_Report.Report, {
            items: incomplete,
            type: RuleType.INCOMPLETION,
            empty: "No accessibility checks incomplete."
          }),
          items: incomplete,
          type: RuleType.INCOMPLETION
        }]
      })), _react["default"].createElement(_components.ActionBar, {
        key: "actionbar",
        actionItems: [{
          title: actionTitle,
          onClick: this.request
        }]
      }))) : null;
    }
  }]);

  return A11YPanel;
}(_react.Component);

exports.A11YPanel = A11YPanel;