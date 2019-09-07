"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Props = exports.getPropsTableProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _shared = require("./shared");

var _getPropDefs = require("../lib/getPropDefs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var inferPropDefs = function inferPropDefs(framework) {
  switch (framework) {
    case 'react':
    case 'vue':
      return _getPropDefs.getPropDefs;

    default:
      return null;
  }
};

var getPropsTableProps = function getPropsTableProps(_ref, _ref2) {
  var exclude = _ref.exclude,
      of = _ref.of;
  var parameters = _ref2.parameters;
  var component = parameters.component;

  try {
    var target = of === _shared.CURRENT_SELECTION ? component : of;

    if (!target) {
      throw new Error(_components.PropsTableError.NO_COMPONENT);
    }

    var _ref3 = parameters || {},
        _ref3$framework = _ref3.framework,
        framework = _ref3$framework === void 0 ? null : _ref3$framework;

    var _ref4 = parameters && parameters.options && parameters.options.docs || {},
        _ref4$getPropDefs = _ref4.getPropDefs,
        getPropDefs = _ref4$getPropDefs === void 0 ? inferPropDefs(framework) : _ref4$getPropDefs;

    if (!getPropDefs) {
      throw new Error(_components.PropsTableError.PROPS_UNSUPPORTED);
    }

    var allRows = getPropDefs(target);
    var rows = !exclude ? allRows : allRows.filter(function (row) {
      return !exclude.includes(row.name);
    });
    return {
      rows: rows
    };
  } catch (err) {
    return {
      error: err.message
    };
  }
};

exports.getPropsTableProps = getPropsTableProps;

var PropsContainer = function PropsContainer(props) {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var propsTableProps = getPropsTableProps(props, context);
    return _react["default"].createElement(_components.PropsTable, propsTableProps);
  });
};

exports.Props = PropsContainer;