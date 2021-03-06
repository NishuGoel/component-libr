"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.Panel = exports.Preview = exports.Main = exports.Nav = exports.Root = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var persistance = _interopRequireWildcard(require("./persist"));

var _draggers = require("./draggers");

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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Root = _theming.styled.div({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden'
});

exports.Root = Root;

var Pane = _theming.styled.div({
  position: 'absolute',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, function (_ref) {
  var hidden = _ref.hidden;
  return hidden ? {
    opacity: 0
  } : {
    opacity: 1
  };
}, function (_ref2) {
  var top = _ref2.top;
  return top ? {
    zIndex: 9
  } : {};
}, function (_ref3) {
  var border = _ref3.border,
      theme = _ref3.theme;

  switch (border) {
    case 'left':
      {
        return {
          borderLeft: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'right':
      {
        return {
          borderRight: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'top':
      {
        return {
          borderTop: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'bottom':
      {
        return {
          borderBottom: "1px solid ".concat(theme.appBorderColor)
        };
      }

    default:
      {
        return {};
      }
  }
}, function (_ref4) {
  var animate = _ref4.animate;
  return animate ? {
    transition: ['width', 'height', 'top', 'left', 'background', 'opacity', 'transform'].map(function (p) {
      return "".concat(p, " 0.1s ease-out");
    }).join(',')
  } : {};
});

var Paper = _theming.styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, function (_ref5) {
  var isFullscreen = _ref5.isFullscreen,
      theme = _ref5.theme;
  return isFullscreen ? {
    boxShadow: 'none',
    borderRadius: '0'
  } : {
    background: theme.background.content,
    borderRadius: theme.appBorderRadius,
    overflow: 'hidden',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)'
  };
});

var Nav = function Nav(_ref6) {
  var hidden = _ref6.hidden,
      children = _ref6.children,
      position = _ref6.position,
      props = _objectWithoutProperties(_ref6, ["hidden", "children", "position"]);

  return hidden ? null : _react["default"].createElement(Pane, _extends({
    style: position
  }, props), children);
};

exports.Nav = Nav;
Nav.propTypes = {
  hidden: _propTypes["default"].bool,
  children: _propTypes["default"].node.isRequired,
  position: _propTypes["default"].shape({})
};
Nav.defaultProps = {
  hidden: false,
  position: undefined
};

var Main = function Main(_ref7) {
  var isFullscreen = _ref7.isFullscreen,
      children = _ref7.children,
      position = _ref7.position,
      props = _objectWithoutProperties(_ref7, ["isFullscreen", "children", "position"]);

  return _react["default"].createElement(Pane, _extends({
    style: position,
    top: true
  }, props), _react["default"].createElement(Paper, {
    isFullscreen: isFullscreen
  }, children));
};

exports.Main = Main;
Main.displayName = "Main";
Main.propTypes = {
  isFullscreen: _propTypes["default"].bool,
  children: _propTypes["default"].node.isRequired,
  position: _propTypes["default"].shape({})
};
Main.defaultProps = {
  isFullscreen: false,
  position: undefined
};

var Preview = function Preview(_ref8) {
  var hidden = _ref8.hidden,
      children = _ref8.children,
      position = _ref8.position,
      props = _objectWithoutProperties(_ref8, ["hidden", "children", "position"]);

  return _react["default"].createElement(Pane, _extends({
    style: position,
    top: true,
    hidden: hidden
  }, props), children);
};

exports.Preview = Preview;
Preview.displayName = "Preview";
Preview.propTypes = {
  hidden: _propTypes["default"].bool,
  children: _propTypes["default"].node.isRequired,
  position: _propTypes["default"].shape({})
};
Preview.defaultProps = {
  hidden: false,
  position: undefined
};

var Panel = function Panel(_ref9) {
  var hidden = _ref9.hidden,
      children = _ref9.children,
      position = _ref9.position,
      align = _ref9.align,
      props = _objectWithoutProperties(_ref9, ["hidden", "children", "position", "align"]);

  return _react["default"].createElement(Pane, _extends({
    style: position,
    hidden: hidden
  }, props, {
    border: align === 'bottom' ? 'top' : 'left'
  }), children);
};

exports.Panel = Panel;
Panel.displayName = "Panel";
Panel.propTypes = {
  hidden: _propTypes["default"].bool,
  children: _propTypes["default"].node.isRequired,
  position: _propTypes["default"].shape({}),
  align: _propTypes["default"].oneOf(['bottom', 'right'])
};
Panel.defaultProps = {
  hidden: false,
  position: undefined,
  align: 'right'
};

var HoverBlocker = _theming.styled.div({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 15,
  height: '100vh',
  width: '100vw'
});

var getPreviewPosition = function getPreviewPosition(_ref10) {
  var panelPosition = _ref10.panelPosition,
      isPanelHidden = _ref10.isPanelHidden,
      isNavHidden = _ref10.isNavHidden,
      isFullscreen = _ref10.isFullscreen,
      bounds = _ref10.bounds,
      resizerPanel = _ref10.resizerPanel,
      resizerNav = _ref10.resizerNav,
      margin = _ref10.margin;

  if (isFullscreen || isPanelHidden) {
    return {};
  }

  var navX = isNavHidden ? 0 : resizerNav.x;
  var panelX = isPanelHidden ? 0 : resizerPanel.x;
  var panelY = isPanelHidden ? 0 : resizerPanel.y;
  return panelPosition === 'bottom' ? {
    height: panelY - margin,
    left: 0,
    top: 0,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: 0,
    top: 0,
    width: panelX - navX - margin
  };
};

var getMainPosition = function getMainPosition(_ref11) {
  var bounds = _ref11.bounds,
      resizerNav = _ref11.resizerNav,
      isNavHidden = _ref11.isNavHidden,
      isFullscreen = _ref11.isFullscreen,
      margin = _ref11.margin;

  if (isFullscreen) {
    return {};
  }

  var navX = isNavHidden ? 0 : resizerNav.x;
  return {
    height: bounds.height - margin * 2,
    left: navX + margin,
    top: margin,
    width: bounds.width - navX - margin * 2
  };
};

var getPanelPosition = function getPanelPosition(_ref12) {
  var isPanelBottom = _ref12.isPanelBottom,
      isPanelHidden = _ref12.isPanelHidden,
      isNavHidden = _ref12.isNavHidden,
      bounds = _ref12.bounds,
      resizerPanel = _ref12.resizerPanel,
      resizerNav = _ref12.resizerNav,
      margin = _ref12.margin;
  var navX = isNavHidden ? 0 : resizerNav.x;
  var panelX = resizerPanel.x;
  var panelY = resizerPanel.y;

  if (isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - panelY - margin,
      left: 0,
      top: panelY - margin,
      width: bounds.width - navX - 2 * margin
    };
  }

  if (!isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - 2 * margin,
      left: panelX - navX - margin,
      top: 0,
      width: bounds.width - panelX - margin
    };
  }

  return isPanelBottom ? {
    height: bounds.height - panelY - margin,
    left: 0,
    top: panelY - margin,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: panelX - navX - margin,
    top: 0,
    width: bounds.width - panelX - margin
  };
};

var _ref13 =
/*#__PURE__*/
_react["default"].createElement(HoverBlocker, null);

var Layout =
/*#__PURE__*/
function (_Component) {
  _inherits(Layout, _Component);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this, props));

    _this.resizeNav = function (e, data) {
      if (data.deltaX) {
        _this.setState({
          resizerNav: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    _this.resizePanel = function (e, data) {
      var options = _this.props.options;

      if (data.deltaY && options.panelPosition === 'bottom' || data.deltaX && options.panelPosition === 'right') {
        _this.setState({
          resizerPanel: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    _this.setDragNav = function () {
      _this.setState({
        isDragging: 'nav'
      });
    };

    _this.setDragPanel = function () {
      _this.setState({
        isDragging: 'panel'
      });
    };

    _this.unsetDrag = function () {
      _this.setState({
        isDragging: false
      });
    };

    var bounds = props.bounds,
        _options = props.options;

    var _persistance$get = persistance.get(),
        resizerNav = _persistance$get.resizerNav,
        resizerPanel = _persistance$get.resizerPanel;

    _this.state = {
      isDragging: false,
      resizerNav: resizerNav || {
        x: 200,
        y: 0
      },
      resizerPanel: resizerPanel || (_options.panelPosition === 'bottom' ? {
        x: 0,
        y: Math.round(bounds.height * 0.6)
      } : {
        x: bounds.width - 400,
        y: 0
      })
    };
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
          resizerPanel = _this$state.resizerPanel,
          resizerNav = _this$state.resizerNav;
      persistance.set({
        resizerPanel: resizerPanel,
        resizerNav: resizerNav
      });
      var _prevProps$bounds = prevProps.bounds,
          prevWidth = _prevProps$bounds.width,
          prevHeight = _prevProps$bounds.height;
      var _this$props = this.props,
          bounds = _this$props.bounds,
          options = _this$props.options;
      var width = bounds.width,
          height = bounds.height;

      if (width !== prevWidth || height !== prevHeight) {
        var panelPosition = options.panelPosition;
        var isPanelBottom = panelPosition === 'bottom';

        if (isPanelBottom) {
          this.setState({
            resizerPanel: {
              x: prevState.resizerPanel.x,
              y: prevState.resizerPanel.y - (prevHeight - height)
            }
          });
        } else {
          this.setState({
            resizerPanel: {
              x: prevState.resizerPanel.x - (prevWidth - width),
              y: prevState.resizerPanel.y
            }
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          bounds = _this$props2.bounds,
          options = _this$props2.options,
          theme = _this$props2.theme,
          viewMode = _this$props2.viewMode,
          panelCount = _this$props2.panelCount;
      var _this$state2 = this.state,
          isDragging = _this$state2.isDragging,
          resizerNav = _this$state2.resizerNav,
          resizerPanel = _this$state2.resizerPanel;
      var margin = theme.layoutMargin;
      var isNavHidden = options.isFullscreen || !options.showNav;
      var isPanelHidden = options.isFullscreen || !options.showPanel || viewMode !== 'story' || panelCount === 0;
      var isFullscreen = options.isFullscreen || isNavHidden && isPanelHidden;
      var isToolshown = options.isToolshown;
      var panelPosition = options.panelPosition;
      var isPanelBottom = panelPosition === 'bottom';
      var isPanelRight = panelPosition === 'right';
      var panelX = resizerPanel.x;
      var navX = resizerNav.x;
      return bounds ? _react["default"].createElement(_react.Fragment, null, isNavHidden ? null : _react["default"].createElement(_draggers.Draggable, {
        axis: "x",
        position: resizerNav,
        bounds: {
          left: 200,
          top: 0,
          right: isPanelRight && !isPanelHidden ? panelX - 200 : bounds.width - 200,
          bottom: 0
        },
        onStart: this.setDragNav,
        onDrag: this.resizeNav,
        onStop: this.unsetDrag
      }, _react["default"].createElement(_draggers.Handle, {
        shadow: "left",
        axis: "x",
        isDragging: isDragging === 'nav'
      })), isPanelHidden ? null : _react["default"].createElement(_draggers.Draggable, {
        axis: isPanelBottom ? 'y' : 'x',
        position: resizerPanel,
        bounds: isPanelBottom ? {
          left: 0,
          top: 200,
          right: 0,
          bottom: bounds.height - 200
        } : {
          left: isNavHidden ? 200 : navX + 200,
          top: 0,
          right: bounds.width - 200,
          bottom: 0
        },
        onStart: this.setDragPanel,
        onDrag: this.resizePanel,
        onStop: this.unsetDrag
      }, _react["default"].createElement(_draggers.Handle, {
        isDragging: isDragging === 'panel',
        shadow: isPanelBottom ? 'top' : 'left',
        style: isPanelBottom ? {
          left: navX + margin,
          width: bounds.width - navX - 2 * margin,
          marginTop: -margin
        } : {
          marginLeft: -margin
        },
        axis: isPanelBottom ? 'y' : 'x'
      })), isDragging ? _ref13 : null, children({
        mainProps: {
          viewMode: viewMode,
          animate: !isDragging,
          isFullscreen: isFullscreen,
          position: getMainPosition({
            bounds: bounds,
            resizerNav: resizerNav,
            isNavHidden: isNavHidden,
            isFullscreen: isFullscreen,
            margin: margin
          })
        },
        previewProps: {
          viewMode: viewMode,
          animate: !isDragging,
          isFullscreen: isFullscreen,
          isToolshown: isToolshown,
          position: getPreviewPosition({
            isFullscreen: isFullscreen,
            isNavHidden: isNavHidden,
            isPanelHidden: isPanelHidden,
            resizerNav: resizerNav,
            resizerPanel: resizerPanel,
            bounds: bounds,
            panelPosition: panelPosition,
            margin: margin
          })
        },
        navProps: {
          viewMode: viewMode,
          animate: !isDragging,
          hidden: isNavHidden,
          position: {
            height: bounds.height,
            left: 0,
            top: 0,
            width: navX + margin
          }
        },
        panelProps: {
          viewMode: viewMode,
          animate: !isDragging,
          align: options.panelPosition,
          hidden: isPanelHidden,
          position: getPanelPosition({
            isPanelBottom: isPanelBottom,
            isPanelHidden: isPanelHidden,
            isNavHidden: isNavHidden,
            bounds: bounds,
            resizerPanel: resizerPanel,
            resizerNav: resizerNav,
            margin: margin
          })
        }
      })) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var bounds = props.bounds,
          options = props.options;
      var resizerPanel = state.resizerPanel,
          resizerNav = state.resizerNav;
      var isNavHidden = options.isFullscreen || !options.showNav;
      var isPanelHidden = options.isFullscreen || !options.showPanel;
      var panelPosition = options.panelPosition;
      var isPanelRight = panelPosition === 'right';
      var isPanelBottom = panelPosition === 'bottom';
      var navX = resizerNav.x;
      var panelX = resizerPanel.x;
      var panelY = resizerPanel.y;
      var minimalMainWidth = !isPanelHidden && isPanelRight ? 400 : 200;
      var mutation = {};

      if (!isNavHidden) {
        if (bounds.width - minimalMainWidth < navX) {
          mutation.resizerNav = {
            x: bounds.width - minimalMainWidth,
            y: 0
          };
        } else if (bounds.width - minimalMainWidth < 200 || navX < 200) {
          mutation.resizerNav = {
            x: 200,
            y: 0
          };
        }
      }

      if (isPanelRight && !isPanelHidden) {
        if (bounds.width - 200 < panelX || panelX === 0) {
          mutation.resizerPanel = {
            x: bounds.width - 200,
            y: 0
          };
        } else if (navX + 200 > panelX) {
          mutation.resizerPanel = {
            x: navX + 200,
            y: 0
          };
        }
      }

      if (isPanelBottom && !isPanelHidden) {
        if (bounds.height - 200 < panelY || panelY === 0) {
          mutation.resizerPanel = {
            x: 0,
            y: bounds.height - 200
          };
        }
      }

      return mutation.resizerPanel || mutation.resizerNav ? Object.assign({}, state, {}, mutation) : state;
    }
  }]);

  return Layout;
}(_react.Component);

Layout.displayName = "Layout";
Layout.propTypes = {
  children: _propTypes["default"].func.isRequired,
  panelCount: _propTypes["default"].number.isRequired,
  bounds: _propTypes["default"].shape({
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  options: _propTypes["default"].shape({
    isFullscreen: _propTypes["default"].bool.isRequired,
    showNav: _propTypes["default"].bool.isRequired,
    showPanel: _propTypes["default"].bool.isRequired,
    panelPosition: _propTypes["default"].string.isRequired,
    isToolshown: _propTypes["default"].bool.isRequired
  }).isRequired,
  viewMode: _propTypes["default"].oneOf(['story', 'info', 'docs', 'settings']),
  theme: _propTypes["default"].shape({
    layoutMargin: _propTypes["default"].number
  }).isRequired
};
Layout.defaultProps = {
  viewMode: undefined
};
var ThemedLayout = (0, _theming.withTheme)(Layout);
exports.Layout = ThemedLayout;