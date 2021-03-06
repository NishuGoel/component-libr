"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = keys;
exports["default"] = initShortcuts;
exports.defaultShortcuts = exports.controlOrMetaKey = exports.isMacLike = void 0;

require("regenerator-runtime/runtime");

var _global = require("global");

var _coreEvents = require("@storybook/core-events");

var _shortcut = require("../lib/shortcut");

var _layout = require("./layout");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isMacLike = function isMacLike() {
  return _global.navigator && _global.navigator.platform ? !!_global.navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) : false;
};

exports.isMacLike = isMacLike;

var controlOrMetaKey = function controlOrMetaKey() {
  return isMacLike() ? 'meta' : 'control';
};

exports.controlOrMetaKey = controlOrMetaKey;

function keys(o) {
  return Object.keys(o);
}

var defaultShortcuts = Object.freeze({
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: [controlOrMetaKey(), 'shift', ','],
  aboutPage: [','],
  escape: ['escape'] // This one is not customizable

});
exports.defaultShortcuts = defaultShortcuts;

function initShortcuts(_ref) {
  var store = _ref.store;
  var api = {
    // Getting and setting shortcuts
    getShortcutKeys: function getShortcutKeys() {
      return store.getState().shortcuts;
    },
    setShortcuts: function () {
      var _setShortcuts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(shortcuts) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return store.setState({
                  shortcuts: shortcuts
                }, {
                  persistence: 'permanent'
                });

              case 2:
                return _context.abrupt("return", shortcuts);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setShortcuts(_x) {
        return _setShortcuts.apply(this, arguments);
      }

      return setShortcuts;
    }(),
    restoreAllDefaultShortcuts: function () {
      var _restoreAllDefaultShortcuts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", api.setShortcuts(defaultShortcuts));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function restoreAllDefaultShortcuts() {
        return _restoreAllDefaultShortcuts.apply(this, arguments);
      }

      return restoreAllDefaultShortcuts;
    }(),
    setShortcut: function () {
      var _setShortcut = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(action, value) {
        var shortcuts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shortcuts = api.getShortcutKeys();
                _context3.next = 3;
                return api.setShortcuts(Object.assign({}, shortcuts, _defineProperty({}, action, value)));

              case 3:
                return _context3.abrupt("return", value);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setShortcut(_x2, _x3) {
        return _setShortcut.apply(this, arguments);
      }

      return setShortcut;
    }(),
    restoreDefaultShortcut: function () {
      var _restoreDefaultShortcut = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(action) {
        var defaultShortcut;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                defaultShortcut = defaultShortcuts[action];
                return _context4.abrupt("return", api.setShortcut(action, defaultShortcut));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function restoreDefaultShortcut(_x4) {
        return _restoreDefaultShortcut.apply(this, arguments);
      }

      return restoreDefaultShortcut;
    }(),
    // Listening to shortcut events
    handleKeydownEvent: function handleKeydownEvent(fullApi, event) {
      var shortcut = (0, _shortcut.eventToShortcut)(event);
      var shortcuts = api.getShortcutKeys();
      var actions = keys(shortcuts);
      var matchedFeature = actions.find(function (feature) {
        return (0, _shortcut.shortcutMatchesShortcut)(shortcut, shortcuts[feature]);
      });

      if (matchedFeature) {
        api.handleShortcutFeature(fullApi, matchedFeature);
      }
    },
    handleShortcutFeature: function handleShortcutFeature(fullApi, feature) {
      var _store$getState = store.getState(),
          _store$getState$layou = _store$getState.layout,
          isFullscreen = _store$getState$layou.isFullscreen,
          showNav = _store$getState$layou.showNav,
          showPanel = _store$getState$layou.showPanel;

      switch (feature) {
        case 'escape':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
            } else if (!showNav) {
              fullApi.toggleNav();
            }

            break;
          }

        case 'focusNav':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
            }

            if (!showNav) {
              fullApi.toggleNav();
            }

            fullApi.focusOnUIElement(_layout.focusableUIElements.storyListMenu);
            break;
          }

        case 'search':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
            }

            if (!showNav) {
              fullApi.toggleNav();
            }

            setTimeout(function () {
              fullApi.focusOnUIElement(_layout.focusableUIElements.storySearchField);
            }, 0);
            break;
          }

        case 'focusIframe':
          {
            var element = _global.document.getElementById('storybook-preview-iframe');

            if (element) {
              try {
                // should be like a channel message and all that, but yolo for now
                element.contentWindow.focus();
              } catch (e) {//
              }
            }

            break;
          }

        case 'focusPanel':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
            }

            if (!showPanel) {
              fullApi.togglePanel();
            }

            fullApi.focusOnUIElement(_layout.focusableUIElements.storyPanelRoot);
            break;
          }

        case 'nextStory':
          {
            fullApi.jumpToStory(1);
            break;
          }

        case 'prevStory':
          {
            fullApi.jumpToStory(-1);
            break;
          }

        case 'nextComponent':
          {
            fullApi.jumpToComponent(1);
            break;
          }

        case 'prevComponent':
          {
            fullApi.jumpToComponent(-1);
            break;
          }

        case 'fullScreen':
          {
            fullApi.toggleFullscreen();
            break;
          }

        case 'togglePanel':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
              fullApi.resetLayout();
            }

            fullApi.togglePanel();
            break;
          }

        case 'toggleNav':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
              fullApi.resetLayout();
            }

            fullApi.toggleNav();
            break;
          }

        case 'toolbar':
          {
            fullApi.toggleToolbar();
            break;
          }

        case 'panelPosition':
          {
            if (isFullscreen) {
              fullApi.toggleFullscreen();
            }

            if (!showPanel) {
              fullApi.togglePanel();
            }

            fullApi.togglePanelPosition();
            break;
          }

        case 'aboutPage':
          {
            fullApi.navigate('/settings/about');
            break;
          }

        case 'shortcutsPage':
          {
            fullApi.navigate('/settings/shortcuts');
            break;
          }

        default:
          break;
      }
    }
  };

  var _store$getState2 = store.getState(),
      _store$getState2$shor = _store$getState2.shortcuts,
      persistedShortcuts = _store$getState2$shor === void 0 ? defaultShortcuts : _store$getState2$shor;

  var state = {
    // Any saved shortcuts that are still in our set of defaults
    shortcuts: keys(defaultShortcuts).reduce(function (acc, key) {
      return Object.assign({}, acc, _defineProperty({}, key, persistedShortcuts[key] || defaultShortcuts[key]));
    }, defaultShortcuts)
  };

  var init = function init(_ref2) {
    var fullApi = _ref2.api;

    function focusInInput(event) {
      return /input|textarea/i.test(event.target.tagName) || event.target.getAttribute('contenteditable') !== null;
    } // Listen for keydown events in the manager


    _global.document.addEventListener('keydown', function (event) {
      if (!focusInInput(event)) {
        fullApi.handleKeydownEvent(fullApi, event);
      }
    }); // Also listen to keydown events sent over the channel


    fullApi.on(_coreEvents.PREVIEW_KEYDOWN, function (data) {
      fullApi.handleKeydownEvent(fullApi, data.event);
    });
  };

  var result = {
    api: api,
    state: state,
    init: init
  };
  return result;
}