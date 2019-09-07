"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _coreEvents = require("@storybook/core-events");

var _addonKnobs = require("@storybook/addon-knobs");

var _GroupTabs = _interopRequireDefault(require("./GroupTabs"));

var _PropForm = _interopRequireDefault(require("./PropForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var getTimestamp = function getTimestamp() {
  return +new Date();
};

var DEFAULT_GROUP_ID = 'Other';

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, props));

    _this.reset = function () {
      var channel = _this.props.channel;

      _this.setState({
        knobs: {}
      });

      channel.emit(_addonKnobs.RESET);
    };

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.setKnobs = _this.setKnobs.bind(_assertThisInitialized(_this));
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    _this.setOptions = _this.setOptions.bind(_assertThisInitialized(_this));
    _this.onGroupSelect = _this.onGroupSelect.bind(_assertThisInitialized(_this));
    _this.state = {
      knobs: {},
      groupId: DEFAULT_GROUP_ID
    };
    _this.options = {};
    _this.lastEdit = getTimestamp();
    _this.loadedFromUrl = false;
    return _this;
  }

  _createClass(Panel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var channel = this.props.channel;
      channel.on(_addonKnobs.SET, this.setKnobs);
      channel.on(_addonKnobs.SET_OPTIONS, this.setOptions);
      channel.on(_coreEvents.SELECT_STORY, this.reset);
      channel.emit(_coreEvents.FORCE_RE_RENDER);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var channel = this.props.channel;
      channel.removeListener(_addonKnobs.SET, this.setKnobs);
      channel.removeListener(_coreEvents.SELECT_STORY, this.reset);
    }
  }, {
    key: "onGroupSelect",
    value: function onGroupSelect(name) {
      this.setState({
        groupId: name
      });
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        timestamps: false
      };
      this.options = options;
    }
  }, {
    key: "setKnobs",
    value: function setKnobs(_ref) {
      var knobs = _ref.knobs,
          timestamp = _ref.timestamp;

      if (!this.options.timestamps || !timestamp || this.lastEdit <= timestamp) {
        this.setState({
          knobs: knobs
        });
      }
    }
  }, {
    key: "emitChange",
    value: function emitChange(changedKnob) {
      var channel = this.props.channel;
      channel.emit(_addonKnobs.CHANGE, changedKnob);
    }
  }, {
    key: "handleChange",
    value: function handleChange(changedKnob) {
      this.lastEdit = getTimestamp();
      var knobs = this.state.knobs;
      var name = changedKnob.name;
      var newKnobs = Object.assign({}, knobs);
      newKnobs[name] = Object.assign({}, newKnobs[name], {}, changedKnob);
      this.setState({
        knobs: newKnobs
      });
      this.setState({
        knobs: newKnobs
      }, this.emitChange(changedKnob));
    }
  }, {
    key: "handleClick",
    value: function handleClick(knob) {
      var channel = this.props.channel;
      channel.emit(_addonKnobs.CLICK, knob);
    }
  }, {
    key: "render",
    value: function render() {
      var active = this.props.active;

      if (!active) {
        return null;
      }

      var _this$state = this.state,
          knobs = _this$state.knobs,
          groupId = _this$state.groupId;
      var groups = {};
      var groupIds = [];
      var knobsArray = Object.keys(knobs);
      knobsArray.filter(function (key) {
        return knobs[key].groupId;
      }).forEach(function (key) {
        var knobKeyGroupId = knobs[key].groupId;
        groupIds.push(knobKeyGroupId);
        groups[knobKeyGroupId] = {
          render: function render() {
            return _react["default"].createElement(_reactNative.Text, {
              id: knobKeyGroupId
            }, knobKeyGroupId);
          },
          title: knobKeyGroupId
        };
      });

      if (groupIds.length > 0) {
        groups[DEFAULT_GROUP_ID] = {
          render: function render() {
            return _react["default"].createElement(_reactNative.Text, {
              id: DEFAULT_GROUP_ID
            }, DEFAULT_GROUP_ID);
          },
          title: DEFAULT_GROUP_ID
        };

        if (groupId !== DEFAULT_GROUP_ID) {
          knobsArray = knobsArray.filter(function (key) {
            return knobs[key].groupId === groupId;
          });
        }
      }

      knobsArray = knobsArray.map(function (key) {
        return knobs[key];
      });

      if (knobsArray.length === 0) {
        return _react["default"].createElement(_reactNative.Text, null, "NO KNOBS");
      }

      return _react["default"].createElement(_reactNative.View, {
        style: {
          flex: 1
        }
      }, groupIds.length > 0 && _react["default"].createElement(_GroupTabs["default"], {
        groups: groups,
        onGroupSelect: this.onGroupSelect,
        selectedGroup: groupId
      }), _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_PropForm["default"], {
        knobs: knobsArray,
        onFieldChange: this.handleChange,
        onFieldClick: this.handleClick
      })), _react["default"].createElement(_reactNative.TouchableOpacity, {
        style: {
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#f7f4f4',
          padding: 4,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center'
        },
        onPress: this.reset
      }, _react["default"].createElement(_reactNative.Text, null, "RESET")));
    }
  }]);

  return Panel;
}(_react["default"].Component);

exports["default"] = Panel;
Panel.propTypes = {
  active: _propTypes["default"].bool.isRequired,
  channel: _propTypes["default"].shape({
    emit: _propTypes["default"].func,
    on: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }).isRequired,
  onReset: _propTypes["default"].object // eslint-disable-line

};