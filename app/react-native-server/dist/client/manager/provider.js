"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _ui = require("@storybook/ui");

var _channelWebsocket = _interopRequireDefault(require("@storybook/channel-websocket"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _uuid = _interopRequireDefault(require("uuid"));

var _PreviewHelp = _interopRequireDefault(require("./components/PreviewHelp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var mapper = function mapper(_ref) {
  var state = _ref.state,
      api = _ref.api;
  return {
    api: api,
    storiesHash: state.storiesHash,
    storyId: state.storyId,
    viewMode: state.viewMode
  };
};

var ReactProvider =
/*#__PURE__*/
function (_Provider) {
  _inherits(ReactProvider, _Provider);

  function ReactProvider(_ref2) {
    var _this;

    var domain = _ref2.url,
        options = _ref2.options;

    _classCallCheck(this, ReactProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactProvider).call(this));
    var secured = options.secured,
        host = options.host,
        port = options.port;
    var websocketType = secured ? 'wss' : 'ws';
    var url = "".concat(websocketType, "://").concat(domain);

    if (options.manualId) {
      _this.pairedId = (0, _uuid["default"])();
      url += "/pairedId=".concat(_this.pairedId);
    }

    var channel = _this.channel || (0, _channelWebsocket["default"])({
      url: url
    });

    _addons["default"].setChannel(channel);

    channel.emit(_coreEvents["default"].CHANNEL_CREATED, {
      host: host,
      pairedId: _this.pairedId,
      port: port,
      secured: secured
    });
    _this.addons = _addons["default"];
    _this.channel = channel;
    _this.options = options;
    return _this;
  }

  _createClass(ReactProvider, [{
    key: "getElements",
    value: function getElements(type) {
      return _addons["default"].getElements(type);
    }
  }, {
    key: "renderPreview",
    value: function renderPreview() {
      return _react["default"].createElement(_api.Consumer, {
        filter: mapper,
        pure: true
      }, function (_ref3) {
        var storiesHash = _ref3.storiesHash,
            storyId = _ref3.storyId,
            api = _ref3.api,
            viewMode = _ref3.viewMode;

        if (storiesHash[storyId]) {
          api.emit(_coreEvents["default"].SET_CURRENT_STORY, {
            storyId: storyId
          });
        }

        return viewMode === 'story' ? _react["default"].createElement(_PreviewHelp["default"], null) : null;
      });
    }
  }, {
    key: "handleAPI",
    value: function handleAPI(api) {
      _addons["default"].loadAddons(api);

      api.emit(_coreEvents["default"].GET_STORIES);
    }
  }]);

  return ReactProvider;
}(_ui.Provider);

exports["default"] = ReactProvider;