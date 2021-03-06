"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PropDef", {
  enumerable: true,
  get: function get() {
    return _PropDef.PropDef;
  }
});
exports.PropsTable = exports.PropsTableError = exports.Table = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _PropRow = require("./PropRow");

var _PropDef = require("./PropDef");

var _EmptyBlock = require("../EmptyBlock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Table = _theming.styled.table(function (_ref) {
  var theme = _ref.theme;
  return {
    '&&': {
      // Resets for cascading/system styles
      borderCollapse: 'collapse',
      borderSpacing: 0,
      tr: {
        border: 'none',
        background: 'none'
      },
      'td, th': {
        padding: 0,
        border: 'none'
      },
      // End Resets
      fontSize: theme.typography.size.s2,
      lineHeight: '20px',
      textAlign: 'left',
      width: '100%',
      // Margin collapse
      marginTop: '25px',
      marginBottom: '40px',
      'th:first-of-type, td:first-of-type': {
        paddingLeft: 20
      },
      'th:last-of-type, td:last-of-type': {
        paddingRight: '20px',
        width: '20%'
      },
      th: {
        color: theme.base === 'light' ? (0, _polished.transparentize)(0.4, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
        paddingTop: 10,
        paddingBottom: 10,
        '&:not(:first-of-type)': {
          paddingLeft: 15,
          paddingRight: 15
        }
      },
      td: {
        paddingTop: '16px',
        paddingBottom: '16px',
        '&:not(:first-of-type)': {
          paddingLeft: 15,
          paddingRight: 15
        },
        '&:last-of-type': {
          paddingRight: '20px'
        }
      },
      // Table "block" styling
      // Emphasize tbody's background and set borderRadius
      // Calling out because styling tables is finicky
      // Makes border alignment consistent w/other DocBlocks
      marginLeft: 1,
      marginRight: 1,
      'tr:first-child td:first-child': {
        borderTopLeftRadius: theme.appBorderRadius
      },
      'tr:first-child td:last-child': {
        borderTopRightRadius: theme.appBorderRadius
      },
      'tr:last-child td:first-child': {
        borderBottomLeftRadius: theme.appBorderRadius
      },
      'tr:last-child td:last-child': {
        borderBottomRightRadius: theme.appBorderRadius
      },
      tbody: {
        // slightly different than the other DocBlock shadows to account for table styling gymnastics
        boxShadow: theme.base === 'light' ? "rgba(0, 0, 0, 0.10) 0 1px 3px 1px,\n          ".concat((0, _polished.transparentize)(0.035, theme.appBorderColor), " 0 0 0 1px") : "rgba(0, 0, 0, 0.20) 0 2px 5px 1px,\n          ".concat((0, _polished.opacify)(0.05, theme.appBorderColor), " 0 0 0 1px"),
        borderRadius: theme.appBorderRadius,
        tr: {
          background: 'transparent',
          '&:not(:first-child)': {
            borderTop: "1px solid ".concat(theme.appBorderColor)
          }
        },
        td: {
          background: theme.background.content
        }
      } // End finicky table styling

    }
  };
});

exports.Table = Table;
var PropsTableError;
exports.PropsTableError = PropsTableError;

(function (PropsTableError) {
  PropsTableError["NO_COMPONENT"] = "No component found";
  PropsTableError["PROPS_UNSUPPORTED"] = "Props unsupported. See Props documentation for your framework.";
})(PropsTableError || (exports.PropsTableError = PropsTableError = {}));

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_EmptyBlock.EmptyBlock, null, "No props found for this component");

var _ref5 =
/*#__PURE__*/
_react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", null, "Name"), _react["default"].createElement("th", null, "Description"), _react["default"].createElement("th", null, "Default")));

/**
 * Display the props for a component as a props table. Each row is a collection of
 * PropDefs, usually derived from docgen info for the component.
 */
var PropsTable = function PropsTable(props) {
  var _ref2 = props,
      error = _ref2.error;

  if (error) {
    return _react["default"].createElement(_EmptyBlock.EmptyBlock, null, error);
  }

  var _ref3 = props,
      rows = _ref3.rows;

  if (rows.length === 0) {
    return _ref4;
  }

  return _react["default"].createElement(Table, null, _ref5, _react["default"].createElement("tbody", null, rows.map(function (row) {
    return _react["default"].createElement(_PropRow.PropRow, {
      key: row.name,
      row: row
    });
  })));
};

exports.PropsTable = PropsTable;
PropsTable.displayName = "PropsTable";