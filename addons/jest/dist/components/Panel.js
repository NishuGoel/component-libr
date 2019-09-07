"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _Indicator = _interopRequireDefault(require("./Indicator"));

var _Result = _interopRequireWildcard(require("./Result"));

var _provideJestResult = _interopRequireDefault(require("../hoc/provideJestResult"));

var _colors = _interopRequireDefault(require("../colors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var List = _theming.styled.ul({
  listStyle: 'none',
  fontSize: 14,
  padding: 0,
  margin: '10px 0'
});

var Item = _theming.styled.li({
  display: 'block',
  margin: '10px 0',
  padding: 0
});

var NoTests = _theming.styled.div({
  padding: '10px 20px',
  flex: 1
});

var FileTitle = _theming.styled.h2({
  marginRight: '6px',
  marginBottom: '3px',
  fontWeight: 500,
  fontSize: 18
});

var SuiteHead = _theming.styled.div({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  position: 'relative',
  paddingTop: 10
});

var SuiteTotals = (0, _theming.styled)(function (_ref) {
  var successNumber = _ref.successNumber,
      failedNumber = _ref.failedNumber,
      result = _ref.result,
      className = _ref.className;
  return _react["default"].createElement("div", {
    className: className
  }, successNumber > 0 && _react["default"].createElement("div", {
    style: {
      color: _colors["default"].success
    }
  }, successNumber, " passed"), failedNumber > 0 && _react["default"].createElement("div", {
    style: {
      color: _colors["default"].error
    }
  }, failedNumber, " failed"), _react["default"].createElement("div", null, result.assertionResults.length, " total"), _react["default"].createElement("div", null, _react["default"].createElement("strong", null, result.endTime - result.startTime, "ms")));
})({
  display: 'flex',
  alignItems: 'center',
  color: _colors["default"].grey,
  fontSize: '10px',
  '& > *': {
    marginLeft: 10
  }
});
var SuiteProgress = (0, _theming.styled)(function (_ref2) {
  var successNumber = _ref2.successNumber,
      result = _ref2.result,
      className = _ref2.className;
  return _react["default"].createElement("div", {
    className: className,
    role: "progressbar"
  }, _react["default"].createElement("span", {
    style: {
      width: "".concat(successNumber / result.assertionResults.length * 100, "%")
    }
  }));
})(function () {
  return {
    width: '100%',
    backgroundColor: _colors["default"].error,
    height: 4,
    top: 0,
    position: 'absolute',
    left: 0,
    borderRadius: 3,
    overflow: 'hidden',
    appearance: 'none',
    '& > span': {
      backgroundColor: _colors["default"].success,
      bottom: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      boxShadow: '4px 0 0 white'
    }
  };
});

var SuiteTitle = _theming.styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '3px'
});

var PassingRate = _theming.styled.div({
  fontWeight: 500,
  fontSize: '10px'
});

var Content = (0, _theming.styled)(function (_ref3) {
  var tests = _ref3.tests,
      className = _ref3.className;
  return _react["default"].createElement("div", {
    className: className
  }, tests.map(function (_ref4) {
    var name = _ref4.name,
        result = _ref4.result;
    var title = name || 'Result status';

    if (!result) {
      return _react["default"].createElement(NoTests, {
        key: title
      }, "This story has tests configured, but no file was found");
    }

    var successNumber = result.assertionResults.filter(function (_ref5) {
      var status = _ref5.status;
      return status === 'passed';
    }).length;
    var failedNumber = result.assertionResults.length - successNumber;
    return _react["default"].createElement("section", {
      key: title
    }, _react["default"].createElement(SuiteTitle, null, _react["default"].createElement(FileTitle, null, "".concat(title, ":")), _react["default"].createElement(_Indicator["default"], {
      color: result.status === 'passed' ? _colors["default"].success : _colors["default"].error,
      size: 16,
      styles: {
        marginRight: 5
      }
    }, result.status)), _react["default"].createElement(SuiteHead, null, _react["default"].createElement(PassingRate, null, "Passing rate: ".concat((successNumber / result.assertionResults.length * 100).toFixed(2), "%")), _react["default"].createElement(SuiteProgress, {
      successNumber: successNumber,
      failedNumber: failedNumber,
      result: result
    }), _react["default"].createElement(SuiteTotals, {
      successNumber: successNumber,
      failedNumber: failedNumber,
      result: result
    })), _react["default"].createElement(List, null, result.assertionResults.map(function (res) {
      return _react["default"].createElement(Item, {
        key: res.fullName || res.title
      }, res.failureMessages && res.failureMessages.length ? _react["default"].createElement(_Result.FailedResult, res) : _react["default"].createElement(_Result["default"], res));
    })));
  }));
})({
  padding: '10px 20px',
  flex: '1 1 0%'
});

var Panel = function Panel(_ref6) {
  var tests = _ref6.tests;
  return _react["default"].createElement(_components.ScrollArea, {
    vertical: true
  }, tests ? _react["default"].createElement(Content, {
    tests: tests
  }) : _react["default"].createElement(NoTests, null, "This story has no tests configured"));
};

Panel.defaultProps = {
  tests: null
};

var _default = (0, _provideJestResult["default"])(Panel);

exports["default"] = _default;