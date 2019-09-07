"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _addons = require("@storybook/addons");

var _constants = require("./constants");

var _ColorBlindness = require("./components/ColorBlindness");

var _A11YPanel = require("./components/A11YPanel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Hidden = _theming.styled.div(function () {
  return {
    '&, & svg': {
      position: 'absolute',
      width: 0,
      height: 0
    }
  };
});

var PreviewWrapper = function PreviewWrapper(p) {
  return _react["default"].createElement(_react.Fragment, null, p.children, _react["default"].createElement(Hidden, null, _react["default"].createElement("svg", {
    key: "svg"
  }, _react["default"].createElement("defs", null, _react["default"].createElement("filter", {
    id: "protanopia"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "protanomaly"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.817, 0.183, 0, 0, 0 0.333, 0.667, 0, 0, 0 0, 0.125, 0.875, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "deuteranopia"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "deuteranomaly"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.8, 0.2, 0, 0, 0 0.258, 0.742, 0, 0, 0 0, 0.142, 0.858, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "tritanopia"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.95, 0.05,  0, 0, 0 0,  0.433, 0.567, 0, 0 0,  0.475, 0.525, 0, 0 0,  0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "tritanomaly"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.967, 0.033, 0, 0, 0 0, 0.733, 0.267, 0, 0 0, 0.183, 0.817, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "achromatopsia"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0, 0, 0, 1, 0"
  })), _react["default"].createElement("filter", {
    id: "achromatomaly"
  }, _react["default"].createElement("feColorMatrix", {
    "in": "SourceGraphic",
    type: "matrix",
    values: "0.618, 0.320, 0.062, 0, 0 0.163, 0.775, 0.062, 0, 0 0.163, 0.320, 0.516, 0, 0 0, 0, 0, 1, 0"
  }))))));
};

_addons.addons.register(_constants.ADDON_ID, function (api) {
  _addons.addons.add(_constants.PANEL_ID, {
    title: '',
    type: _addons.types.TOOL,
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(_ColorBlindness.ColorBlindness, null);
    }
  });

  _addons.addons.add(_constants.PANEL_ID, {
    title: 'Accessibility',
    type: _addons.types.PANEL,
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;
      return _react["default"].createElement(_A11YPanel.A11YPanel, {
        key: key,
        api: api,
        active: active
      });
    },
    paramKey: _constants.PARAM_KEY
  });

  _addons.addons.add(_constants.PANEL_ID, {
    title: '',
    type: _addons.types.PREVIEW,
    render: PreviewWrapper
  });
});