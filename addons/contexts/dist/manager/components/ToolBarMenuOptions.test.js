"use strict";

require("core-js/modules/es.array.find");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ToolBarMenuOptions = require("./ToolBarMenuOptions");

var _constants = require("../../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tests on addon-contexts component: ToolBarMenuOptions', function () {
  it('should glue TooltipLinkList and set the active item correspondingly', function () {
    // given
    var list = [_constants.OPT_OUT, 'A', 'B'];
    var activeName = 'B'; // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarMenuOptions.ToolBarMenuOptions, {
      activeName: activeName,
      list: list,
      onSelectOption: jest.fn
    })); // then

    expect(result.props().links.length).toBe(list.length);
    expect(result.props().links.find(function (link) {
      return link.title === activeName;
    }).active).toBe(true);
    expect(result).toMatchInlineSnapshot("\n      <TooltipLinkList\n        LinkWrapper={null}\n        links={\n          Array [\n            Object {\n              \"active\": false,\n              \"id\": \"__OPT_OUT__\",\n              \"key\": \"__OPT_OUT__\",\n              \"onClick\": [MockFunction],\n              \"title\": \"Off\",\n            },\n            Object {\n              \"active\": false,\n              \"id\": \"A\",\n              \"key\": \"A\",\n              \"onClick\": [MockFunction],\n              \"title\": \"A\",\n            },\n            Object {\n              \"active\": true,\n              \"id\": \"B\",\n              \"key\": \"B\",\n              \"onClick\": [MockFunction],\n              \"title\": \"B\",\n            },\n          ]\n        }\n      />\n    ");
  });
});