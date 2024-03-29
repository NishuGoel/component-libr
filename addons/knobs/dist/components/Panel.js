"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_GROUP_ID = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _qs = _interopRequireDefault(require("qs"));

var _global = require("global");

var _theming = require("@storybook/theming");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _shared = require("../shared");

var _types = require("./types");

var _PropForm = _interopRequireDefault(require("./PropForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var getTimestamp = function getTimestamp() {
  return +new Date();
};

var DEFAULT_GROUP_ID = 'Other';
exports.DEFAULT_GROUP_ID = DEFAULT_GROUP_ID;
var PanelWrapper = (0, _theming.styled)(function (_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react["default"].createElement(_components.ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  height: '100%',
  width: '100%'
});

var KnobPanel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(KnobPanel, _PureComponent);

  function KnobPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KnobPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KnobPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      knobs: {}
    };
    _this.options = {};
    _this.lastEdit = getTimestamp();
    _this.loadedFromUrl = false;
    _this.mounted = false;
    _this.stopListeningOnStory = void 0;

    _this.setOptions = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        timestamps: false
      };
      _this.options = options;
    };

    _this.setKnobs = function (_ref2) {
      var knobs = _ref2.knobs,
          timestamp = _ref2.timestamp;
      var queryParams = {};
      var api = _this.props.api;

      if (!_this.options.timestamps || !timestamp || _this.lastEdit <= timestamp) {
        Object.keys(knobs).forEach(function (name) {
          var knob = knobs[name]; // For the first time, get values from the URL and set them.

          if (!_this.loadedFromUrl) {
            var urlValue = api.getQueryParam("knob-".concat(name)); // If the knob value present in url

            if (urlValue !== undefined) {
              var value = (0, _types.getKnobControl)(knob.type).deserialize(urlValue);
              knob.value = value;
              queryParams["knob-".concat(name)] = (0, _types.getKnobControl)(knob.type).serialize(value);
              api.emit(_shared.CHANGE, knob);
            }
          }
        });
        api.setQueryParams(queryParams);

        _this.setState({
          knobs: knobs
        });

        _this.loadedFromUrl = true;
      }
    };

    _this.reset = function () {
      var api = _this.props.api;
      api.emit(_shared.RESET);
    };

    _this.copy = function () {
      var location = _global.document.location;

      var query = _qs["default"].parse(location.search, {
        ignoreQueryPrefix: true
      });

      var knobs = _this.state.knobs;
      Object.entries(knobs).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            knob = _ref4[1];

        query["knob-".concat(name)] = (0, _types.getKnobControl)(knob.type).serialize(knob.value);
      });
      (0, _copyToClipboard["default"])("".concat(location.origin + location.pathname, "?").concat(_qs["default"].stringify(query, {
        encode: false
      }))); // TODO: show some notification of this
    };

    _this.emitChange = function (changedKnob) {
      var api = _this.props.api;
      api.emit(_shared.CHANGE, changedKnob);
    };

    _this.handleChange = function (changedKnob) {
      _this.lastEdit = getTimestamp();
      var api = _this.props.api;
      var knobs = _this.state.knobs;
      var name = changedKnob.name;
      var newKnobs = Object.assign({}, knobs);
      newKnobs[name] = Object.assign({}, newKnobs[name], {}, changedKnob);

      _this.setState({
        knobs: newKnobs
      }, function () {
        _this.emitChange(changedKnob);

        var queryParams = {};
        Object.keys(newKnobs).forEach(function (n) {
          var knob = newKnobs[n];
          queryParams["knob-".concat(n)] = (0, _types.getKnobControl)(knob.type).serialize(knob.value);
        });
        api.setQueryParams(queryParams);
      });
    };

    _this.handleClick = function (knob) {
      var api = _this.props.api;
      api.emit(_shared.CLICK, knob);
    };

    return _this;
  }

  _createClass(KnobPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var api = this.props.api;
      api.on(_shared.SET, this.setKnobs);
      api.on(_shared.SET_OPTIONS, this.setOptions);
      this.stopListeningOnStory = api.on(_coreEvents.STORY_CHANGED, function () {
        if (_this2.mounted) {
          _this2.setKnobs({
            knobs: {}
          });
        }

        _this2.setKnobs({
          knobs: {}
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      var api = this.props.api;
      api.off(_shared.SET, this.setKnobs);
      this.stopListeningOnStory();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var knobs = this.state.knobs;
      var panelActive = this.props.active;

      if (!panelActive) {
        return null;
      }

      var groups = {};
      var groupIds = [];
      var knobKeysArray = Object.keys(knobs).filter(function (key) {
        return knobs[key].used;
      });
      knobKeysArray.forEach(function (key) {
        var knobKeyGroupId = knobs[key].groupId || DEFAULT_GROUP_ID;
        groupIds.push(knobKeyGroupId);
        groups[knobKeyGroupId] = {
          render: function render(_ref5) {
            var active = _ref5.active;
            return _react["default"].createElement(_components.TabWrapper, {
              key: knobKeyGroupId,
              active: active
            }, _react["default"].createElement(_PropForm["default"], {
              knobs: knobsArray.filter(function (knob) {
                return (knob.groupId || DEFAULT_GROUP_ID) === knobKeyGroupId;
              }),
              onFieldChange: _this3.handleChange,
              onFieldClick: _this3.handleClick
            }));
          },
          title: knobKeyGroupId
        };
      });
      var knobsArray = knobKeysArray.map(function (key) {
        return knobs[key];
      });

      if (knobsArray.length === 0) {
        return _react["default"].createElement(_components.Placeholder, null, _react["default"].createElement(_react.Fragment, null, "No knobs found"), _react["default"].createElement(_react.Fragment, null, "Learn how to", ' ', _react["default"].createElement(_components.Link, {
          href: "https://github.com/storybookjs/storybook/tree/master/addons/knobs",
          target: "_blank",
          withArrow: true
        }, "dynamically interact with components")));
      } // Always sort DEFAULT_GROUP_ID (ungrouped) tab last without changing the remaining tabs


      var sortEntries = function sortEntries(g) {
        var unsortedKeys = Object.keys(g);

        if (unsortedKeys.indexOf(DEFAULT_GROUP_ID) !== -1) {
          var sortedKeys = unsortedKeys.filter(function (key) {
            return key !== DEFAULT_GROUP_ID;
          });
          sortedKeys.push(DEFAULT_GROUP_ID);
          return sortedKeys.map(function (key) {
            return [key, g[key]];
          });
        }

        return Object.entries(g);
      };

      var entries = sortEntries(groups);
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(PanelWrapper, null, entries.length > 1 ? _react["default"].createElement(_components.TabsState, null, entries.map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            k = _ref7[0],
            v = _ref7[1];

        return _react["default"].createElement("div", {
          id: k,
          key: k,
          title: v.title
        }, v.render);
      })) : _react["default"].createElement(_PropForm["default"], {
        knobs: knobsArray,
        onFieldChange: this.handleChange,
        onFieldClick: this.handleClick
      })), _react["default"].createElement(_components.ActionBar, {
        actionItems: [{
          title: 'Copy',
          onClick: this.copy
        }, {
          title: 'Reset',
          onClick: this.reset
        }]
      }));
    }
  }]);

  return KnobPanel;
}(_react.PureComponent);

exports["default"] = KnobPanel;
KnobPanel.propTypes = {
  active: _propTypes["default"].bool.isRequired,
  onReset: _propTypes["default"].object,
  // eslint-disable-line
  api: _propTypes["default"].shape({
    on: _propTypes["default"].func,
    getQueryParam: _propTypes["default"].func,
    setQueryParams: _propTypes["default"].func
  }).isRequired
};