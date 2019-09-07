"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExportStory = isExportStory;
exports["default"] = start;
exports.getContext = void 0;

var _global = require("global");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _ansiToHtml = _interopRequireDefault(require("ansi-to-html"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _channelPostmessage = _interopRequireDefault(require("@storybook/channel-postmessage"));

var _clientApi2 = require("@storybook/client-api");

var _utils = require("@storybook/router/utils");

var _clientLogger = require("@storybook/client-logger");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _url = require("./url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ansiConverter = new _ansiToHtml["default"]();
var classes = {
  MAIN: 'sb-show-main',
  NOPREVIEW: 'sb-show-nopreview',
  ERROR: 'sb-show-errordisplay'
};

function matches(storyKey, arrayOrRegex) {
  if (Array.isArray(arrayOrRegex)) {
    return arrayOrRegex.includes(storyKey);
  }

  return storyKey.match(arrayOrRegex);
}

function isExportStory(key, _ref) {
  var includeStories = _ref.includeStories,
      excludeStories = _ref.excludeStories;
  return (!includeStories || matches(key, includeStories)) && (!excludeStories || !matches(key, excludeStories));
}

function showMain() {
  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.MAIN);
}

function showNopreview() {
  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.NOPREVIEW);
}

function showErrorDisplay(_ref2) {
  var _ref2$message = _ref2.message,
      message = _ref2$message === void 0 ? '' : _ref2$message,
      _ref2$stack = _ref2.stack,
      stack = _ref2$stack === void 0 ? '' : _ref2$stack;
  _global.document.getElementById('error-message').innerHTML = ansiConverter.toHtml(message);
  _global.document.getElementById('error-stack').innerHTML = ansiConverter.toHtml(stack);

  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.add(classes.ERROR);
} // showError is used by the various app layers to inform the user they have done something
// wrong -- for instance returned the wrong thing from a story


function showError(_ref3) {
  var title = _ref3.title,
      description = _ref3.description;

  _addons["default"].getChannel().emit(_coreEvents["default"].STORY_ERRORED, {
    title: title,
    description: description
  });

  showErrorDisplay({
    message: title,
    stack: description
  });
} // showException is used if we fail to render the story and it is uncaught by the app layer


function showException(exception) {
  _addons["default"].getChannel().emit(_coreEvents["default"].STORY_THREW_EXCEPTION, exception);

  showErrorDisplay(exception); // Log the stack to the console. So, user could check the source code.

  _clientLogger.logger.error(exception);
}

var isBrowser = _global.navigator && _global.navigator.userAgent && _global.navigator.userAgent !== 'storyshots' && !(_global.navigator.userAgent.indexOf('Node.js') > -1) && !(_global.navigator.userAgent.indexOf('jsdom') > -1);

var getContext = function () {
  var cache;
  return function (decorateStory) {
    if (cache) {
      return cache;
    }

    var channel = null;

    if (isBrowser) {
      try {
        channel = _addons["default"].getChannel();
      } catch (e) {
        channel = (0, _channelPostmessage["default"])({
          page: 'preview'
        });

        _addons["default"].setChannel(channel);
      }
    }

    var storyStore;
    var clientApi;

    if (typeof _global.window !== 'undefined' && _global.window.__STORYBOOK_CLIENT_API__) {
      clientApi = _global.window.__STORYBOOK_CLIENT_API__; // eslint-disable-next-line no-underscore-dangle

      storyStore = clientApi._storyStore;
    } else {
      storyStore = new _clientApi2.StoryStore({
        channel: channel
      });
      clientApi = new _clientApi2.ClientApi({
        storyStore: storyStore,
        decorateStory: decorateStory
      });
    }

    var _clientApi = clientApi,
        clearDecorators = _clientApi.clearDecorators;
    var configApi = new _clientApi2.ConfigApi({
      clearDecorators: clearDecorators,
      storyStore: storyStore,
      channel: channel,
      clientApi: clientApi
    });
    return {
      configApi: configApi,
      storyStore: storyStore,
      channel: channel,
      clientApi: clientApi,
      showMain: showMain,
      showError: showError,
      showException: showException
    };
  };
}();

exports.getContext = getContext;

function focusInInput(event) {
  return /input|textarea/i.test(event.target.tagName) || event.target.getAttribute('contenteditable') !== null;
}

function start(render) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      decorateStory = _ref4.decorateStory;

  var context = getContext(decorateStory);
  var clientApi = context.clientApi,
      channel = context.channel,
      configApi = context.configApi,
      storyStore = context.storyStore; // Provide access to external scripts if `window` is defined.
  // NOTE this is different to isBrowser, primarily for the JSDOM use case

  var previousKind = '';
  var previousStory = '';
  var previousRevision = -1;
  var previousViewMode = '';

  var renderMain = function renderMain(forceRender) {
    var revision = storyStore.getRevision();
    var loadError = storyStore.getError();

    var _storyStore$getSelect = storyStore.getSelection(),
        storyId = _storyStore$getSelect.storyId,
        viewMode = _storyStore$getSelect.viewMode;

    var data = storyStore.fromId(storyId);

    var _ref5 = data || {},
        kind = _ref5.kind,
        name = _ref5.name,
        getDecorated = _ref5.getDecorated,
        id = _ref5.id,
        parameters = _ref5.parameters,
        error = _ref5.error;

    var renderContext = Object.assign({}, context, {}, data, {
      selectedKind: kind,
      selectedStory: name,
      parameters: parameters,
      forceRender: forceRender
    });

    if (loadError || error) {
      showErrorDisplay(loadError || error);
      return;
    } // Render story only if selectedKind or selectedStory have changed.
    // However, we DO want the story to re-render if the store itself has changed
    // (which happens at the moment when HMR occurs)


    if (!forceRender && revision === previousRevision && viewMode === previousViewMode && kind === previousKind && name === previousStory) {
      _addons["default"].getChannel().emit(_coreEvents["default"].STORY_UNCHANGED, {
        id: id,
        revision: revision,
        kind: kind,
        name: name,
        viewMode: viewMode
      });

      return;
    }

    if (!forceRender && previousKind && previousStory) {
      _addons["default"].getChannel().emit(_coreEvents["default"].STORY_CHANGED, id);
    } // Docs view renders into a different root ID to avoid conflicts
    // with the user's view layer. Therefore we need to clean up whenever
    // we transition between view modes


    if (viewMode !== previousViewMode) {
      switch (viewMode) {
        case 'docs':
          {
            _global.document.getElementById('root').setAttribute('hidden', true);

            _global.document.getElementById('docs-root').removeAttribute('hidden');

            break;
          }

        case 'story':
        default:
          {
            if (previousViewMode === 'docs') {
              _global.document.getElementById('docs-root').setAttribute('hidden', true);

              _reactDom["default"].unmountComponentAtNode(_global.document.getElementById('docs-root'));

              _global.document.getElementById('root').removeAttribute('hidden');
            }
          }
      }
    } // Given a cleaned up state, render the appropriate view mode


    switch (viewMode) {
      case 'docs':
        {
          var NoDocs = function NoDocs() {
            return _react["default"].createElement("div", {
              style: {
                fontFamily: 'sans-serif'
              }
            }, "No docs found");
          };

          var StoryDocs = parameters && parameters.docs || NoDocs;

          _reactDom["default"].render(_react["default"].createElement(StoryDocs, {
            context: renderContext
          }), _global.document.getElementById('docs-root'));

          break;
        }

      case 'story':
      default:
        {
          if (getDecorated) {
            render(renderContext);

            _addons["default"].getChannel().emit(_coreEvents["default"].STORY_RENDERED, id);
          } else {
            showNopreview();

            _addons["default"].getChannel().emit(_coreEvents["default"].STORY_MISSING, id);
          }

          break;
        }
    }

    previousRevision = revision;
    previousKind = kind;
    previousStory = name;
    previousViewMode = viewMode;

    if (!forceRender) {
      _global.document.documentElement.scrollTop = 0;
    }
  }; // initialize the UI


  var renderUI = function renderUI(forceRender) {
    if (isBrowser) {
      try {
        renderMain(forceRender);
      } catch (ex) {
        showException(ex);
      }
    }
  };

  var forceReRender = function forceReRender() {
    return renderUI(true);
  }; // channel can be null in NodeJS


  if (isBrowser) {
    var deprecatedToId = (0, _utilDeprecate["default"])(_utils.toId, "Passing name+kind to the SET_CURRENT_STORY event is deprecated, use a storyId instead");
    channel.on(_coreEvents["default"].FORCE_RE_RENDER, forceReRender);
    channel.on(_coreEvents["default"].SET_CURRENT_STORY, function (_ref6) {
      var inputStoryId = _ref6.storyId,
          name = _ref6.name,
          kind = _ref6.kind,
          viewMode = _ref6.viewMode;
      var storyId = inputStoryId; // For backwards compatibility

      if (!storyId) {
        if (!name || !kind) {
          throw new Error('You should pass `storyId` into SET_CURRENT_STORY');
        }

        storyId = deprecatedToId(kind, name);
      }

      storyStore.setSelection({
        storyId: storyId,
        viewMode: viewMode
      });
      (0, _url.setPath)({
        storyId: storyId,
        viewMode: viewMode
      });
    }); // Handle keyboard shortcuts

    _global.window.onkeydown = function (event) {
      if (!focusInInput(event)) {
        // We have to pick off the keys of the event that we need on the other side
        var altKey = event.altKey,
            ctrlKey = event.ctrlKey,
            metaKey = event.metaKey,
            shiftKey = event.shiftKey,
            key = event.key,
            code = event.code,
            keyCode = event.keyCode;
        channel.emit(_coreEvents["default"].PREVIEW_KEYDOWN, {
          event: {
            altKey: altKey,
            ctrlKey: ctrlKey,
            metaKey: metaKey,
            shiftKey: shiftKey,
            key: key,
            code: code,
            keyCode: keyCode
          }
        });
      }
    };
  }

  storyStore.on(_coreEvents["default"].STORY_INIT, function () {
    var _initializePath = (0, _url.initializePath)(),
        storyId = _initializePath.storyId,
        viewMode = _initializePath.viewMode;

    storyStore.setSelection({
      storyId: storyId,
      viewMode: viewMode
    });
  });
  storyStore.on(_coreEvents["default"].STORY_RENDER, renderUI);

  if (typeof _global.window !== 'undefined') {
    _global.window.__STORYBOOK_CLIENT_API__ = clientApi;
    _global.window.__STORYBOOK_STORY_STORE__ = storyStore;
    _global.window.__STORYBOOK_ADDONS_CHANNEL__ = channel; // may not be defined
  }

  var previousExports = {};

  var loadStories = function loadStories(req, framework) {
    return function () {
      req.keys().forEach(function (filename) {
        var fileExports = req(filename); // An old-style story file

        if (!fileExports["default"]) {
          return;
        }

        if (!fileExports["default"].title) {
          throw new Error("Unexpected default export without title in '".concat(filename, "': ").concat(JSON.stringify(fileExports["default"])));
        }

        var meta = fileExports["default"],
            exports = _objectWithoutProperties(fileExports, ["default"]);

        var kindName = meta.title;

        if (previousExports[filename]) {
          if (previousExports[filename] === fileExports) {
            return;
          } // Otherwise clear this kind


          storyStore.removeStoryKind(kindName);
          storyStore.incrementRevision();
        } // We pass true here to avoid the warning about HMR. It's cool clientApi, we got this


        var kind = clientApi.storiesOf(kindName, true);
        kind.addParameters({
          framework: framework
        });
        (meta.decorators || []).forEach(function (decorator) {
          kind.addDecorator(decorator);
        });

        if (meta.parameters) {
          kind.addParameters(meta.parameters);
        }

        Object.keys(exports).forEach(function (key) {
          if (isExportStory(key, meta)) {
            var storyFn = exports[key];

            var _ref7 = storyFn.story || {},
                name = _ref7.name,
                parameters = _ref7.parameters;

            kind.add(name || key, storyFn, parameters);
          }
        });
        previousExports[filename] = fileExports;
      });
    };
  };

  var load = function load(req, m, framework) {
    if (m && m.hot && m.hot.dispose) {
      var _ref8 = m.hot.data || {};

      var _ref8$previousExports = _ref8.previousExports;
      previousExports = _ref8$previousExports === void 0 ? {} : _ref8$previousExports;
      m.hot.dispose(function (data) {
        // eslint-disable-next-line no-param-reassign
        data.previousExports = previousExports;
      });
    }

    configApi.configure(loadStories(req, framework), m);
  };

  return {
    load: load,
    context: context,
    clientApi: clientApi,
    configApi: configApi,
    forceReRender: forceReRender
  };
}