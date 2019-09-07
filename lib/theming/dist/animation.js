"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports.easing = void 0;

var _core = require("@emotion/core");

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  0%, 100% { transform:translate3d(0,0,0); }\n  12.5%, 62.5% { transform:translate3d(-4px,0,0); }\n  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  0% { transform: translateY(1px); }\n  25% { transform: translateY(0px); }\n  50% { transform: translateY(-3px); }\n  100% { transform: translateY(1px); }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  0%, 100% { opacity: 1; }\n  50% { opacity: .4; }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\tfrom {\n\t\ttransform: rotate(0deg);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var easing = {
  rubber: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)'
};
exports.easing = easing;
var rotate360 = (0, _core.keyframes)(_templateObject());
var glow = (0, _core.keyframes)(_templateObject2());

var _float = (0, _core.keyframes)(_templateObject3());

var jiggle = (0, _core.keyframes)(_templateObject4());
var inlineGlow =
/*#__PURE__*/
(0, _core.css)("animation:", glow, " 1.5s ease-in-out infinite;color:transparent;cursor:progress;label:inlineGlow;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNzQiIsImZpbGUiOiIuLi9zcmMvYW5pbWF0aW9uLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCBlYXNpbmcgPSB7XHJcbiAgcnViYmVyOiAnY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMzUsIDEuMDUpJyxcclxufTtcclxuXHJcbmNvbnN0IHJvdGF0ZTM2MCA9IGtleWZyYW1lc2BcclxuXHRmcm9tIHtcclxuXHRcdHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG5cdH1cclxuXHR0byB7XHJcblx0XHR0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGdsb3cgPSBrZXlmcmFtZXNgXHJcbiAgMCUsIDEwMCUgeyBvcGFjaXR5OiAxOyB9XHJcbiAgNTAlIHsgb3BhY2l0eTogLjQ7IH1cclxuYDtcclxuXHJcbmNvbnN0IGZsb2F0ID0ga2V5ZnJhbWVzYFxyXG4gIDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDFweCk7IH1cclxuICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfVxyXG4gIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTsgfVxyXG4gIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTsgfVxyXG5gO1xyXG5cclxuY29uc3QgamlnZ2xlID0ga2V5ZnJhbWVzYFxyXG4gIDAlLCAxMDAlIHsgdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTsgfVxyXG4gIDEyLjUlLCA2Mi41JSB7IHRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtNHB4LDAsMCk7IH1cclxuICAzNy41JSwgODcuNSUgeyAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg0cHgsMCwwKTsgIH1cclxuYDtcclxuXHJcbmNvbnN0IGlubGluZUdsb3cgPSBjc3NgXHJcbiAgYW5pbWF0aW9uOiAke2dsb3d9IDEuNXMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XHJcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGN1cnNvcjogcHJvZ3Jlc3M7XHJcbmA7XHJcblxyXG4vLyBob3ZlciAmIGFjdGl2ZSBzdGF0ZSBmb3IgbGlua3MgYW5kIGJ1dHRvbnNcclxuY29uc3QgaG92ZXJhYmxlID0gY3NzYFxyXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLW91dDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTJweCwgMCk7XHJcbiAgfVxyXG5cclxuICAmOmFjdGl2ZSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBhbmltYXRpb24gPSB7XHJcbiAgcm90YXRlMzYwLFxyXG4gIGdsb3csXHJcbiAgZmxvYXQsXHJcbiAgamlnZ2xlLFxyXG4gIGlubGluZUdsb3csXHJcbiAgaG92ZXJhYmxlLFxyXG59O1xyXG4iXX0= */")); // hover & active state for links and buttons

var hoverable = process.env.NODE_ENV === "production" ? {
  name: "1023qba-hoverable",
  styles: "transition:all 150ms ease-out;transform:translate3d(0,0,0);&:hover{transform:translate3d(0,-2px,0);}&:active{transform:translate3d(0,0,0);}label:hoverable;"
} : {
  name: "1023qba-hoverable",
  styles: "transition:all 150ms ease-out;transform:translate3d(0,0,0);&:hover{transform:translate3d(0,-2px,0);}&:active{transform:translate3d(0,0,0);}label:hoverable;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0NxQiIsImZpbGUiOiIuLi9zcmMvYW5pbWF0aW9uLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCBlYXNpbmcgPSB7XHJcbiAgcnViYmVyOiAnY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMzUsIDEuMDUpJyxcclxufTtcclxuXHJcbmNvbnN0IHJvdGF0ZTM2MCA9IGtleWZyYW1lc2BcclxuXHRmcm9tIHtcclxuXHRcdHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG5cdH1cclxuXHR0byB7XHJcblx0XHR0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG5cdH1cclxuYDtcclxuXHJcbmNvbnN0IGdsb3cgPSBrZXlmcmFtZXNgXHJcbiAgMCUsIDEwMCUgeyBvcGFjaXR5OiAxOyB9XHJcbiAgNTAlIHsgb3BhY2l0eTogLjQ7IH1cclxuYDtcclxuXHJcbmNvbnN0IGZsb2F0ID0ga2V5ZnJhbWVzYFxyXG4gIDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDFweCk7IH1cclxuICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfVxyXG4gIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTsgfVxyXG4gIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTsgfVxyXG5gO1xyXG5cclxuY29uc3QgamlnZ2xlID0ga2V5ZnJhbWVzYFxyXG4gIDAlLCAxMDAlIHsgdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTsgfVxyXG4gIDEyLjUlLCA2Mi41JSB7IHRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtNHB4LDAsMCk7IH1cclxuICAzNy41JSwgODcuNSUgeyAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg0cHgsMCwwKTsgIH1cclxuYDtcclxuXHJcbmNvbnN0IGlubGluZUdsb3cgPSBjc3NgXHJcbiAgYW5pbWF0aW9uOiAke2dsb3d9IDEuNXMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XHJcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGN1cnNvcjogcHJvZ3Jlc3M7XHJcbmA7XHJcblxyXG4vLyBob3ZlciAmIGFjdGl2ZSBzdGF0ZSBmb3IgbGlua3MgYW5kIGJ1dHRvbnNcclxuY29uc3QgaG92ZXJhYmxlID0gY3NzYFxyXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLW91dDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTJweCwgMCk7XHJcbiAgfVxyXG5cclxuICAmOmFjdGl2ZSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBhbmltYXRpb24gPSB7XHJcbiAgcm90YXRlMzYwLFxyXG4gIGdsb3csXHJcbiAgZmxvYXQsXHJcbiAgamlnZ2xlLFxyXG4gIGlubGluZUdsb3csXHJcbiAgaG92ZXJhYmxlLFxyXG59O1xyXG4iXX0= */"
};
var animation = {
  rotate360: rotate360,
  glow: glow,
  "float": _float,
  jiggle: jiggle,
  inlineGlow: inlineGlow,
  hoverable: hoverable
};
exports.animation = animation;