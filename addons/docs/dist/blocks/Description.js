"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = exports.getDescriptionProps = exports.DescriptionType = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-underscore-dangle */
var DescriptionType;
exports.DescriptionType = DescriptionType;

(function (DescriptionType) {
  DescriptionType["INFO"] = "info";
  DescriptionType["NOTES"] = "notes";
  DescriptionType["DOCGEN"] = "docgen";
  DescriptionType["AUTO"] = "auto";
})(DescriptionType || (exports.DescriptionType = DescriptionType = {}));

var getNotes = function getNotes(notes) {
  return notes && (typeof notes === 'string' ? notes : notes.markdown || notes.text);
};

var getInfo = function getInfo(info) {
  return info && (typeof info === 'string' ? info : info.text);
};

var getDocgen = function getDocgen(component) {
  return component && component.__docgenInfo && component.__docgenInfo.description || '';
};

var getDescriptionProps = function getDescriptionProps(_ref, _ref2) {
  var of = _ref.of,
      type = _ref.type,
      markdown = _ref.markdown;
  var parameters = _ref2.parameters;

  if (markdown) {
    return {
      markdown: markdown
    };
  }

  var component = parameters.component,
      notes = parameters.notes,
      info = parameters.info;
  var target = of === _shared.CURRENT_SELECTION ? component : of;

  switch (type) {
    case DescriptionType.INFO:
      return {
        markdown: getInfo(info)
      };

    case DescriptionType.NOTES:
      return {
        markdown: getNotes(notes)
      };

    case DescriptionType.DOCGEN:
      return {
        markdown: getDocgen(target)
      };

    case DescriptionType.AUTO:
    default:
      return {
        markdown: "\n".concat(getNotes(notes) || getInfo(info) || '', "\n\n").concat(getDocgen(target), "\n").trim()
      };
  }
};

exports.getDescriptionProps = getDescriptionProps;

var DescriptionContainer = function DescriptionContainer(props) {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var _getDescriptionProps = getDescriptionProps(props, context),
        markdown = _getDescriptionProps.markdown;

    return markdown && _react["default"].createElement(_components.Description, {
      markdown: markdown
    });
  });
};

exports.Description = DescriptionContainer;