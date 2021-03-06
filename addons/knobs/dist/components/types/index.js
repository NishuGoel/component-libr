"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TextTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Text.TextTypeKnob;
  }
});
Object.defineProperty(exports, "NumberTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Number.NumberTypeKnob;
  }
});
Object.defineProperty(exports, "NumberTypeKnobOptions", {
  enumerable: true,
  get: function get() {
    return _Number.NumberTypeKnobOptions;
  }
});
Object.defineProperty(exports, "ColorTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Color.ColorTypeKnob;
  }
});
Object.defineProperty(exports, "BooleanTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Boolean.BooleanTypeKnob;
  }
});
Object.defineProperty(exports, "ObjectTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Object.ObjectTypeKnob;
  }
});
Object.defineProperty(exports, "SelectTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Select.SelectTypeKnob;
  }
});
Object.defineProperty(exports, "SelectTypeOptionsProp", {
  enumerable: true,
  get: function get() {
    return _Select.SelectTypeOptionsProp;
  }
});
Object.defineProperty(exports, "SelectTypeKnobValue", {
  enumerable: true,
  get: function get() {
    return _Select.SelectTypeKnobValue;
  }
});
Object.defineProperty(exports, "RadiosTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Radio.RadiosTypeKnob;
  }
});
Object.defineProperty(exports, "RadiosTypeOptionsProp", {
  enumerable: true,
  get: function get() {
    return _Radio.RadiosTypeOptionsProp;
  }
});
Object.defineProperty(exports, "ArrayTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Array.ArrayTypeKnob;
  }
});
Object.defineProperty(exports, "DateTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Date.DateTypeKnob;
  }
});
Object.defineProperty(exports, "ButtonTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonTypeKnob;
  }
});
Object.defineProperty(exports, "ButtonTypeOnClickProp", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonTypeOnClickProp;
  }
});
Object.defineProperty(exports, "FileTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Files.FileTypeKnob;
  }
});
Object.defineProperty(exports, "OptionsTypeKnob", {
  enumerable: true,
  get: function get() {
    return _Options.OptionsTypeKnob;
  }
});
Object.defineProperty(exports, "OptionsTypeOptionsProp", {
  enumerable: true,
  get: function get() {
    return _Options.OptionsTypeOptionsProp;
  }
});
Object.defineProperty(exports, "OptionsKnobOptions", {
  enumerable: true,
  get: function get() {
    return _Options.OptionsKnobOptions;
  }
});
exports.getKnobControl = exports["default"] = void 0;

var _Text = _interopRequireWildcard(require("./Text"));

var _Number = _interopRequireWildcard(require("./Number"));

var _Color = _interopRequireWildcard(require("./Color"));

var _Boolean = _interopRequireWildcard(require("./Boolean"));

var _Object = _interopRequireWildcard(require("./Object"));

var _Select = _interopRequireWildcard(require("./Select"));

var _Radio = _interopRequireWildcard(require("./Radio"));

var _Array = _interopRequireWildcard(require("./Array"));

var _Date = _interopRequireWildcard(require("./Date"));

var _Button = _interopRequireWildcard(require("./Button"));

var _Files = _interopRequireWildcard(require("./Files"));

var _Options = _interopRequireWildcard(require("./Options"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var KnobControls = {
  text: _Text["default"],
  number: _Number["default"],
  color: _Color["default"],
  "boolean": _Boolean["default"],
  object: _Object["default"],
  select: _Select["default"],
  radios: _Radio["default"],
  array: _Array["default"],
  date: _Date["default"],
  button: _Button["default"],
  files: _Files["default"],
  options: _Options["default"]
};
var _default = KnobControls;
exports["default"] = _default;

// Note: this is a utility function that helps in resolving types more orderly
var getKnobControl = function getKnobControl(type) {
  return KnobControls[type];
};

exports.getKnobControl = getKnobControl;