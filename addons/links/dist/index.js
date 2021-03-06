"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkTo = LinkTo;
Object.defineProperty(exports, "linkTo", {
  enumerable: true,
  get: function get() {
    return _preview.linkTo;
  }
});
Object.defineProperty(exports, "hrefTo", {
  enumerable: true,
  get: function get() {
    return _preview.hrefTo;
  }
});
Object.defineProperty(exports, "withLinks", {
  enumerable: true,
  get: function get() {
    return _preview.withLinks;
  }
});

var _commonTags = require("common-tags");

var _preview = require("./preview");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      LinkTo has moved to addon-links/react:\n      import LinkTo from '@storybook/addon-links/react';\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var hasWarned = false;

function LinkTo() {
  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.error((0, _commonTags.stripIndents)(_templateObject()));
    hasWarned = true;
  }

  return null;
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}