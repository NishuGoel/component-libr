"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ToolBarControl = require("./ToolBarControl");

var _constants = require("../../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

describe('Tests on addon-contexts component: ToolBarControl', function () {
  // given
  var someBasicProps = {
    icon: 'box',
    nodeId: 'Some Context',
    options: {
      cancelable: true,
      deep: false,
      disable: false
    },
    params: [{
      name: 'A',
      props: {}
    }, {
      name: 'B',
      props: {}
    }],
    title: 'Some Context',
    selected: '',
    setSelected: jest.fn
  };
  it('should control menu: set as inactive if being out-out (if cancelable)', function () {
    // when
    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, someBasicProps, {
      selected: _constants.OPT_OUT
    }))); // then

    expect(result.props().active).toBe(false);
  });
  it('should control menu: valid "selected" to give "activeName"', function () {
    // given
    var selected = 'C';
    var anotherSelected = 'B'; // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, someBasicProps, {
      selected: selected
    })));
    var anotherResult = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, someBasicProps, {
      selected: anotherSelected
    }))); // then

    expect(result.props().optionsProps.activeName).not.toBe(selected);
    expect(anotherResult.props().optionsProps.activeName).toBe(anotherSelected);
  });
  it('should control menu: fallback "activeName" to the default param', function () {
    // given
    var name = 'C';
    var params = [].concat(_toConsumableArray(someBasicProps.params), [{
      name: name,
      props: {},
      "default": true
    }]); // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, someBasicProps, {
      params: params
    }))); // then

    expect(result.props().optionsProps.activeName).toBe(name);
  });
  it('should control menu: fallback "activeName" to the first (if default not found)', function () {
    // when
    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, someBasicProps)); // then

    expect(result.props().optionsProps.activeName).toBe(someBasicProps.params[0].name);
  });
  it('should render nothing if being disabled', function () {
    // given
    var options = Object.assign({}, someBasicProps.options, {
      disable: true
    }); // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, _extends({}, someBasicProps, {
      options: options
    }))); // then

    expect(result).toMatchInlineSnapshot("\"\"");
  });
  it('should document the shallowly rendered result', function () {
    // when
    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarControl.ToolBarControl, someBasicProps)); // then

    expect(result).toMatchInlineSnapshot("\n      <ToolBarMenu\n        active={true}\n        expanded={false}\n        icon=\"box\"\n        optionsProps={\n          Object {\n            \"activeName\": \"A\",\n            \"list\": Array [\n              \"__OPT_OUT__\",\n              \"A\",\n              \"B\",\n            ],\n            \"onSelectOption\": [Function],\n          }\n        }\n        setExpanded={[Function]}\n        title=\"Some Context\"\n      />\n    ");
  });
});