"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _colors = _interopRequireDefault(require("../colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable react/no-array-index-key */

/* eslint-disable no-param-reassign */

/* eslint-disable no-control-regex */

/* tslint:disable:object-literal-sort-keys */
var patterns = [/^\x08+/, /^\x1b\[[012]?K/, /^\x1b\[?[\d;]{0,3}/];

var Pre = _theming.styled.pre({
  margin: 0
});

var Positive = _theming.styled.strong({
  color: _colors["default"].success,
  fontWeight: 500
});

var Negative = _theming.styled.strong({
  color: _colors["default"].error,
  fontWeight: 500
});

var StackTrace = (0, _theming.styled)(function (_ref) {
  var trace = _ref.trace,
      className = _ref.className;
  return _react["default"].createElement("details", {
    className: className
  }, _react["default"].createElement("summary", null, "Callstack"), trace.join('').trim().split(/\n/).map(function (traceLine, traceLineIndex) {
    return _react["default"].createElement("div", {
      key: traceLineIndex
    }, traceLine.trim());
  }));
})({
  background: '#e2e2e2',
  padding: 10,
  overflow: 'auto'
});
var Main = (0, _theming.styled)(function (_ref2) {
  var msg = _ref2.msg,
      className = _ref2.className;
  return _react["default"].createElement("section", {
    className: className
  }, msg);
})({
  padding: 10,
  borderBottom: '1px solid #e2e2e2'
});
var Sub = (0, _theming.styled)(function (_ref3) {
  var msg = _ref3.msg,
      className = _ref3.className;
  return _react["default"].createElement("section", {
    className: className
  }, msg.filter(function (item) {
    return typeof item !== 'string' || item.trim() !== '';
  }).map(function (item, index, list) {
    if (typeof item === 'string') {
      if (index === 0 && index === list.length - 1) {
        return item.trim();
      }

      if (index === 0) {
        return item.replace(/^[\s\n]*/, '');
      }

      if (index === list.length - 1) {
        return item.replace(/[\s\n]*$/, '');
      }
    }

    return item;
  }));
})({
  padding: 10
});

var createSubgroup = function createSubgroup(_ref4) {
  var startTrigger = _ref4.startTrigger,
      endTrigger = _ref4.endTrigger,
      grouper = _ref4.grouper,
      _ref4$accList = _ref4.accList,
      accList = _ref4$accList === void 0 ? [] : _ref4$accList,
      _ref4$grouped = _ref4.grouped,
      grouped = _ref4$grouped === void 0 ? [] : _ref4$grouped,
      _ref4$grouperIndex = _ref4.grouperIndex,
      grouperIndex = _ref4$grouperIndex === void 0 ? 0 : _ref4$grouperIndex,
      mode = _ref4.mode,
      injectionPoint = _ref4.injectionPoint;
  return function (acc, item, i, list) {
    grouperIndex += 1; // start or stop extraction

    if (startTrigger(item)) {
      mode = 'inject';
      injectionPoint = i;
    }

    if (endTrigger(item)) {
      mode = 'stop';
    } // push item in correct aggregator


    if (mode === 'inject') {
      grouped.push(item);
    } else {
      accList.push(item);
    } // on last iteration inject at detected injection point, and group


    if (i === list.length - 1) {
      // Provide a "safety net" when Jest returns a partially recognized "group"
      // (recognized by acc.startTrigger but acc.endTrigger was never found) and
      // it's the only group in output for a test result. In that case, accList
      // will be empty, so return whatever was found, even if it will be unstyled
      // and prevent next createSubgroup calls from throwing due to empty lists.
      accList.push(null);
      return accList.reduce(function (eacc, el, ei) {
        if (injectionPoint === 0 && ei === 0) {
          // at index 0, inject before
          return eacc.concat(grouper(grouped, grouperIndex)).concat(el);
        }

        if (injectionPoint > 0 && injectionPoint === ei + 1) {
          // at index > 0, and next index WOULD BE injectionPoint, inject after
          return eacc.concat(el).concat(grouper(grouped, grouperIndex));
        } // do not inject


        return eacc.concat(el);
      }, []);
    }

    return acc;
  };
};

var Message = function Message(_ref5) {
  var msg = _ref5.msg;
  var data = patterns.reduce(function (acc, regex) {
    return acc.replace(regex, '');
  }, msg).split(/\[2m/).join('').split(/\[22m/).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).map(function (item, li) {
    return item.split(/\[32m(.*?)\[39m/).map(function (i, index) {
      return index % 2 ? _react["default"].createElement(Positive, {
        key: "p_".concat(li, "_").concat(i)
      }, i) : i;
    });
  }).reduce(function (acc, item) {
    return acc.concat(item);
  }).map(function (item, li) {
    return typeof item === 'string' ? item.split(/\[31m(.*?)\[39m/).map(function (i, index) {
      return index % 2 ? _react["default"].createElement(Negative, {
        key: "n_".concat(li, "_").concat(i)
      }, i) : i;
    }) : item;
  }).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).reduce(createSubgroup({
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && e.indexOf('Error: ') === 0;
    },
    endTrigger: function endTrigger(e) {
      return typeof e === 'string' && Boolean(e.match('Expected '));
    },
    grouper: function grouper(list, key) {
      return _react["default"].createElement(Main, {
        key: key,
        msg: list
      });
    }
  }), []).reduce(function (acc, it) {
    return typeof it === 'string' ? acc.concat(it.split(/(at(.|\n)+\d+:\d+\))/)) : acc.concat(it);
  }, []).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).reduce(createSubgroup({
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && e.indexOf('Expected ') !== -1;
    },
    endTrigger: function endTrigger(e) {
      return typeof e === 'string' && Boolean(e.match(/^at/));
    },
    grouper: function grouper(list, key) {
      return _react["default"].createElement(Sub, {
        key: key,
        msg: list
      });
    }
  }), []).reduce(createSubgroup({
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && Boolean(e.match(/at(.|\n)+\d+:\d+\)/));
    },
    endTrigger: function endTrigger() {
      return false;
    },
    grouper: function grouper(list, key) {
      return _react["default"].createElement(StackTrace, {
        key: key,
        trace: list
      });
    }
  }), []);
  return _react["default"].createElement(Pre, null, data);
};

var _default = Message;
exports["default"] = _default;