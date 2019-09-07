"use strict";

var _configureActions = require("../configureActions");

var _ = require("../..");

describe('Configure Actions', function () {
  it('can configure actions', function () {
    var depth = 100;
    var clearOnStoryChange = false;
    var limit = 20;
    (0, _.configureActions)({
      depth: depth,
      clearOnStoryChange: clearOnStoryChange,
      limit: limit
    });
    expect(_configureActions.config).toEqual({
      depth: depth,
      clearOnStoryChange: clearOnStoryChange,
      limit: limit
    });
  });
});