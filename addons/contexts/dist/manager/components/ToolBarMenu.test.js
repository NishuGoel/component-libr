"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ToolBarMenu = require("./ToolBarMenu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tests on addon-contexts component: ToolBarMenu', function () {
  it('should glue `@storybook/ui` components to produce a context menu', function () {
    // given
    var someProps = {
      icon: 'globe',
      title: 'Some Context',
      active: true,
      expanded: false,
      setExpanded: jest.fn,
      optionsProps: {
        activeName: 'A',
        list: ['A', 'B'],
        onSelectOption: jest.fn
      }
    }; // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarMenu.ToolBarMenu, someProps)); // then

    expect(result).toMatchInlineSnapshot("\n      <WithTooltipPure\n        closeOnClick={true}\n        hasChrome={true}\n        modifiers={Object {}}\n        onVisibilityChange={[Function]}\n        placement=\"top\"\n        svg={false}\n        tooltip={\n          <ToolBarMenuOptions\n            activeName=\"A\"\n            list={\n              Array [\n                \"A\",\n                \"B\",\n              ]\n            }\n            onSelectOption={[Function]}\n          />\n        }\n        tooltipShown={false}\n        trigger=\"click\"\n      >\n        <IconButton\n          active={true}\n          title=\"Some Context\"\n        >\n          <Icons\n            icon=\"globe\"\n          />\n        </IconButton>\n      </WithTooltipPure>\n    ");
  });
  it('should render TabButton with title if the icon is given', function () {
    // given
    var someProps = {
      title: 'Some Context',
      active: true,
      expanded: false,
      setExpanded: jest.fn,
      optionsProps: {
        activeName: 'A',
        list: ['A', 'B'],
        onSelectOption: jest.fn
      }
    }; // when

    var result = (0, _enzyme.shallow)(_react["default"].createElement(_ToolBarMenu.ToolBarMenu, someProps)); // then

    expect(result).toMatchInlineSnapshot("\n      <WithTooltipPure\n        closeOnClick={true}\n        hasChrome={true}\n        modifiers={Object {}}\n        onVisibilityChange={[Function]}\n        placement=\"top\"\n        svg={false}\n        tooltip={\n          <ToolBarMenuOptions\n            activeName=\"A\"\n            list={\n              Array [\n                \"A\",\n                \"B\",\n              ]\n            }\n            onSelectOption={[Function]}\n          />\n        }\n        tooltipShown={false}\n        trigger=\"click\"\n      >\n        <TabButton\n          active={true}\n        >\n          Some Context\n        </TabButton>\n      </WithTooltipPure>\n    ");
  });
});