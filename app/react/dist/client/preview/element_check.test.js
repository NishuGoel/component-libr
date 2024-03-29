"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _react = _interopRequireDefault(require("react"));

var _element_check = _interopRequireWildcard(require("./element_check"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('element_check.utils.isValidFiberElement', function () {
  it('should accept to render a string', function () {
    var string = 'react is awesome';
    expect((0, _element_check.isValidFiberElement)(string)).toBe(true);
  });
  it('should accept to render a number', function () {
    var number = 42;
    expect((0, _element_check.isValidFiberElement)(number)).toBe(true);
  });
  it('should accept to render a valid React element', function () {
    var element = _react["default"].createElement("button", {
      type: "button"
    }, "Click me");

    expect((0, _element_check.isValidFiberElement)(element)).toBe(true);
  });
  it("shouldn't accept to render an arbitrary object", function () {
    var object = {
      key: 'bee bop'
    };
    expect((0, _element_check.isValidFiberElement)(object)).toBe(false);
  });
  it("shouldn't accept to render a function", function () {
    var noop = function noop() {};

    expect((0, _element_check.isValidFiberElement)(noop)).toBe(false);
  });
  it("shouldn't accept to render undefined", function () {
    expect((0, _element_check.isValidFiberElement)(undefined)).toBe(false);
  });
});
describe('element_check.utils.isPriorToFiber', function () {
  it('should return true if React version is prior to Fiber (< 16)', function () {
    var oldVersion = '0.14.5';
    var version = '15.5.4';
    expect((0, _element_check.isPriorToFiber)(oldVersion)).toBe(true);
    expect((0, _element_check.isPriorToFiber)(version)).toBe(true);
  });
  it('should return false if React version is using Fiber features (>= 16)', function () {
    var alphaVersion = '16.0.0-alpha.13';
    var version = '18.3.1';
    expect((0, _element_check.isPriorToFiber)(alphaVersion)).toBe(false);
    expect((0, _element_check.isPriorToFiber)(version)).toBe(false);
  });
});
describe('element_check.isReactRenderable', function () {
  var string = 'yo';
  var number = 1337;

  var element = _react["default"].createElement("span", null, "what's up");

  var array = [string, number, element];
  var object = {
    key: null
  };
  it('allows rendering React elements only prior to React Fiber', function () {
    // mutate version for the purpose of the test
    // @ts-ignore
    _react["default"].version = '15.5.4';
    expect((0, _element_check["default"])(string)).toBe(false);
    expect((0, _element_check["default"])(number)).toBe(false);
    expect((0, _element_check["default"])(element)).toBe(true);
    expect((0, _element_check["default"])(array)).toBe(false);
    expect((0, _element_check["default"])(object)).toBe(false);
  });
  it('allows rendering string, numbers, arrays and React elements with React Fiber', function () {
    // mutate version for the purpose of the test
    // @ts-ignore
    _react["default"].version = '16.0.0-alpha.13';
    expect((0, _element_check["default"])(string)).toBe(true);
    expect((0, _element_check["default"])(number)).toBe(true);
    expect((0, _element_check["default"])(element)).toBe(true);
    expect((0, _element_check["default"])(array)).toBe(true);
    expect((0, _element_check["default"])(object)).toBe(false);
  });
});