"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.reduce-right");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = void 0;

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _theming = require("@storybook/theming");

var _coreEvents = require("@storybook/core-events");

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _reactHelmetAsync = require("react-helmet-async");

var _toolbar = require("./toolbar");

var S = _interopRequireWildcard(require("./components"));

var _zoom = require("./zoom");

var _iframe = require("./iframe");

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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DesktopOnly = _theming.styled.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none'
  }
});

var stringifyQueryParams = function stringifyQueryParams(queryParams) {
  return Object.entries(queryParams).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return "".concat(acc, "&").concat(k, "=").concat(v);
  }, '');
};

var renderIframe = function renderIframe(storyId, viewMode, id, baseUrl, scale, queryParams) {
  return _react["default"].createElement(_iframe.IFrame, {
    key: "iframe",
    id: "storybook-preview-iframe",
    title: id || 'preview',
    src: "".concat(baseUrl, "?id=").concat(storyId, "&viewMode=").concat(viewMode).concat(stringifyQueryParams(queryParams)),
    allowFullScreen: true,
    scale: scale
  });
};

renderIframe.displayName = "renderIframe";
var getElementList = (0, _memoizerific["default"])(10)(function (getFn, type, base) {
  return base.concat(Object.values(getFn(type)));
});

var ActualPreview = function ActualPreview(_ref3) {
  var wrappers = _ref3.wrappers,
      viewMode = _ref3.viewMode,
      id = _ref3.id,
      storyId = _ref3.storyId,
      active = _ref3.active,
      baseUrl = _ref3.baseUrl,
      scale = _ref3.scale,
      queryParams = _ref3.queryParams,
      customCanvas = _ref3.customCanvas;
  var data = [storyId, viewMode, id, baseUrl, scale, queryParams];
  var base = customCanvas ? customCanvas.apply(void 0, data) : renderIframe.apply(void 0, data);
  return wrappers.reduceRight(function (acc, wrapper, index) {
    return wrapper.render({
      index: index,
      children: acc,
      id: id,
      storyId: storyId,
      active: active
    });
  }, base);
};

var IframeWrapper = _theming.styled.div(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.background.content
  };
});

var defaultWrappers = [{
  render: function render(p) {
    return _react["default"].createElement(IframeWrapper, {
      id: "storybook-preview-wrapper",
      hidden: !p.active
    }, p.children);
  }
}];

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_components.Separator, null);

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_components.Separator, null);

var _ref8 =
/*#__PURE__*/
_react["default"].createElement(_components.Icons, {
  icon: "share"
});

var _ref9 =
/*#__PURE__*/
_react["default"].createElement(_components.Icons, {
  icon: "copy"
});

var getTools = (0, _memoizerific["default"])(10)(function (getElements, queryParams, panels, api, options, storyId, viewMode, location, path, baseUrl) {
  var tools = getElementList(getElements, _addons.types.TOOL, [panels.filter(function (p) {
    return p.id !== 'canvas';
  }).length ? {
    render: function render() {
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_components.TabBar, {
        key: "tabs",
        scroll: false
      }, panels.map(function (t, index) {
        var to = t.route({
          storyId: storyId,
          viewMode: viewMode,
          path: path,
          location: location
        });
        var isActive = path === to;
        return _react["default"].createElement(S.UnstyledLink, {
          key: t.id || "l".concat(index),
          to: to
        }, _react["default"].createElement(_components.TabButton, {
          active: isActive
        }, t.title));
      })), _ref5);
    }
  } : null, {
    match: function match(p) {
      return p.viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_zoom.ZoomConsumer, null, function (_ref6) {
        var _set = _ref6.set,
            value = _ref6.value;
        return _react["default"].createElement(_zoom.Zoom, {
          key: "zoom",
          current: value,
          set: function set(v) {
            return _set(value * v);
          },
          reset: function reset() {
            return _set(1);
          }
        });
      }), _ref7);
    }
  }]);
  var extraTools = getElementList(getElements, _addons.types.TOOLEXTRA, [{
    match: function match(p) {
      return p.viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(DesktopOnly, null, _react["default"].createElement(_components.IconButton, {
        key: "full",
        onClick: api.toggleFullscreen,
        title: options.isFullscreen ? 'Exit full screen' : 'Go full screen'
      }, _react["default"].createElement(_components.Icons, {
        icon: options.isFullscreen ? 'close' : 'expand'
      })));
    }
  }, {
    match: function match(p) {
      return p.viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(_components.IconButton, {
        key: "opener",
        onClick: function onClick() {
          return _global["default"].open("".concat(baseUrl, "?id=").concat(storyId).concat(stringifyQueryParams(queryParams)));
        },
        title: "Open canvas in new tab"
      }, _ref8);
    }
  }, {
    match: function match(p) {
      return p.viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(_components.IconButton, {
        key: "copy",
        onClick: function onClick() {
          return (0, _copyToClipboard["default"])("".concat(_global["default"].location.origin).concat(_global["default"].location.pathname).concat(baseUrl, "?id=").concat(storyId).concat(stringifyQueryParams(queryParams)));
        },
        title: "Copy canvas link"
      }, _ref9);
    }
  }]);

  var filter = function filter(item) {
    return item && (!item.match || item.match({
      storyId: storyId,
      viewMode: viewMode,
      location: location,
      path: path
    }));
  };

  var displayItems = function displayItems(list) {
    return list.reduce(function (acc, item, index) {
      return item ? _react["default"].createElement(_react.Fragment, {
        key: item.id || item.key || "f-".concat(index)
      }, acc, item.render() || item) : acc;
    }, null);
  };

  var left = displayItems(tools.filter(filter));
  var right = displayItems(extraTools.filter(filter));
  return {
    left: left,
    right: right
  };
});

var Preview =
/*#__PURE__*/
function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, _getPrototypeOf(Preview).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref10) {
      var storyId = _ref10.storyId,
          viewMode = _ref10.viewMode,
          options = _ref10.options,
          queryParams = _ref10.queryParams;
      var props = this.props;
      return options.isFullscreen !== props.options.isFullscreen || options.isToolshown !== props.options.isToolshown || viewMode !== props.viewMode || storyId !== props.storyId || queryParams !== props.queryParams;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          api = _this$props.api,
          storyId = _this$props.storyId,
          viewMode = _this$props.viewMode;
      var prevStoryId = prevProps.storyId,
          prevViewMode = prevProps.viewMode;

      if (storyId && storyId !== prevStoryId || viewMode && viewMode !== prevViewMode) {
        api.emit(_coreEvents.SET_CURRENT_STORY, {
          storyId: storyId,
          viewMode: viewMode
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          path = _this$props2.path,
          location = _this$props2.location,
          viewMode = _this$props2.viewMode,
          storyId = _this$props2.storyId,
          queryParams = _this$props2.queryParams,
          getElements = _this$props2.getElements,
          api = _this$props2.api,
          customCanvas = _this$props2.customCanvas,
          options = _this$props2.options,
          description = _this$props2.description,
          baseUrl = _this$props2.baseUrl;
      var toolbarHeight = options.isToolshown ? 40 : 0;
      var wrappers = getElementList(getElements, _addons.types.PREVIEW, defaultWrappers);
      var panels = getElementList(getElements, _addons.types.TAB, [{
        route: function route(p) {
          return "/story/".concat(p.storyId);
        },
        match: function match(p) {
          return p.viewMode && p.viewMode.match(/^(story|docs)$/);
        },
        render: function render(p) {
          return _react["default"].createElement(_zoom.ZoomConsumer, null, function (_ref11) {
            var value = _ref11.value;
            var props = {
              viewMode: viewMode,
              active: p.active,
              wrappers: wrappers,
              id: id,
              storyId: storyId,
              baseUrl: baseUrl,
              queryParams: queryParams,
              scale: value,
              customCanvas: customCanvas
            };
            return _react["default"].createElement(ActualPreview, props);
          });
        },
        title: 'Canvas',
        id: 'canvas'
      }]);

      var _getTools = getTools(getElements, queryParams, panels, api, options, storyId, viewMode, location, path, baseUrl),
          left = _getTools.left,
          right = _getTools.right;

      return _react["default"].createElement(_zoom.ZoomProvider, null, _react["default"].createElement(_react.Fragment, null, id === 'main' && _react["default"].createElement(_reactHelmetAsync.Helmet, {
        key: "description"
      }, _react["default"].createElement("title", null, description ? "".concat(description, " \u22C5 ") : '', "Storybook")), _react["default"].createElement(_toolbar.Toolbar, {
        key: "toolbar",
        shown: options.isToolshown,
        border: true
      }, _react["default"].createElement(_react.Fragment, {
        key: "left"
      }, left), _react["default"].createElement(_react.Fragment, {
        key: "right"
      }, right)), _react["default"].createElement(S.FrameWrap, {
        key: "frame",
        offset: toolbarHeight
      }, panels.map(function (p) {
        return _react["default"].createElement(_react.Fragment, {
          key: p.id || p.key
        }, p.render({
          active: p.match({
            storyId: storyId,
            viewMode: viewMode,
            location: location,
            path: path
          })
        }));
      }))));
    }
  }]);

  return Preview;
}(_react.Component);

exports.Preview = Preview;
Preview.displayName = "Preview";
Preview.propTypes = {
  id: _propTypes["default"].string.isRequired,
  description: _propTypes["default"].string,
  customCanvas: _propTypes["default"].func,
  api: _propTypes["default"].shape({
    on: _propTypes["default"].func,
    off: _propTypes["default"].func,
    emit: _propTypes["default"].func,
    toggleFullscreen: _propTypes["default"].func
  }).isRequired,
  storyId: _propTypes["default"].string,
  path: _propTypes["default"].string,
  viewMode: _propTypes["default"].oneOf(['story', 'info', 'docs', 'settings']),
  location: _propTypes["default"].shape({}).isRequired,
  getElements: _propTypes["default"].func.isRequired,
  queryParams: _propTypes["default"].shape({}).isRequired,
  options: _propTypes["default"].shape({
    isFullscreen: _propTypes["default"].bool,
    isToolshown: _propTypes["default"].bool
  }).isRequired,
  baseUrl: _propTypes["default"].string
};
Preview.defaultProps = {
  viewMode: undefined,
  storyId: undefined,
  path: undefined,
  description: undefined,
  baseUrl: 'iframe.html',
  customCanvas: undefined
};