"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ToolBar = require("./ToolBar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tests on addon-contexts component: ToolBar', function () {
  it('should render nothing if receive an empty contextNodes', function () {
    // when
    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBar.ToolBar, {
      nodes: [],
      state: {},
      setSelected: jest.fn
    })); // then

    expect(result).toMatchInlineSnapshot("\"\"");
  });
  it('should spawn ToolBarControl based on the given contextNodes', function () {
    // given
    var someContextNodes = [{
      components: ['span'],
      icon: 'box',
      nodeId: 'Some Context A',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: '',
        props: {}
      }],
      title: 'Some Context A'
    }, {
      components: ['div'],
      icon: 'box',
      nodeId: 'Some Context B',
      options: {
        cancelable: true,
        deep: false,
        disable: false
      },
      params: [{
        name: 'Some Param X',
        props: {}
      }, {
        name: 'Some Param Y',
        props: {}
      }],
      title: 'Some Context B'
    }];
    var someSelectionState = {
      'Some Context B': 'Some Param Y'
    }; // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBar.ToolBar, {
      nodes: someContextNodes,
      state: someSelectionState,
      setSelected: jest.fn
    })); // then

    expect(result).toMatchInlineSnapshot("\n      <Fragment>\n        <Separator />\n        <ToolBarControl\n          icon=\"box\"\n          key=\"Some Context A\"\n          nodeId=\"Some Context A\"\n          options={\n            Object {\n              \"cancelable\": false,\n              \"deep\": false,\n              \"disable\": false,\n            }\n          }\n          params={\n            Array [\n              Object {\n                \"name\": \"\",\n                \"props\": Object {},\n              },\n            ]\n          }\n          selected=\"\"\n          setSelected={[Function]}\n          title=\"Some Context A\"\n        />\n        <ToolBarControl\n          icon=\"box\"\n          key=\"Some Context B\"\n          nodeId=\"Some Context B\"\n          options={\n            Object {\n              \"cancelable\": true,\n              \"deep\": false,\n              \"disable\": false,\n            }\n          }\n          params={\n            Array [\n              Object {\n                \"name\": \"Some Param X\",\n                \"props\": Object {},\n              },\n              Object {\n                \"name\": \"Some Param Y\",\n                \"props\": Object {},\n              },\n            ]\n          }\n          selected=\"Some Param Y\"\n          setSelected={[Function]}\n          title=\"Some Context B\"\n        />\n      </Fragment>\n    ");
  });
});