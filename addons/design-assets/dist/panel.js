"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Iframe = _theming.styled.iframe({
  width: '100%',
  height: '100%',
  border: '0 none'
});

var Img = _theming.styled.img({
  width: '100%',
  height: '100%',
  border: '0 none',
  objectFit: 'contain'
});

var Asset = function Asset(_ref) {
  var url = _ref.url;

  if (!url) {
    return null;
  }

  if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
    // do image viewer
    return _react["default"].createElement(Img, {
      alt: "",
      src: url
    });
  }

  if (url.match(/\.(mp4|ogv|webm)/)) {
    // do video viewer
    return _react["default"].createElement("div", null, "not implemented yet, sorry");
  }

  return _react["default"].createElement(Iframe, {
    title: url,
    src: url
  });
};

var getUrl = function getUrl(input) {
  return typeof input === 'string' ? input : input.url;
};

var Panel = function Panel() {
  var results = (0, _api.useParameter)(_constants.PARAM_KEY, []);

  var _useAddonState = (0, _api.useAddonState)(_constants.ADDON_ID, 0),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      selected = _useAddonState2[0],
      setSelected = _useAddonState2[1];

  var _useStorybookState = (0, _api.useStorybookState)(),
      storyId = _useStorybookState.storyId;

  return (0, _react.useMemo)(function () {
    if (results.length === 0) {
      return null;
    }

    if (results.length && !results[selected]) {
      setSelected(0);
      return null;
    }

    var url = getUrl(results[selected]).replace('{id}', storyId);
    return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Asset, {
      url: url
    }), results.length > 1 ? _react["default"].createElement(_components.ActionBar, {
      key: "actionbar",
      actionItems: results.map(function (i, index) {
        return {
          title: typeof i === 'string' ? "asset #".concat(index + 1) : i.name,
          onClick: function onClick() {
            return setSelected(index);
          }
        };
      })
    }) : null);
  }, [results, selected, storyId]);
};

exports.Panel = Panel;