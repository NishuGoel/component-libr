"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "storiesOf", {
  enumerable: true,
  get: function get() {
    return _preview.storiesOf;
  }
});
Object.defineProperty(exports, "setAddon", {
  enumerable: true,
  get: function get() {
    return _preview.setAddon;
  }
});
Object.defineProperty(exports, "addDecorator", {
  enumerable: true,
  get: function get() {
    return _preview.addDecorator;
  }
});
Object.defineProperty(exports, "addParameters", {
  enumerable: true,
  get: function get() {
    return _preview.addParameters;
  }
});
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function get() {
    return _preview.configure;
  }
});
Object.defineProperty(exports, "getStorybook", {
  enumerable: true,
  get: function get() {
    return _preview.getStorybook;
  }
});
Object.defineProperty(exports, "forceReRender", {
  enumerable: true,
  get: function get() {
    return _preview.forceReRender;
  }
});
Object.defineProperty(exports, "raw", {
  enumerable: true,
  get: function get() {
    return _preview.raw;
  }
});
Object.defineProperty(exports, "load", {
  enumerable: true,
  get: function get() {
    return _preview.load;
  }
});

var _preview = require("./preview");

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}