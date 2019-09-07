"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = require(".");

var _README = _interopRequireDefault(require("../README.md"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */
var TestComponent = function TestComponent(_ref) {
  var func = _ref.func,
      obj = _ref.obj,
      array = _ref.array,
      number = _ref.number,
      string = _ref.string,
      bool = _ref.bool,
      empty = _ref.empty;
  return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, String(func)), _react["default"].createElement("h2", null, String(obj)), _react["default"].createElement("h3", null, String(array)), _react["default"].createElement("h4", null, String(number)), _react["default"].createElement("h5", null, String(string)), _react["default"].createElement("h6", null, String(bool)), _react["default"].createElement("p", null, String(empty)), _react["default"].createElement("a", {
    href: "#"
  }, "test"), _react["default"].createElement("code", null, "storiesOf"), _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "1"), _react["default"].createElement("li", null, "2")));
};
/* eslint-enable */


var reactClassPath = 'some/path/TestComponent.jsx';
var storybookReactClassMock = {
  name: 'TestComponent',
  path: reactClassPath,
  docgenInfo: {
    description: "\n# Awesome test component description\n## with markdown support\n**bold** *cursive*\n```js\na;\n```",
    name: 'TestComponent'
  }
};
var testOptions = {
  propTables: false
};
var testMarkdown = "# Test story\n## with markdown info\ncontaining **bold**, *cursive* text, `code` and [a link](https://github.com)";
describe('addon Info', function () {
  // eslint-disable-next-line react/prop-types
  var createStoryFn = function createStoryFn(Component) {
    return function (_ref2) {
      var name = _ref2.name;
      return _react["default"].createElement("div", null, "It's a ", name, " story:", _react["default"].createElement(Component, {
        func: function func(x) {
          return x + 1;
        },
        obj: {
          a: 'a',
          b: 'b'
        },
        array: [1, 2, 3],
        number: 7,
        string: "seven",
        bool: true
      }));
    };
  };

  var storyFn = createStoryFn(TestComponent);
  it('should render <Info /> and markdown', function () {
    var Info = (0, _.withInfo)(testMarkdown)(storyFn);
    expect((0, _enzyme.mount)(_react["default"].createElement(Info, null))).toMatchSnapshot();
  });
  it('should render <Info /> and external markdown', function () {
    var Info = (0, _.withInfo)(_README["default"])(storyFn);
    expect((0, _enzyme.mount)(_react["default"].createElement(Info, null))).toMatchSnapshot();
  });
  it('should render with text options', function () {
    var Info = (0, _.withInfo)({
      text: 'some text here'
    })(storyFn);
    (0, _enzyme.mount)(_react["default"].createElement(Info, null));
  });
  it('should render with missed info', function () {
    (0, _.setDefaults)(testOptions);
    var Info = (0, _.withInfo)()(storyFn);
    (0, _enzyme.mount)(_react["default"].createElement(Info, null));
  });
  it('should render <Info /> for memoized component', function () {
    var MemoizedTestComponent = _react["default"].memo(TestComponent);

    var Info = (0, _.withInfo)()(createStoryFn(MemoizedTestComponent));
    expect((0, _enzyme.mount)(_react["default"].createElement(Info, null))).toMatchSnapshot();
  });
  it('should render component description if story kind matches component', function () {
    var previousReactClassesValue = global.STORYBOOK_REACT_CLASSES[reactClassPath];
    Object.assign(global.STORYBOOK_REACT_CLASSES, _defineProperty({}, reactClassPath, storybookReactClassMock));

    var Info = function Info() {
      return (0, _.withInfo)({
        inline: true,
        propTables: false
      })(storyFn, {
        kind: 'TestComponent',
        name: 'Basic test'
      });
    };

    expect((0, _enzyme.mount)(_react["default"].createElement(Info, null))).toMatchSnapshot();
    Object.assign(global.STORYBOOK_REACT_CLASSES, _defineProperty({}, reactClassPath, previousReactClassesValue));
  });
  it('should render component description if story name matches component', function () {
    var previousReactClassesValue = global.STORYBOOK_REACT_CLASSES[reactClassPath];
    Object.assign(global.STORYBOOK_REACT_CLASSES, _defineProperty({}, reactClassPath, storybookReactClassMock));

    var Info = function Info() {
      return (0, _.withInfo)({
        inline: true,
        propTables: false
      })(storyFn, {
        kind: 'Test Components',
        name: 'TestComponent'
      });
    };

    expect((0, _enzyme.mount)(_react["default"].createElement(Info, null))).toMatchSnapshot();
    Object.assign(global.STORYBOOK_REACT_CLASSES, _defineProperty({}, reactClassPath, previousReactClassesValue));
  });
});