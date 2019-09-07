"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rules = exports.ImpactValue = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _reactSizeme = require("react-sizeme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var impactColors = {
  minor: '#f1c40f',
  moderate: '#e67e22',
  serious: '#e74c3c',
  critical: '#c0392b',
  success: '#2ecc71'
};

var List = _theming.styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '4px',
  paddingRight: '4px',
  paddingTop: '4px',
  fontWeight: '400'
});

var Item = _theming.styled.div(function (_ref) {
  var elementWidth = _ref.elementWidth;
  var maxWidthBeforeBreak = 407;
  return {
    flexDirection: elementWidth > maxWidthBeforeBreak ? 'row' : 'inherit',
    marginBottom: elementWidth > maxWidthBeforeBreak ? '6px' : '12px',
    display: elementWidth > maxWidthBeforeBreak ? 'flex' : 'block'
  };
});

var StyledBadge = (0, _theming.styled)(_components.Badge)(function (_ref2) {
  var status = _ref2.status;
  return {
    padding: '2px 8px',
    marginBottom: '3px',
    minWidth: '65px',
    maxWidth: 'fit-content',
    width: '100%',
    textAlign: 'center'
  };
});

var Message = _theming.styled.div({
  paddingLeft: '6px',
  paddingRight: '23px'
});

var Status = _theming.styled.div(function (_ref3) {
  var passes = _ref3.passes,
      impact = _ref3.impact;
  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: passes ? impactColors.success : impactColors[impact],
    '& > svg': {
      height: '16px',
      width: '16px'
    }
  };
});

var ImpactValue;
exports.ImpactValue = ImpactValue;

(function (ImpactValue) {
  ImpactValue["MINOR"] = "minor";
  ImpactValue["MODERATE"] = "moderate";
  ImpactValue["SERIOUS"] = "serious";
  ImpactValue["CRITICAL"] = "critical";
})(ImpactValue || (exports.ImpactValue = ImpactValue = {}));

var formatSeverityText = function formatSeverityText(severity) {
  return severity.charAt(0).toUpperCase().concat(severity.slice(1));
};

var Rule = function Rule(_ref4) {
  var rule = _ref4.rule;
  var badgeType = null;

  switch (rule.impact) {
    case ImpactValue.CRITICAL:
      badgeType = 'critical';
      break;

    case ImpactValue.SERIOUS:
      badgeType = 'negative';
      break;

    case ImpactValue.MODERATE:
      badgeType = 'warning';
      break;

    case ImpactValue.MINOR:
      badgeType = 'neutral';
      break;

    default:
      break;
  }

  return _react["default"].createElement(_reactSizeme.SizeMe, {
    refreshMode: "debounce"
  }, function (_ref5) {
    var size = _ref5.size;
    return _react["default"].createElement(Item, {
      elementWidth: size.width
    }, _react["default"].createElement(StyledBadge, {
      status: badgeType
    }, formatSeverityText(rule.impact)), _react["default"].createElement(Message, null, rule.message));
  });
};

var Rules = function Rules(_ref6) {
  var rules = _ref6.rules;
  return _react["default"].createElement(List, null, rules.map(function (rule, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(Rule, {
        rule: rule,
        key: index
      })
    );
  }));
};

exports.Rules = Rules;