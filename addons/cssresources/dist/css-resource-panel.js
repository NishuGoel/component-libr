"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

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
exports.CssResourcePanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _coreEvents = require("@storybook/core-events");

var _constants = require("./constants");

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

var CssResourcePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CssResourcePanel, _Component);

  function CssResourcePanel(props) {
    var _this;

    _classCallCheck(this, CssResourcePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CssResourcePanel).call(this, props));

    _this.onStoryChange = function (id) {
      var _this$state = _this.state,
          currentList = _this$state.list,
          currentStoryId = _this$state.currentStoryId;
      var api = _this.props.api;
      var list = api.getParameters(id, _constants.PARAM_KEY);

      if (list && currentStoryId !== id) {
        var existingIds = currentList.reduce(function (lookup, res) {
          // eslint-disable-next-line no-param-reassign
          lookup[res.id] = res;
          return lookup;
        }, {});
        var mergedList = list.map(function (res) {
          var existingItem = existingIds[res.id];
          return existingItem ? Object.assign({}, res, {
            picked: existingItem.picked
          }) : res;
        });
        var picked = mergedList.filter(function (res) {
          return res.picked;
        });

        _this.setState({
          list: mergedList,
          currentStoryId: id
        }, function () {
          return _this.emit(picked);
        });
      }
    };

    _this.onChange = function (event) {
      var oldList = _this.state.list;
      var list = oldList.map(function (i) {
        return Object.assign({}, i, {
          picked: i.id === event.target.id ? event.target.checked : i.picked
        });
      });

      _this.setState({
        list: list
      }, function () {
        return _this.emit(list.filter(function (res) {
          return res.picked;
        }));
      });
    };

    _this.state = {
      currentStoryId: '',
      list: []
    };
    return _this;
  }

  _createClass(CssResourcePanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(_coreEvents.STORY_RENDERED, this.onStoryChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(_coreEvents.STORY_RENDERED, this.onStoryChange);
    }
  }, {
    key: "emit",
    value: function emit(list) {
      var api = this.props.api;
      api.emit(_constants.EVENTS.SET, list);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var list = this.state.list;
      var active = this.props.active;

      if (!active) {
        return null;
      }

      return _react["default"].createElement("div", null, list && list.map(function (_ref) {
        var id = _ref.id,
            code = _ref.code,
            picked = _ref.picked;
        return _react["default"].createElement("div", {
          key: id,
          style: {
            padding: 10
          }
        }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
          type: "checkbox",
          checked: picked,
          onChange: _this2.onChange,
          id: id
        }), _react["default"].createElement("span", null, "#", id)), code ? _react["default"].createElement(_components.SyntaxHighlighter, {
          language: "html"
        }, code) : null);
      }));
    }
  }]);

  return CssResourcePanel;
}(_react.Component);

exports.CssResourcePanel = CssResourcePanel;