"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FailedResult = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _Message = _interopRequireDefault(require("./Message"));

var _Indicator = _interopRequireDefault(require("./Indicator"));

var _colors = _interopRequireDefault(require("../colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FlexContainer = _theming.styled.div({
  display: 'flex',
  alignItems: 'center'
});

var Head = _theming.styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
});

var Title = _theming.styled.h3({
  padding: '10px 10px 0 10px',
  margin: 0
});

var FailedResult = (0, _theming.styled)(function (_ref) {
  var fullName = _ref.fullName,
      title = _ref.title,
      status = _ref.status,
      failureMessages = _ref.failureMessages,
      className = _ref.className;
  return _react["default"].createElement("div", {
    className: className
  }, _react["default"].createElement(Head, null, _react["default"].createElement(FlexContainer, null, _react["default"].createElement(_Indicator["default"], {
    color: _colors["default"].error,
    size: 10,
    overrides: {
      borderRadius: '5px 0',
      position: 'absolute',
      top: -1,
      left: -1
    }
  }), _react["default"].createElement(Title, null, fullName || title)), _react["default"].createElement(_Indicator["default"], {
    color: _colors["default"].error,
    size: 16,
    overrides: {
      borderRadius: '0 5px',
      position: 'absolute',
      top: -1,
      right: -1
    }
  }, status)), failureMessages.map(function (msg, i) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_Message["default"], {
        msg: msg,
        key: i
      })
    );
  }));
})({
  display: 'block',
  borderRadius: 5,
  margin: 0,
  padding: 0,
  position: 'relative',
  border: '1px solid silver',
  boxSizing: 'border-box'
});
exports.FailedResult = FailedResult;

var Result = function Result(_ref2) {
  var fullName = _ref2.fullName,
      title = _ref2.title,
      status = _ref2.status;
  return _react["default"].createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, _react["default"].createElement(FlexContainer, null, _react["default"].createElement(_Indicator["default"], {
    color: _colors["default"].success,
    size: 10,
    overrides: {
      marginRight: 10
    }
  }), _react["default"].createElement("div", null, fullName || title)), _react["default"].createElement(FlexContainer, null, _react["default"].createElement(_Indicator["default"], {
    color: _colors["default"].success,
    size: 14,
    right: true
  }, status)));
};

Result.defaultProps = {
  fullName: '',
  title: ''
};
var _default = Result;
exports["default"] = _default;