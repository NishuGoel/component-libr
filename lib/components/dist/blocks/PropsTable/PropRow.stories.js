"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complex = exports.arrayOf = exports.objectOf = exports.number = exports.longDesc = exports.longName = exports.string = exports.complexDef = exports.arrayDef = exports.objectDef = exports.numberDef = exports.longDescDef = exports.longNameDef = exports.stringDef = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PropRow = require("./PropRow");

var _PropsTable = require("./PropsTable");

var _DocsPage = require("../DocsPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _PropRow.PropRow,
  title: 'Docs|PropRow',
  excludeStories: /.*Def$/,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, _react["default"].createElement(_PropsTable.Table, null, _react["default"].createElement("tbody", null, getStory())));
  }]
};
exports["default"] = _default;
var stringDef = {
  name: 'someString',
  type: {
    name: 'string'
  },
  required: true,
  description: 'someString description',
  defaultValue: 'fixme'
};
exports.stringDef = stringDef;
var longNameDef = Object.assign({}, stringDef, {
  name: 'reallyLongStringThatTakesUpSpace'
});
exports.longNameDef = longNameDef;
var longDescDef = Object.assign({}, stringDef, {
  description: 'really long description that takes up a lot of space. sometimes this happens.'
});
exports.longDescDef = longDescDef;
var numberDef = {
  name: 'someNumber',
  type: {
    name: 'number'
  },
  required: false,
  description: 'someNumber description',
  defaultValue: 0
};
exports.numberDef = numberDef;
var objectDef = {
  name: 'someObject',
  type: {
    name: 'objectOf',
    value: {
      name: 'number'
    }
  },
  required: false,
  description: 'A simple `objectOf` propType.',
  defaultValue: {
    value: '{ key: 1 }',
    computed: false
  }
};
exports.objectDef = objectDef;
var arrayDef = {
  name: 'someOArray',
  type: {
    name: 'arrayOf',
    value: {
      name: 'number'
    }
  },
  required: false,
  description: 'array of a certain type',
  defaultValue: {
    value: '[1, 2, 3]',
    computed: false
  }
};
exports.arrayDef = arrayDef;
var complexDef = {
  name: 'someComplex',
  type: {
    name: 'objectOf',
    value: {
      name: 'shape',
      value: {
        id: {
          name: 'number',
          description: "Just an internal propType for a shape.\n It's also required, and as you can see it supports multi-line comments!",
          required: true
        },
        func: {
          name: 'func',
          description: 'A simple non-required function',
          required: false
        },
        arr: {
          name: 'arrayOf',
          value: {
            name: 'shape',
            value: {
              index: {
                name: 'number',
                description: '5-level deep propType definition and still works.',
                required: true
              }
            }
          },
          description: 'An `arrayOf` shape',
          required: false
        }
      }
    }
  },
  required: false,
  description: 'A very complex `objectOf` propType.',
  defaultValue: {
    value: '{\n  thing: {\n    id: 2,\n    func: () => {},\n    arr: [],\n  },\n}',
    computed: false
  }
};
exports.complexDef = complexDef;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: stringDef
});

var string = function string() {
  return _ref;
};

exports.string = string;
string.displayName = "string";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: longNameDef
});

var longName = function longName() {
  return _ref2;
};

exports.longName = longName;
longName.displayName = "longName";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: longDescDef
});

var longDesc = function longDesc() {
  return _ref3;
};

exports.longDesc = longDesc;
longDesc.displayName = "longDesc";

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: numberDef
});

var number = function number() {
  return _ref4;
};

exports.number = number;
number.displayName = "number";

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: objectDef
});

var objectOf = function objectOf() {
  return _ref5;
};

exports.objectOf = objectOf;
objectOf.displayName = "objectOf";

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: arrayDef
});

var arrayOf = function arrayOf() {
  return _ref6;
};

exports.arrayOf = arrayOf;
arrayOf.displayName = "arrayOf";

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_PropRow.PropRow, {
  row: complexDef
});

var complex = function complex() {
  return _ref7;
};

exports.complex = complex;
complex.displayName = "complex";