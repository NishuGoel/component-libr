"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleton = exports.memorize = void 0;

/**
 * Memorize the calculated result of a function by an ES6 Map;
 * the default is to memorize its the first argument;
 * @return the memorized version of a function.
 */
var memorize = function memorize(fn, resolver) {
  var memo = new Map();
  return function () {
    var key = resolver ? resolver.apply(void 0, arguments) : arguments.length <= 0 ? undefined : arguments[0];
    return memo.get(key) || memo.set(key, fn.apply(void 0, arguments)).get(key);
  };
};
/**
 * Enforce a given function can only be executed once;
 * the returned value is cached for resolving the subsequent calls.
 * @return the singleton version of a function.
 */


exports.memorize = memorize;

var singleton = function singleton(fn) {
  return memorize(fn, function () {
    return 'singleton';
  });
};

exports.singleton = singleton;