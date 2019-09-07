"use strict";

var _global = require("global");

/* eslint-disable no-underscore-dangle */
if (_global.window.parent !== _global.window) {
  try {
    _global.window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = _global.window.parent.__VUE_DEVTOOLS_GLOBAL_HOOK__;
    _global.window.parent.__VUE_DEVTOOLS_CONTEXT__ = _global.window.document;
  } catch (error) {// The above lines can throw if we do not have access to the parent frame -- i.e. cross origin
  }
}

_global.window.STORYBOOK_REACT_CLASSES = {};
_global.window.STORYBOOK_ENV = 'vue';