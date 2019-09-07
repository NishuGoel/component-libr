"use strict";

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reIndentQuery = exports.getDefaultFetcher = void 0;

var _global = require("global");

var FETCH_OPTIONS = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  }
};

var getDefaultFetcher = function getDefaultFetcher(url) {
  return function (params) {
    var body = JSON.stringify(params);
    var options = Object.assign({
      body: body
    }, FETCH_OPTIONS);
    return (0, _global.fetch)(url, options).then(function (res) {
      return res.json();
    });
  };
};

exports.getDefaultFetcher = getDefaultFetcher;

var reIndentQuery = function reIndentQuery(query) {
  var lines = query.trim().split('\n');
  var spaces = lines[lines.length - 1].length - 1;
  return lines.map(function (l, i) {
    return i === 0 ? l : l.slice(spaces);
  }).join('\n');
};

exports.reIndentQuery = reIndentQuery;