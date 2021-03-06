"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _router = require("@storybook/router");

var _utils = require("@storybook/router/dist/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Initialize the state based on the URL.
// NOTE:
//   Although we don't change the URL when you change the state, we do support setting inital state
//   via the following URL parameters:
//     - full: 0/1 -- show fullscreen
//     - panel: bottom/right/0 -- set addons panel position (or hide)
//     - nav: 0/1 -- show or hide the story list
//
//   We also support legacy URLs from storybook <5
var initialUrlSupport = function initialUrlSupport(_ref) {
  var navigate = _ref.navigate,
      _ref$state = _ref.state,
      location = _ref$state.location,
      path = _ref$state.path,
      viewMode = _ref$state.viewMode,
      storyId = _ref$state.storyId;
  var addition = {};
  var query = (0, _router.queryFromLocation)(location);
  var selectedPanel;

  var full = query.full,
      panel = query.panel,
      nav = query.nav,
      addons = query.addons,
      panelRight = query.panelRight,
      stories = query.stories,
      addonPanel = query.addonPanel,
      selectedKind = query.selectedKind,
      selectedStory = query.selectedStory,
      queryPath = query.path,
      customQueryParams = _objectWithoutProperties(query, ["full", "panel", "nav", "addons", "panelRight", "stories", "addonPanel", "selectedKind", "selectedStory", "path"]);

  if (full === '1') {
    addition.isFullscreen = true;
  }

  if (panel) {
    if (['right', 'bottom'].includes(panel)) {
      addition.panelPosition = panel;
    } else if (panel === '0') {
      addition.showPanel = false;
    }
  }

  if (nav === '0') {
    addition.showNav = false;
  } // Legacy URLs


  if (addons === '0') {
    addition.showPanel = false;
  }

  if (panelRight === '1') {
    addition.panelPosition = 'right';
  }

  if (stories === '0') {
    addition.showNav = false;
  }

  if (addonPanel) {
    selectedPanel = addonPanel;
  }

  if (selectedKind && selectedStory) {
    var id = (0, _utils.toId)(selectedKind, selectedStory);
    setTimeout(function () {
      return navigate("/".concat(viewMode, "/").concat(id), {
        replace: true
      });
    }, 1);
  } else if (selectedKind) {
    // Create a "storyId" of the form `kind-sanitized--*`
    var standInId = (0, _utils.toId)(selectedKind, 'star').replace(/star$/, '*');
    setTimeout(function () {
      return navigate("/".concat(viewMode, "/").concat(standInId), {
        replace: true
      });
    }, 1);
  } else if (!queryPath || queryPath === '/') {
    setTimeout(function () {
      return navigate("/".concat(viewMode, "/*"), {
        replace: true
      });
    }, 1);
  } else if (Object.keys(query).length > 1) {
    // remove other queries
    setTimeout(function () {
      return navigate("".concat(queryPath), {
        replace: true
      });
    }, 1);
  }

  return {
    viewMode: viewMode,
    layout: addition,
    selectedPanel: selectedPanel,
    location: location,
    path: path,
    customQueryParams: customQueryParams,
    storyId: storyId
  };
};

function _default(_ref2) {
  var store = _ref2.store,
      navigate = _ref2.navigate,
      state = _ref2.state,
      provider = _ref2.provider,
      rest = _objectWithoutProperties(_ref2, ["store", "navigate", "state", "provider"]);

  var api = {
    getQueryParam: function getQueryParam(key) {
      var _store$getState = store.getState(),
          customQueryParams = _store$getState.customQueryParams;

      if (customQueryParams) {
        return customQueryParams[key];
      }

      return undefined;
    },
    getUrlState: function getUrlState() {
      var _store$getState2 = store.getState(),
          path = _store$getState2.path,
          viewMode = _store$getState2.viewMode,
          storyId = _store$getState2.storyId,
          url = _store$getState2.url,
          customQueryParams = _store$getState2.customQueryParams;

      var queryParams = customQueryParams;
      return {
        queryParams: queryParams,
        path: path,
        viewMode: viewMode,
        storyId: storyId,
        url: url
      };
    },
    setQueryParams: function setQueryParams(input) {
      var _store$getState3 = store.getState(),
          customQueryParams = _store$getState3.customQueryParams;

      var queryParams = {};
      store.setState({
        customQueryParams: Object.assign({}, customQueryParams, {}, Object.entries(input).reduce(function (acc, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (value !== null) {
            acc[key] = value;
          }

          return acc;
        }, queryParams))
      });
    }
  };
  return {
    api: api,
    state: initialUrlSupport(Object.assign({
      store: store,
      navigate: navigate,
      state: state,
      provider: provider
    }, rest))
  };
}