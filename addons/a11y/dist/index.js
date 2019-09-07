"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureA11y = exports.checkA11y = exports.withA11Y = exports.withA11y = void 0;

var _global = require("global");

var _axeCore = _interopRequireDefault(require("axe-core"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _commonTags = require("common-tags");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    configureA11y is deprecated, please configure addon-a11y using the addParameter api:\n    \n    addParameters({\n      a11y: {\n        // ... axe options\n        element: '#root', // optional selector which element to inspect\n      },\n    });\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var progress = Promise.resolve();
var setup = {
  element: null,
  config: {},
  options: {}
};

var getElement = function getElement() {
  var storyRoot = _global.document.getElementById('story-root');

  if (storyRoot) {
    return storyRoot.children;
  }

  return _global.document.getElementById('root');
};

var report = function report(input) {
  return _addons["default"].getChannel().emit(_constants.EVENTS.RESULT, input);
};

var run = function run(element, config, options) {
  progress = progress.then(function () {
    _axeCore["default"].reset();

    if (config) {
      _axeCore["default"].configure(config);
    }

    return _axeCore["default"].run(element || getElement(), options || {
      restoreScroll: true
    } // cast to RunOptions is necessary because axe types are not up to date
    ).then(report);
  });
};

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

var withA11y = (0, _addons.makeDecorator)({
  name: 'withA11Y',
  parameterName: _constants.PARAM_KEY,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;

    if (parameters) {
      setup = parameters;
    }

    _addons["default"].getChannel().on(_constants.EVENTS.REQUEST, function () {
      return run(setup.element, setup.config, setup.options);
    });

    return getStory(context);
  }
}); // TODO: REMOVE at v6.0.0

exports.withA11y = withA11y;
var withA11Y = (0, _utilDeprecate["default"])( // @ts-ignore
function () {
  return withA11y.apply(void 0, arguments);
}, 'withA11Y has been renamed withA11y'); // TODO: REMOVE at v6.0.0

exports.withA11Y = withA11Y;
var checkA11y = (0, _utilDeprecate["default"])( // @ts-ignore
function () {
  return withA11y.apply(void 0, arguments);
}, 'checkA11y has been renamed withA11y'); // TODO: REMOVE at v6.0.0

exports.checkA11y = checkA11y;
var configureA11y = (0, _utilDeprecate["default"])(function (config) {
  setup = config;
}, (0, _commonTags.stripIndents)(_templateObject()));
exports.configureA11y = configureA11y;