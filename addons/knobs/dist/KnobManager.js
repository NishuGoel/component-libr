"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.some");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _global = require("global");

var _escapeHtml = _interopRequireDefault(require("escape-html"));

var _clientApi = require("@storybook/client-api");

var _KnobStore = _interopRequireDefault(require("./KnobStore"));

var _shared = require("./shared");

var _converters = require("./converters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var knobValuesFromUrl = Object.entries((0, _clientApi.getQueryParams)()).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  if (k.includes('knob-')) {
    return Object.assign({}, acc, _defineProperty({}, k.replace('knob-', ''), v));
  }

  return acc;
}, {}); // This is used by _mayCallChannel to determine how long to wait to before triggering a panel update

var PANEL_UPDATE_INTERVAL = 400;

function escapeStrings(obj) {
  if (typeof obj === 'string') {
    return (0, _escapeHtml["default"])(obj);
  }

  if (obj == null || _typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var newArray = obj.map(escapeStrings);
    var didChange = newArray.some(function (newValue, key) {
      return newValue !== obj[key];
    });
    return didChange ? newArray : obj;
  }

  return Object.entries(obj).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        oldValue = _ref4[1];

    var newValue = escapeStrings(oldValue);
    return newValue === oldValue ? acc : Object.assign({}, acc, _defineProperty({}, key, newValue));
  }, obj);
}

var KnobManager =
/*#__PURE__*/
function () {
  function KnobManager() {
    _classCallCheck(this, KnobManager);

    this.knobStore = new _KnobStore["default"]();
    this.channel = void 0;
    this.options = {};
    this.calling = void 0;
  }

  _createClass(KnobManager, [{
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: "getKnobValue",
    value: function getKnobValue(_ref5) {
      var value = _ref5.value;
      return this.options.escapeHTML ? escapeStrings(value) : value;
    }
  }, {
    key: "knob",
    value: function knob(name, options) {
      this._mayCallChannel();

      var knobName = options.groupId ? "".concat(name, "_").concat(options.groupId) : name;
      var knobStore = this.knobStore;
      var existingKnob = knobStore.get(knobName); // We need to return the value set by the knob editor via this.
      // Normally the knobs are reset and so re-use is safe as long as the types match
      // when in storyshots, though the change event isn't called and so the knobs aren't reset, making this code fail
      // so always create a new knob when in storyshots

      if (existingKnob && options.type === existingKnob.type && _global.navigator && ( // userAgent is not set in react-native
      !_global.navigator.userAgent || !_global.navigator.userAgent.includes('jsdom'))) {
        return this.getKnobValue(existingKnob);
      }

      var knobInfo = Object.assign({}, options, {
        name: knobName,
        label: name
      });

      if (knobValuesFromUrl[knobName]) {
        var value = _converters.deserializers[options.type](knobValuesFromUrl[knobName]);

        knobInfo.defaultValue = value;
        knobInfo.value = value;
        delete knobValuesFromUrl[knobName];
      } else {
        knobInfo.defaultValue = options.value;
      }

      knobStore.set(knobName, knobInfo);
      return this.getKnobValue(knobStore.get(knobName));
    }
  }, {
    key: "_mayCallChannel",
    value: function _mayCallChannel() {
      var _this = this;

      // Re rendering of the story may cause changes to the knobStore. Some new knobs maybe added and
      // Some knobs may go unused. So we need to update the panel accordingly. For example remove the
      // unused knobs from the panel. This function sends the `setKnobs` message to the channel
      // triggering a panel re-render.
      if (!this.channel) {
        // to prevent call to undefined channel and therefore throwing TypeError
        return;
      }

      if (this.calling) {
        // If a call to channel has already registered ignore this call.
        // Once the previous call is completed all the changes to knobStore including the one that
        // triggered this, will be added to the panel.
        // This avoids emitting to the channel within very short periods of time.
        return;
      }

      this.calling = true;
      var timestamp = +new Date();
      setTimeout(function () {
        _this.calling = false; // emit to the channel and trigger a panel re-render

        _this.channel.emit(_shared.SET, {
          knobs: _this.knobStore.getAll(),
          timestamp: timestamp
        });
      }, PANEL_UPDATE_INTERVAL);
    }
  }]);

  return KnobManager;
}();

exports["default"] = KnobManager;