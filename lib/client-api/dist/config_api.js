"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConfigApi =
/*#__PURE__*/
function () {
  function ConfigApi(_ref) {
    var _this = this;

    var channel = _ref.channel,
        storyStore = _ref.storyStore,
        clientApi = _ref.clientApi,
        clearDecorators = _ref.clearDecorators;

    _classCallCheck(this, ConfigApi);

    this._channel = void 0;
    this._storyStore = void 0;
    this._clearDecorators = void 0;
    this.clientApi = void 0;

    this.configure = function (loaders, module) {
      var render = function render() {
        var errors = [];

        try {
          if (loaders) {
            loaders();
          }
        } catch (e) {
          errors.push(e);
        }

        if (!errors.length) {
          try {
            _this._renderMain();
          } catch (e) {
            errors.push(e);
          }
        }

        if (errors.length) {
          _this._storyStore.setSelection(undefined, errors[0]);

          throw errors[0];
        } else {
          _this._storyStore.setSelection(undefined, undefined);
        }
      };

      if (module.hot) {
        module.hot.accept();
        module.hot.dispose(function () {
          _this._clearDecorators();
        });
      }

      if (_this._channel) {
        // in Browser
        render(); // Send a signal to the manager that configure() is done. We do this in a timeout
        // because the story_store sends stories in a debounced function, which results in
        // as setTimeout. We want to ensure this happens after, to avoid a FOUC.

        setTimeout(function () {
          return _this._channel.emit(_coreEvents["default"].STORIES_CONFIGURED);
        }, 0);
      } else {
        // in NodeJS
        loaders();
      }
    };

    // channel can be null when running in node
    // always check whether channel is available
    this._channel = channel;
    this._storyStore = storyStore;
    this._clearDecorators = clearDecorators;
    this.clientApi = clientApi;
  }

  _createClass(ConfigApi, [{
    key: "_renderMain",
    value: function _renderMain() {
      // do initial render of story
      this._storyStore.emit(_coreEvents["default"].STORY_INIT);
    }
  }, {
    key: "_renderError",
    value: function _renderError(err) {
      var stack = err.stack,
          message = err.message;
      var error = {
        stack: stack,
        message: message
      };

      this._storyStore.setSelection(undefined, error);
    }
  }]);

  return ConfigApi;
}();

exports["default"] = ConfigApi;