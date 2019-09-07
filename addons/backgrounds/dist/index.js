"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBackgrounds = void 0;

var _addons = require("@storybook/addons");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// This decorator is kept purely so we produce a decorator that is compatible with both
// `addDecorator(withBackgrounds(...))` and `addDecorator(withBackgrounds)`
var withBackgrounds = (0, _utilDeprecate["default"])((0, _addons.makeDecorator)({
  name: 'withBackgrounds',
  parameterName: 'backgrounds',
  wrapper: function wrapper(getStory, context) {
    return getStory(context);
  }
}), "Note that withBackgrounds(options) has been replaced by addParameters({ backgrounds: options})\nRead more about it in the migration guide: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md");
exports.withBackgrounds = withBackgrounds;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}