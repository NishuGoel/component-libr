"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.values");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBackgrounds = void 0;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _constants = _interopRequireDefault(require("./constants"));

var _container = _interopRequireDefault(require("./container"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var withBackgrounds = (0, _addons.makeDecorator)({
  name: 'withBackgrounds',
  parameterName: 'backgrounds',
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var data = parameters || options || [];
    var backgrounds = Array.isArray(data) ? data : Object.values(data);
    var background = 'transparent';

    if (backgrounds.length !== 0) {
      _addons["default"].getChannel().emit(_constants["default"].SET, backgrounds);

      var defaultOrFirst = backgrounds.find(function (x) {
        return x["default"];
      }) || backgrounds[0];

      if (defaultOrFirst) {
        background = defaultOrFirst.value;
      }
    }

    return _react["default"].createElement(_container["default"], {
      initialBackground: background,
      channel: _addons["default"].getChannel()
    }, getStory(context));
  }
});
exports.withBackgrounds = withBackgrounds;