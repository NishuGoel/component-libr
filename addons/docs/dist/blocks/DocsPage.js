"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _DocsContainer = require("./DocsContainer");

var _Description = require("./Description");

var _Story = require("./Story");

var _Preview = require("./Preview");

var _Props = require("./Props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DocsStoriesType;

(function (DocsStoriesType) {
  DocsStoriesType["ALL"] = "all";
  DocsStoriesType["PRIMARY"] = "primary";
  DocsStoriesType["REST"] = "rest";
})(DocsStoriesType || (DocsStoriesType = {}));

var getDocsStories = function getDocsStories(type, componentStories) {
  var stories = componentStories;

  if (type !== DocsStoriesType.ALL) {
    var _stories = stories,
        _stories2 = _toArray(_stories),
        first = _stories2[0],
        rest = _stories2.slice(1);

    stories = type === DocsStoriesType.PRIMARY ? [first] : rest;
  }

  return stories.map(function (_ref) {
    var id = _ref.id,
        name = _ref.name,
        _ref$parameters = _ref.parameters,
        notes = _ref$parameters.notes,
        info = _ref$parameters.info;
    return {
      id: id,
      name: name,
      description: notes || info || null
    };
  });
};

var StoriesHeading = _theming.styled.h2();

var StoryHeading = _theming.styled.h3();

var DocsStory = function DocsStory(_ref2) {
  var id = _ref2.id,
      name = _ref2.name,
      description = _ref2.description,
      _ref2$expanded = _ref2.expanded,
      expanded = _ref2$expanded === void 0 ? true : _ref2$expanded;
  return _react["default"].createElement(_react["default"].Fragment, null, expanded && _react["default"].createElement(StoryHeading, null, name), expanded && description && _react["default"].createElement(_Description.Description, {
    markdown: description
  }), _react["default"].createElement(_Preview.Preview, null, _react["default"].createElement(_Story.Story, {
    id: id
  })));
};

var DocsStories = function DocsStories(_ref3) {
  var _ref3$type = _ref3.type,
      type = _ref3$type === void 0 ? DocsStoriesType.ALL : _ref3$type;
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (_ref4) {
    var selectedKind = _ref4.selectedKind,
        storyStore = _ref4.storyStore;
    var componentStories = storyStore.raw().filter(function (s) {
      return s.kind === selectedKind;
    });
    var stories = getDocsStories(type, componentStories);

    if (stories.length === 0) {
      return null;
    }

    var expanded = type !== DocsStoriesType.PRIMARY;
    return _react["default"].createElement(_react["default"].Fragment, null, expanded && _react["default"].createElement(StoriesHeading, null, "Stories"), stories.map(function (s) {
      return _react["default"].createElement(DocsStory, _extends({
        key: s.id,
        expanded: expanded
      }, s));
    }));
  });
};

var getDocsPageProps = function getDocsPageProps(context) {
  var selectedKind = context.selectedKind,
      selectedStory = context.selectedStory,
      parameters = context.parameters;

  var _ref5 = parameters && parameters.options || {
    hierarchyRootSeparator: '|',
    hierarchySeparator: /\/|\./
  },
      rootSeparator = _ref5.hierarchyRootSeparator,
      groupSeparator = _ref5.hierarchySeparator;

  var _parseKind = (0, _router.parseKind)(selectedKind, {
    rootSeparator: rootSeparator,
    groupSeparator: groupSeparator
  }),
      groups = _parseKind.groups;

  var title = groups && groups[groups.length - 1] || selectedKind;
  return {
    title: title,
    subtitle: parameters && parameters.componentDescription
  };
};

var DocsPage = function DocsPage() {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var docsPageProps = getDocsPageProps(context);
    return _react["default"].createElement(_components.DocsPage, docsPageProps, _react["default"].createElement(_Description.Description, {
      of: "."
    }), _react["default"].createElement(DocsStories, {
      type: DocsStoriesType.PRIMARY
    }), _react["default"].createElement(_Props.Props, {
      of: "."
    }), _react["default"].createElement(DocsStories, {
      type: DocsStoriesType.REST
    }));
  });
};

var DocsPageWrapper = function DocsPageWrapper(_ref6) {
  var context = _ref6.context;
  return (
    /* eslint-disable react/destructuring-assignment */
    _react["default"].createElement(_DocsContainer.DocsContainer, {
      context: Object.assign({}, context, {
        mdxKind: context.selectedKind
      }),
      content: DocsPage
    })
  );
};

exports.DocsPage = DocsPageWrapper;