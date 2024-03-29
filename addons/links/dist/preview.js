"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLinks = exports.hrefTo = exports.linkTo = exports.navigate = void 0;

var _global = require("global");

var _qs = _interopRequireDefault(require("qs"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _utils = require("@storybook/router/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var navigate = function navigate(params) {
  return _addons["default"].getChannel().emit(_coreEvents.SELECT_STORY, params);
};

exports.navigate = navigate;

var generateUrl = function generateUrl(id) {
  var location = _global.document.location;

  var query = _qs["default"].parse(location.search, {
    ignoreQueryPrefix: true
  });

  return "".concat(location.origin + location.pathname, "?").concat(_qs["default"].stringify(Object.assign({}, query, {
    id: id
  }), {
    encode: false
  }));
};

var valueOrCall = function valueOrCall(args) {
  return function (value) {
    return typeof value === 'function' ? value.apply(void 0, _toConsumableArray(args)) : value;
  };
};

var linkTo = function linkTo(kind, story) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var resolver = valueOrCall(args);
    navigate({
      kind: resolver(kind),
      story: resolver(story)
    });
  };
};

exports.linkTo = linkTo;

var hrefTo = function hrefTo(kind, name) {
  return new Promise(function (resolve) {
    resolve(generateUrl((0, _utils.toId)(kind, name)));
  });
};

exports.hrefTo = hrefTo;

var linksListener = function linksListener(e) {
  var target = e.target;

  if (!(target instanceof _global.HTMLElement)) {
    return;
  }

  var element = target;
  var _element$dataset = element.dataset,
      kind = _element$dataset.sbKind,
      story = _element$dataset.sbStory;

  if (kind || story) {
    e.preventDefault();
    navigate({
      kind: kind,
      story: story
    });
  }
};

var hasListener = false;

var on = function on() {
  if (!hasListener) {
    hasListener = true;

    _global.document.addEventListener('click', linksListener);
  }
};

var off = function off() {
  if (hasListener) {
    hasListener = false;

    _global.document.removeEventListener('click', linksListener);
  }
};

var withLinks = function withLinks(storyFn) {
  on();

  _addons["default"].getChannel().once(_coreEvents.STORY_CHANGED, off);

  return storyFn();
};

exports.withLinks = withLinks;