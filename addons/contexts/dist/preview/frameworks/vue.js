"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContexts = exports.renderVue = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _index = require("../../index");

var _ContextsPreviewAPI2 = require("../ContextsPreviewAPI");

var _constants = require("../../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * This is the framework specific bindings for Vue.
 * '@storybook/vue' expects the returning object from a decorator to be a 'VueComponent'.
 */
var renderVue = function renderVue(contextNodes, propsMap, getStoryComponent) {
  var _ContextsPreviewAPI = (0, _ContextsPreviewAPI2.ContextsPreviewAPI)(),
      getRendererFrom = _ContextsPreviewAPI.getRendererFrom,
      updateReactiveSystem = _ContextsPreviewAPI.updateReactiveSystem;

  var reactiveProps = updateReactiveSystem(propsMap);
  return _vue["default"].extend({
    name: _constants.ID,
    data: function data() {
      return reactiveProps;
    },
    render: function render(createElement) {
      return getRendererFrom(function (Component, props, children) {
        var _ref = props || Object(),
            key = _ref.key,
            ref = _ref.ref,
            style = _ref.style,
            classNames = _ref.classNames,
            rest = _objectWithoutProperties(_ref, ["key", "ref", "style", "classNames"]);

        var contextData = Component instanceof Object ? {
          key: key,
          ref: ref,
          style: style,
          "class": classNames,
          props: rest // component as a Vue object

        } : {
          key: key,
          ref: ref,
          style: style,
          "class": classNames,
          attrs: rest
        }; // component as a HTML tag string

        return createElement(Component, contextData, [children]);
      })(contextNodes, reactiveProps, function () {
        return createElement(getStoryComponent());
      });
    }
  });
};

exports.renderVue = renderVue;
var withContexts = (0, _index.createAddonDecorator)(renderVue);
exports.withContexts = withContexts;