"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

var _global = require("global");

var _addons = require("@storybook/addons");

var _coreEvents = require("@storybook/core-events");

var _reactGa = _interopRequireDefault(require("react-ga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons.addons.register('storybook/google-analytics', function (api) {
  _reactGa["default"].initialize(_global.window.STORYBOOK_GA_ID);

  api.on(_coreEvents.STORY_CHANGED, function () {
    var _api$getUrlState = api.getUrlState(),
        url = _api$getUrlState.url;

    _reactGa["default"].pageview(url);
  });
  api.on(_coreEvents.STORY_ERRORED, function (_ref) {
    var description = _ref.description;

    _reactGa["default"].exception({
      description: description,
      fatal: true
    });
  });
  api.on(_coreEvents.STORY_MISSING, function (id) {
    _reactGa["default"].exception({
      description: "attempted to render ".concat(id, ", but it is missing"),
      fatal: false
    });
  });
});