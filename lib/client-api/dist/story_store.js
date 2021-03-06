"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _commonTags = require("common-tags");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _clientLogger = require("@storybook/client-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Story with id ", " already exists in the store!\n\n        Perhaps you added the same story twice, or you have a name collision?\n        Story ids need to be unique -- ensure you aren't using the same names modolo url-sanitization.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// TODO: these are copies from components/nav/lib
// refactor to DRY
var toKey = function toKey(input) {
  return input.replace(/[^a-z0-9]+([a-z0-9])/gi, function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return params[1].toUpperCase();
  });
};

var count = 0;

var getId = function getId() {
  count += 1;
  return count;
};

var toExtracted = function toExtracted(obj) {
  return Object.entries(obj).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (typeof value === 'function') {
      return acc;
    }

    if (Array.isArray(value)) {
      return Object.assign(acc, _defineProperty({}, key, value.slice().sort()));
    }

    return Object.assign(acc, _defineProperty({}, key, value));
  }, {});
};

var StoryStore =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(StoryStore, _EventEmitter);

  function StoryStore(params) {
    var _this;

    _classCallCheck(this, StoryStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StoryStore).call(this));
    _this._error = void 0;
    _this._channel = void 0;
    _this._data = void 0;
    _this._legacyData = void 0;
    _this._legacydata = void 0;
    _this._revision = void 0;
    _this._selection = void 0;

    _this.setChannel = function (channel) {
      _this._channel = channel;
    };

    _this.fromId = function (id) {
      try {
        var data = _this._data[id];

        if (!data || !data.getDecorated) {
          return null;
        }

        return data;
      } catch (e) {
        _clientLogger.logger.warn('failed to get story:', _this._data);

        _clientLogger.logger.error(e);

        return null;
      }
    };

    _this.getSelection = function () {
      return _this._selection;
    };

    _this.getError = function () {
      return _this._error;
    };

    _this.remove = function (id) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          _data = _assertThisInitialize._data;

      var story = _data[id];
      delete _data[id];

      if (story) {
        var kind = story.kind,
            name = story.name;

        var kindData = _this._legacydata[toKey(kind)];

        if (kindData) {
          delete kindData.stories[toKey(name)];
        }
      }
    };

    _this.pushToManager = (0, _debounce["default"])(function () {
      if (_this._channel) {
        var stories = _this.extract(); // send to the parent frame.


        _this._channel.emit(_coreEvents["default"].SET_STORIES, {
          stories: stories
        });
      }
    }, 0);
    _this._legacydata = {};
    _this._data = {};
    _this._revision = 0;
    _this._selection = {};
    _this._channel = params.channel;
    _this._error = undefined;
    return _this;
  }

  _createClass(StoryStore, [{
    key: "raw",
    value: function raw() {
      var _this2 = this;

      return Object.values(this._data).filter(function (i) {
        return !!i.getDecorated;
      }).map(function (_ref3) {
        var id = _ref3.id;
        return _this2.fromId(id);
      });
    }
  }, {
    key: "extract",
    value: function extract() {
      var _this3 = this;

      var stories = Object.entries(this._data); // determine if we should apply a sort to the stories or just use default import order

      if (Object.values(this._data).length > 0) {
        var index = Object.keys(this._data).find(function (key) {
          return !!(_this3._data[key] && _this3._data[key].parameters && _this3._data[key].parameters.options);
        });

        if (index && this._data[index].parameters.options.storySort) {
          var sortFn = this._data[index].parameters.options.storySort;
          stories.sort(sortFn);
        }
      } // removes function values from all stories so they are safe to transport over the channel


      return stories.reduce(function (a, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            k = _ref5[0],
            v = _ref5[1];

        return Object.assign(a, _defineProperty({}, k, toExtracted(v)));
      }, {});
    }
  }, {
    key: "setSelection",
    value: function setSelection(data, error) {
      var _this4 = this;

      this._selection = data === undefined ? this._selection : {
        storyId: data.storyId,
        viewMode: data.viewMode
      };
      this._error = error === undefined ? this._error : error;
      setTimeout(function () {
        // preferred method to emit event.
        if (_this4._channel) {
          _this4._channel.emit(_coreEvents["default"].STORY_RENDER);
        } // should be deprecated in future.


        _this4.emit(_coreEvents["default"].STORY_RENDER);
      }, 1);
    }
  }, {
    key: "addStory",
    value: function addStory(_ref6, _ref7) {
      var id = _ref6.id,
          kind = _ref6.kind,
          name = _ref6.name,
          original = _ref6.storyFn,
          _ref6$parameters = _ref6.parameters,
          parameters = _ref6$parameters === void 0 ? {} : _ref6$parameters;
      var getDecorators = _ref7.getDecorators,
          applyDecorators = _ref7.applyDecorators;
      var _data = this._data;

      if (_data[id]) {
        _clientLogger.logger.warn((0, _commonTags.stripIndents)(_templateObject(), id));
      }

      var identification = {
        id: id,
        kind: kind,
        name: name,
        story: name // legacy

      }; // immutable original storyFn

      var getOriginal = function getOriginal() {
        return original;
      }; // lazily decorate the story when it's loaded


      var getDecorated = (0, _memoizerific["default"])(1)(function () {
        return applyDecorators(getOriginal(), getDecorators());
      });

      var storyFn = function storyFn(p) {
        return getDecorated()(Object.assign({}, identification, {}, p, {
          parameters: Object.assign({}, parameters, {}, p && p.parameters)
        }));
      };

      _data[id] = Object.assign({}, identification, {
        getDecorated: getDecorated,
        getOriginal: getOriginal,
        storyFn: storyFn,
        parameters: parameters
      }); // LEGACY DATA

      this.addLegacyStory({
        kind: kind,
        name: name,
        storyFn: storyFn,
        parameters: parameters
      }); // LET'S SEND IT TO THE MANAGER

      this.pushToManager();
    }
  }, {
    key: "getRevision",
    // OLD apis
    value: function getRevision() {
      return this._revision;
    }
  }, {
    key: "incrementRevision",
    value: function incrementRevision() {
      this._revision += 1;
    }
  }, {
    key: "addLegacyStory",
    value: function addLegacyStory(_ref8) {
      var kind = _ref8.kind,
          name = _ref8.name,
          storyFn = _ref8.storyFn,
          parameters = _ref8.parameters;
      var k = toKey(kind);

      if (!this._legacydata[k]) {
        this._legacydata[k] = {
          kind: kind,
          fileName: parameters.fileName,
          index: getId(),
          stories: {}
        };
      }

      this._legacydata[k].stories[toKey(name)] = {
        name: name,
        // kind,
        index: getId(),
        story: storyFn,
        parameters: parameters
      };
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      return Object.values(this._legacydata).filter(function (kind) {
        return Object.keys(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: "getStories",
    value: function getStories(kind) {
      var _this5 = this;

      var key = toKey(kind);

      if (!this._legacydata[key]) {
        return [];
      }

      return Object.keys(this._legacydata[key].stories).map(function (name) {
        return _this5._legacydata[key].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: "getStoryFileName",
    value: function getStoryFileName(kind) {
      var key = toKey(kind);
      var storiesKind = this._legacydata[key];

      if (!storiesKind) {
        return null;
      }

      return storiesKind.fileName;
    }
  }, {
    key: "getStoryAndParameters",
    value: function getStoryAndParameters(kind, name) {
      if (!kind || !name) {
        return null;
      }

      var storiesKind = this._legacydata[toKey(kind)];

      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[toKey(name)];

      if (!storyInfo) {
        return null;
      }

      var story = storyInfo.story,
          parameters = storyInfo.parameters;
      return {
        story: story,
        parameters: parameters
      };
    }
  }, {
    key: "getStory",
    value: function getStory(kind, name) {
      var data = this.getStoryAndParameters(kind, name);
      return data && data.story;
    }
  }, {
    key: "getStoryWithContext",
    value: function getStoryWithContext(kind, name) {
      var data = this.getStoryAndParameters(kind, name);

      if (!data) {
        return null;
      }

      var story = data.story;
      return story;
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      if (this.hasStoryKind(kind)) {
        this._legacydata[toKey(kind)].stories = {};
        this._data = Object.entries(this._data).reduce(function (acc, _ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              id = _ref10[0],
              story = _ref10[1];

          if (story.kind !== kind) {
            Object.assign(acc, _defineProperty({}, id, story));
          }

          return acc;
        }, {});
      }
    }
  }, {
    key: "hasStoryKind",
    value: function hasStoryKind(kind) {
      return Boolean(this._legacydata[toKey(kind)]);
    }
  }, {
    key: "hasStory",
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: "dumpStoryBook",
    value: function dumpStoryBook() {
      var _this6 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return {
          kind: kind,
          stories: _this6.getStories(kind)
        };
      });
      return data;
    }
  }, {
    key: "size",
    value: function size() {
      return Object.keys(this._legacydata).length;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this7 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this7._legacydata[toKey(kind)];
      });
    }
  }]);

  return StoryStore;
}(_eventemitter["default"]);

exports["default"] = StoryStore;