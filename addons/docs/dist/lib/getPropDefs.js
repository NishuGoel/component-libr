"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropDefs = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-underscore-dangle,react/forbid-foreign-prop-types */
var propTypesMap = new Map();
Object.keys(_propTypes["default"]).forEach(function (typeName) {
  // @ts-ignore
  var type = _propTypes["default"][typeName];
  propTypesMap.set(type, typeName);
  propTypesMap.set(type.isRequired, typeName);
});

var hasDocgen = function hasDocgen(obj) {
  return obj && obj.props && Object.keys(obj.props).length > 0;
};

var propsFromDocgen = function propsFromDocgen(type) {
  var props = {};
  var docgenInfoProps = type.__docgenInfo.props;
  Object.keys(docgenInfoProps).forEach(function (property) {
    var docgenInfoProp = docgenInfoProps[property];
    var defaultValueDesc = docgenInfoProp.defaultValue || {};
    var propType = docgenInfoProp.flowType || docgenInfoProp.type || 'other';
    props[property] = {
      name: property,
      type: propType,
      required: docgenInfoProp.required,
      description: docgenInfoProp.description,
      defaultValue: defaultValueDesc.value
    };
  });
  return Object.values(props);
};

var propsFromPropTypes = function propsFromPropTypes(type) {
  var props = {};

  if (type.propTypes) {
    Object.keys(type.propTypes).forEach(function (property) {
      var typeInfo = type.propTypes[property];
      var required = typeInfo.isRequired === undefined;
      var docgenInfo = type.__docgenInfo && type.__docgenInfo.props && type.__docgenInfo.props[property];
      var description = docgenInfo ? docgenInfo.description : null;
      var propType = propTypesMap.get(typeInfo) || 'other';

      if (propType === 'other') {
        if (docgenInfo && docgenInfo.type) {
          propType = docgenInfo.type.name;
        }
      }

      props[property] = {
        name: property,
        type: propType,
        required: required,
        description: description
      };
    });
  }

  if (type.defaultProps) {
    Object.keys(type.defaultProps).forEach(function (property) {
      var value = type.defaultProps[property];

      if (value === undefined) {
        return;
      }

      if (!props[property]) {
        props[property] = {
          name: property,
          type: 'any',
          required: false
        };
      }

      props[property].defaultValue = value;
    });
  }

  return Object.values(props);
};

var getPropDefs = function getPropDefs(type) {
  return hasDocgen(type.__docgenInfo) ? propsFromDocgen(type) : propsFromPropTypes(type);
};

exports.getPropDefs = getPropDefs;