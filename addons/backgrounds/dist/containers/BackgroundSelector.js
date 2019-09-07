"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _constants = require("../constants");

var _ColorIcon = require("../components/ColorIcon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var iframeId = 'storybook-preview-iframe';
var createBackgroundSelectorItem = (0, _memoizerific["default"])(1000)(function (id, name, value, hasSwatch, change) {
  return {
    id: id || name,
    title: name,
    onClick: function onClick() {
      change({
        selected: value,
        name: name
      });
    },
    value: value,
    right: hasSwatch ? _react["default"].createElement(_ColorIcon.ColorIcon, {
      background: value
    }) : undefined
  };
});

var getSelectedBackgroundColor = function getSelectedBackgroundColor(list, currentSelectedValue) {
  if (!list.length) {
    return 'transparent';
  }

  if (currentSelectedValue === 'transparent') {
    return currentSelectedValue;
  }

  if (list.find(function (i) {
    return i.value === currentSelectedValue;
  })) {
    return currentSelectedValue;
  }

  if (list.find(function (i) {
    return i["default"];
  })) {
    return list.find(function (i) {
      return i["default"];
    }).value;
  }

  return 'transparent';
};

var mapper = function mapper(_ref) {
  var api = _ref.api,
      state = _ref.state;
  var story = state.storiesHash[state.storyId];
  var list = story ? api.getParameters(story.id, _constants.PARAM_KEY) : [];
  var selected = state.addons[_constants.PARAM_KEY] || null;
  return {
    items: list || [],
    selected: selected
  };
};

var getDisplayedItems = (0, _memoizerific["default"])(10)(function (list, selected, change) {
  var availableBackgroundSelectorItems = [];

  if (selected !== 'transparent') {
    availableBackgroundSelectorItems.push(createBackgroundSelectorItem('reset', 'Clear background', 'transparent', null, change));
  }

  if (list.length) {
    availableBackgroundSelectorItems = [].concat(_toConsumableArray(availableBackgroundSelectorItems), _toConsumableArray(list.map(function (_ref2) {
      var name = _ref2.name,
          value = _ref2.value;
      return createBackgroundSelectorItem(null, name, value, true, change);
    })));
  }

  return availableBackgroundSelectorItems;
});

var BackgroundSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(BackgroundSelector, _Component);

  function BackgroundSelector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BackgroundSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BackgroundSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.change = function (_ref3) {
      var selected = _ref3.selected,
          name = _ref3.name;
      var api = _this.props.api;

      if (typeof selected === 'string') {
        api.setAddonState(_constants.PARAM_KEY, selected);
      }

      api.emit(_constants.EVENTS.UPDATE, {
        selected: selected,
        name: name
      });
    };

    return _this;
  }

  _createClass(BackgroundSelector, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_api.Consumer, {
        filter: mapper
      }, function (_ref4) {
        var items = _ref4.items,
            selected = _ref4.selected;
        var selectedBackgroundColor = getSelectedBackgroundColor(items, selected);
        return items.length ? _react["default"].createElement(_react.Fragment, null, selectedBackgroundColor ? _react["default"].createElement(_theming.Global, {
          styles: function styles(theme) {
            return _defineProperty({}, "#".concat(iframeId), {
              background: selectedBackgroundColor === 'transparent' ? theme.background.content : selectedBackgroundColor
            });
          }
        }) : null, _react["default"].createElement(_components.WithTooltip, {
          placement: "top",
          trigger: "click",
          tooltip: function tooltip(_ref6) {
            var onHide = _ref6.onHide;
            return _react["default"].createElement(_components.TooltipLinkList, {
              links: getDisplayedItems(items, selectedBackgroundColor, function (i) {
                _this2.change(i);

                onHide();
              })
            });
          },
          closeOnClick: true
        }, _react["default"].createElement(_components.IconButton, {
          key: "background",
          active: selectedBackgroundColor !== 'transparent',
          title: "Change the background of the preview"
        }, _react["default"].createElement(_components.Icons, {
          icon: "photo"
        })))) : null;
      });
    }
  }]);

  return BackgroundSelector;
}(_react.Component);

exports.BackgroundSelector = BackgroundSelector;