"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructUrl = void 0;

var _utils = require("@storybook/router/utils");

var _url = require("url");

const constructUrl = (storybookUrl, kind, story) => {
  const id = (0, _utils.toId)(kind, story);
  const storyUrl = `/iframe.html?id=${id}`;
  const {
    protocol,
    host,
    pathname,
    search
  } = new _url.URL(storybookUrl);
  const pname = pathname.replace(/\/$/, ''); // removes trailing /

  const query = search.replace('?', '&'); // convert leading ? to &

  return `${protocol}//${host}${pname}${storyUrl}${query}`;
};

exports.constructUrl = constructUrl;