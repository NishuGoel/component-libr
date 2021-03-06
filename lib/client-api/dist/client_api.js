"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defaultDecorateStory = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _isPlainObject = _interopRequireDefault(require("is-plain-object"));

var _clientLogger = require("@storybook/client-logger");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _utils = require("@storybook/router/utils");

var _mergeWith = _interopRequireDefault(require("lodash/mergeWith"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _get = _interopRequireDefault(require("lodash/get"));

var _subscriptions_store = _interopRequireDefault(require("./subscriptions_store"));

var _hooks = require("./hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// merge with concatenating arrays, but no duplicates
var merge = function merge(a, b) {
  return (0, _mergeWith["default"])({}, a, b, function (objValue, srcValue) {
    if (Array.isArray(srcValue) && Array.isArray(objValue)) {
      srcValue.forEach(function (s) {
        var existing = objValue.find(function (o) {
          return o === s || (0, _isEqual["default"])(o, s);
        });

        if (!existing) {
          objValue.push(s);
        }
      });
      return objValue;
    }

    if (Array.isArray(objValue)) {
      _clientLogger.logger.log('the types mismatch, picking', objValue);

      return objValue;
    }

    return undefined;
  });
};

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {}
};

var defaultDecorateStory = function defaultDecorateStory(storyFn, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContext;
      return decorator(function (p) {
        return decorated(p ? Object.assign({}, context, {}, p, {
          parameters: Object.assign({}, context.parameters, {}, p.parameters)
        }) : context);
      }, context);
    };
  }, storyFn);
};

exports.defaultDecorateStory = defaultDecorateStory;
var metaSubscriptionHandler = (0, _utilDeprecate["default"])(_subscriptions_store["default"].register, 'Events.REGISTER_SUBSCRIPTION is deprecated and will be removed in 6.0. Please use useEffect from @storybook/client-api instead.');

var metaSubscription = function metaSubscription() {
  _addons["default"].getChannel().on(_coreEvents["default"].REGISTER_SUBSCRIPTION, metaSubscriptionHandler);

  return function () {
    return _addons["default"].getChannel().removeListener(_coreEvents["default"].REGISTER_SUBSCRIPTION, metaSubscriptionHandler);
  };
};

var withSubscriptionTracking = function withSubscriptionTracking(storyFn) {
  if (!_addons["default"].hasChannel()) {
    return storyFn();
  }

  _subscriptions_store["default"].markAllAsUnused();

  _subscriptions_store["default"].register(metaSubscription);

  var result = storyFn();

  _subscriptions_store["default"].clearUnused();

  return result;
};

var ClientApi = function ClientApi(_ref) {
  var _this = this;

  var storyStore = _ref.storyStore,
      _ref$decorateStory = _ref.decorateStory,
      decorateStory = _ref$decorateStory === void 0 ? defaultDecorateStory : _ref$decorateStory;

  _classCallCheck(this, ClientApi);

  this._storyStore = void 0;
  this._addons = void 0;
  this._globalDecorators = void 0;
  this._globalParameters = void 0;
  this._decorateStory = void 0;

  this.setAddon = function (addon) {
    _this._addons = Object.assign({}, _this._addons, {}, addon);
  };

  this.getSeparators = function () {
    return Object.assign({}, {
      hierarchyRootSeparator: '|',
      hierarchySeparator: /\/|\./
    }, _this._globalParameters.options);
  };

  this.addDecorator = function (decorator) {
    _this._globalDecorators.push(decorator);
  };

  this.addParameters = function (parameters) {
    _this._globalParameters = Object.assign({}, _this._globalParameters, {}, parameters, {
      options: Object.assign({}, merge((0, _get["default"])(_this._globalParameters, 'options', {}), (0, _get["default"])(parameters, 'options', {})))
    });
  };

  this.clearDecorators = function () {
    _this._globalDecorators = [];
  };

  this.storiesOf = function (kind, m) {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string');
    }

    if (!m) {
      _clientLogger.logger.warn("Missing 'module' parameter for story with a kind of '".concat(kind, "'. It will break your HMR"));
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(function () {
        var _storyStore = _this._storyStore;

        _storyStore.removeStoryKind(kind);

        _storyStore.incrementRevision();
      });
    }

    var localDecorators = [];
    var localParameters = {};
    var hasAdded = false;
    var api = {
      kind: kind.toString(),
      add: function add() {
        return api;
      },
      addDecorator: function addDecorator() {
        return api;
      },
      addParameters: function addParameters() {
        return api;
      }
    }; // apply addons

    Object.keys(_this._addons).forEach(function (name) {
      var addon = _this._addons[name];

      api[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        addon.apply(api, args);
        return api;
      };
    });

    api.add = function (storyName, storyFn, parameters) {
      hasAdded = true;
      var _globalParameters = _this._globalParameters,
          _globalDecorators = _this._globalDecorators;
      var id = (0, _utils.toId)(kind, storyName);

      if (typeof storyName !== 'string') {
        throw new Error("Invalid or missing storyName provided for a \"".concat(kind, "\" story."));
      }

      if (m && m.hot && m.hot.dispose) {
        m.hot.dispose(function () {
          var _storyStore = _this._storyStore;

          _storyStore.remove(id);
        });
      }

      var fileName = m && m.id ? "".concat(m.id) : undefined;

      var _this$getSeparators = _this.getSeparators(),
          hierarchyRootSeparator = _this$getSeparators.hierarchyRootSeparator,
          hierarchySeparator = _this$getSeparators.hierarchySeparator;

      var baseOptions = {
        hierarchyRootSeparator: hierarchyRootSeparator,
        hierarchySeparator: hierarchySeparator
      };
      var allParam = [{
        options: baseOptions
      }, _globalParameters, localParameters, parameters].reduce(function (acc, p) {
        if (p) {
          Object.entries(p).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                key = _ref3[0],
                value = _ref3[1];

            var existingValue = acc[key];

            if (Array.isArray(value)) {
              acc[key] = value;
            } else if ((0, _isPlainObject["default"])(value) && (0, _isPlainObject["default"])(existingValue)) {
              acc[key] = merge(existingValue, value);
            } else {
              acc[key] = value;
            }
          });
        }

        return acc;
      }, {
        fileName: fileName
      });

      _this._storyStore.addStory({
        id: id,
        kind: kind,
        name: storyName,
        storyFn: storyFn,
        parameters: allParam
      }, {
        applyDecorators: (0, _hooks.applyHooks)(_this._decorateStory),
        getDecorators: function getDecorators() {
          return [].concat(_toConsumableArray(allParam.decorators || []), localDecorators, _toConsumableArray(_globalDecorators), [withSubscriptionTracking]);
        }
      });

      return api;
    };

    api.addDecorator = function (decorator) {
      if (hasAdded) {
        _clientLogger.logger.warn("You have added a decorator to the kind '".concat(kind, "' after a story has already been added.\nIn Storybook 4 this applied the decorator only to subsequent stories. In Storybook 5+ it applies to all stories.\nThis is probably not what you intended. Read more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md"));
      }

      localDecorators.push(decorator);
      return api;
    };

    api.addParameters = function (parameters) {
      localParameters = Object.assign({}, localParameters, {}, parameters);
      return api;
    };

    return api;
  };

  this.getStorybook = function () {
    return _this._storyStore.getStoryKinds().map(function (kind) {
      var fileName = _this._storyStore.getStoryFileName(kind);

      var stories = _this._storyStore.getStories(kind).map(function (name) {
        var render = _this._storyStore.getStoryWithContext(kind, name);

        return {
          name: name,
          render: render
        };
      });

      return {
        kind: kind,
        fileName: fileName,
        stories: stories
      };
    });
  };

  this.raw = function () {
    return _this._storyStore.raw();
  };

  this.store = function () {
    return _this._storyStore;
  };

  this._storyStore = storyStore;
  this._addons = {};
  this._globalDecorators = [];
  this._globalParameters = {};
  this._decorateStory = decorateStory;

  if (!storyStore) {
    throw new Error('storyStore is required');
  }
};

exports["default"] = ClientApi;