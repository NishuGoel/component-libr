"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _router = require("@storybook/router");

var _components = require("@storybook/components");

var _createElement = _interopRequireDefault(require("react-syntax-highlighter/create-element"));

var _events = require("./events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StyledStoryLink = (0, _theming.styled)(_router.Link)(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'block',
    textDecoration: 'none',
    borderRadius: theme.appBorderRadius,
    color: 'inherit',
    '&:hover': {
      background: theme.background.hoverable
    }
  };
});

var SelectedStoryHighlight = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    background: theme.background.hoverable,
    borderRadius: theme.appBorderRadius
  };
});

var StyledSyntaxHighlighter = (0, _theming.styled)(_components.SyntaxHighlighter)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.s2 - 1
  };
});

var areLocationsEqual = function areLocationsEqual(a, b) {
  return a.startLoc.line === b.startLoc.line && a.startLoc.col === b.startLoc.col && a.endLoc.line === b.endLoc.line && a.endLoc.col === b.endLoc.col;
};

var getLocationKeys = function getLocationKeys(locationsMap) {
  return locationsMap ? Array.from(Object.keys(locationsMap)).sort(function (key1, key2) {
    return locationsMap[key1].startLoc.line - locationsMap[key2].startLoc.line;
  }) : [];
};

var StoryPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(StoryPanel, _Component);

  function StoryPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StoryPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StoryPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      source: 'loading source...'
    };

    _this.setSelectedStoryRef = function (ref) {
      _this.selectedStoryRef = ref;
    };

    _this.listener = function (_ref4) {
      var source = _ref4.edition.source,
          _ref4$location = _ref4.location,
          currentLocation = _ref4$location.currentLocation,
          locationsMap = _ref4$location.locationsMap;
      var locationsKeys = getLocationKeys(locationsMap);

      _this.setState({
        source: source,
        currentLocation: currentLocation,
        locationsMap: locationsMap,
        locationsKeys: locationsKeys
      });
    };

    _this.createPart = function (rows, stylesheet, useInlineStyles) {
      return rows.map(function (node, i) {
        return (0, _createElement["default"])({
          node: node,
          stylesheet: stylesheet,
          useInlineStyles: useInlineStyles,
          key: "code-segement".concat(i)
        });
      });
    };

    _this.createStoryPart = function (rows, stylesheet, useInlineStyles, location, id) {
      var currentLocation = _this.state.currentLocation;
      var first = location.startLoc.line - 1;
      var last = location.endLoc.line;
      var storyRows = rows.slice(first, last);

      var story = _this.createPart(storyRows, stylesheet, useInlineStyles);

      var storyKey = "".concat(first, "-").concat(last);

      if (location && currentLocation && areLocationsEqual(location, currentLocation)) {
        return _react["default"].createElement(SelectedStoryHighlight, {
          key: storyKey,
          ref: _this.setSelectedStoryRef
        }, story);
      }

      return _react["default"].createElement(StyledStoryLink, {
        to: "/story/".concat(id),
        key: storyKey
      }, story);
    };

    _this.createParts = function (rows, stylesheet, useInlineStyles) {
      var _this$state = _this.state,
          locationsMap = _this$state.locationsMap,
          locationsKeys = _this$state.locationsKeys;
      var parts = [];
      var lastRow = 0;
      locationsKeys.forEach(function (key) {
        var location = locationsMap[key];
        var first = location.startLoc.line - 1;
        var last = location.endLoc.line;

        var start = _this.createPart(rows.slice(lastRow, first), stylesheet, useInlineStyles);

        var storyPart = _this.createStoryPart(rows, stylesheet, useInlineStyles, location, key);

        parts.push(start);
        parts.push(storyPart);
        lastRow = last;
      });

      var lastPart = _this.createPart(rows.slice(lastRow), stylesheet, useInlineStyles);

      parts.push(lastPart);
      return parts;
    };

    _this.lineRenderer = function (_ref5) {
      var rows = _ref5.rows,
          stylesheet = _ref5.stylesheet,
          useInlineStyles = _ref5.useInlineStyles;
      var _this$state2 = _this.state,
          locationsMap = _this$state2.locationsMap,
          locationsKeys = _this$state2.locationsKeys; // because of the usage of lineRenderer, all lines will be wrapped in a span
      // these spans will recieve all classes on them for some reason
      // which makes colours casecade incorrectly
      // this removed that list of classnames

      var myrows = rows.map(function (_ref6) {
        var properties = _ref6.properties,
            rest = _objectWithoutProperties(_ref6, ["properties"]);

        return Object.assign({}, rest, {
          properties: {
            className: []
          }
        });
      });

      if (!locationsMap || !locationsKeys.length) {
        return _this.createPart(myrows, stylesheet, useInlineStyles);
      }

      var parts = _this.createParts(myrows, stylesheet, useInlineStyles);

      return _react["default"].createElement("span", null, parts);
    };

    return _this;
  }

  _createClass(StoryPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      var api = this.props.api;
      api.on(_events.EVENT_ID, this.listener);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.selectedStoryRef) {
        this.selectedStoryRef.scrollIntoView();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(_events.EVENT_ID, this.listener);
    }
  }, {
    key: "render",
    value: function render() {
      var active = this.props.active;
      var source = this.state.source;
      return active ? _react["default"].createElement(StyledSyntaxHighlighter, {
        language: "jsx",
        showLineNumbers: "true",
        renderer: this.lineRenderer,
        format: false,
        copyable: false,
        padded: true
      }, source) : null;
    }
  }]);

  return StoryPanel;
}(_react.Component);

exports["default"] = StoryPanel;
StoryPanel.propTypes = {
  active: _propTypes["default"].bool.isRequired,
  api: _propTypes["default"].shape({
    selectStory: _propTypes["default"].func.isRequired,
    emit: _propTypes["default"].func,
    on: _propTypes["default"].func,
    off: _propTypes["default"].func
  }).isRequired
};