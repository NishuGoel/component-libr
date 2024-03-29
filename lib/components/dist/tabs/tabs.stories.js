"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.pad-start");

require("core-js/modules/web.dom-collections.iterator");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _clientLogger = require("@storybook/client-logger");

var _tabs = require("./tabs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var colours = Array.from(new Array(15), function (val, index) {
  return index;
}).map(function (i) {
  return Math.floor(1 / 15 * i * 16777215).toString(16).padStart(6, '0');
});

function fibonacci(num, memo) {
  /* eslint-disable no-param-reassign */
  if (!memo) {
    memo = {};
  }

  if (memo[num]) {
    return memo[num];
  }

  if (num <= 1) {
    return 1;
  }

  memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
  return memo[num];
  /* eslint-enable no-param-reassign */
}

var _ref7 =
/*#__PURE__*/
_react["default"].createElement("div", null, "CONTENT 6");

var panels = {
  test1: {
    title: 'Tab title #1',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? _react["default"].createElement("div", {
        id: "test1",
        key: key
      }, "CONTENT 1") : null;
    }
  },
  test2: {
    title: 'Tab title #2',
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;
      return _react["default"].createElement("div", {
        key: key,
        id: "test2",
        style: {
          background: 'hotpink',
          minHeight: '100%',
          display: active ? 'block' : 'none'
        }
      }, "CONTENT 2");
    }
  },
  test3: {
    title: 'Tab with scroll!',
    render: function render(_ref3) {
      var active = _ref3.active,
          key = _ref3.key;
      return active ? _react["default"].createElement("div", {
        id: "test3",
        key: key
      }, colours.map(function (colour, i) {
        return _react["default"].createElement("div", {
          key: colour,
          style: {
            background: "#".concat(colour),
            height: 30 + fibonacci(i + 5) / 10
          }
        });
      })) : null;
    }
  },
  test4: {
    title: 'Tab title #4',
    render: function render(_ref4) {
      var active = _ref4.active,
          key = _ref4.key;
      return active ? _react["default"].createElement("div", {
        key: key,
        id: "test4"
      }, "CONTENT 4") : null;
    }
  },
  test5: {
    title: 'Tab title #5',
    render: function render(_ref5) {
      var active = _ref5.active,
          key = _ref5.key;
      return active ? _react["default"].createElement("div", {
        key: key,
        id: "test5"
      }, "CONTENT 5") : null;
    }
  },
  test6: {
    title: 'Tab title #6',
    render: function render(_ref6) {
      var active = _ref6.active,
          key = _ref6.key;
      return _react["default"].createElement(_tabs.TabWrapper, {
        key: key,
        active: active,
        render: function render() {
          return _ref7;
        }
      });
    }
  }
};
var onSelect = (0, _addonActions.action)('onSelect');
var content = Object.entries(panels).map(function (_ref8) {
  var _ref9 = _slicedToArray(_ref8, 2),
      k = _ref9[0],
      v = _ref9[1];

  return _react["default"].createElement("div", {
    key: k,
    id: k,
    title: v.title
  }, v.render);
});

var _ref11 =
/*#__PURE__*/
_react["default"].createElement("div", {
  id: "test2",
  title: "With markup"
}, _react["default"].createElement("div", null, "test2 is always active (but visually hidden)"));

var _ref14 =
/*#__PURE__*/
_react["default"].createElement(_tabs.TabsState, null, content);

(0, _react2.storiesOf)('Basics|Tabs', module).addDecorator(function (s) {
  return _react["default"].createElement("div", {
    style: {
      position: 'relative',
      height: 'calc(100vh - 20px)',
      width: 'calc(100vw - 20px)',
      margin: 10
    }
  }, s());
}).add('stateful - static', function () {
  return _react["default"].createElement(_tabs.TabsState, {
    initial: "test2"
  }, _react["default"].createElement("div", {
    id: "test1",
    title: "With a function"
  }, function (_ref10) {
    var active = _ref10.active,
        selected = _ref10.selected;
    return active ? _react["default"].createElement("div", null, selected, " is selected") : null;
  }), _ref11);
}).add('stateful - dynamic', function () {
  return _react["default"].createElement(_tabs.TabsState, {
    initial: "test3"
  }, Object.entries(panels).map(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        k = _ref13[0],
        v = _ref13[1];

    return _react["default"].createElement("div", {
      key: k,
      id: k,
      title: v.title
    }, v.render);
  }));
}).add('stateful - no initial', function () {
  return _ref14;
}).add('stateless - bordered', function () {
  return _react["default"].createElement(_tabs.Tabs, {
    bordered: true,
    absolute: false,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - with tools', function () {
  return _react["default"].createElement(_tabs.Tabs, {
    selected: "test3",
    actions: {
      onSelect: onSelect
    },
    tools: _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        return _clientLogger.logger.log('1');
      }
    }, "1"), _react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        return _clientLogger.logger.log('2');
      }
    }, "2"))
  }, content);
}).add('stateless - absolute', function () {
  return _react["default"].createElement(_tabs.Tabs, {
    bordered: true,
    absolute: true,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - empty', function () {
  return _react["default"].createElement(_tabs.Tabs, {
    actions: {
      onSelect: onSelect
    },
    bordered: true,
    absolute: true
  });
});