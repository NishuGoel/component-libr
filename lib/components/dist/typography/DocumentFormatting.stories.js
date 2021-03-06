"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withDOM = exports.withMarkdown = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _DocumentFormatting = require("./DocumentFormatting");

var _DocumentFormattingSample = _interopRequireDefault(require("./DocumentFormattingSample.md"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _DocumentFormatting.DocumentFormatting,
  title: 'Basics|DocumentFormatting',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        width: '600px',
        margin: '3rem auto',
        padding: '40px 20px',
        background: 'white'
      }
    }, storyFn());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_DocumentFormatting.DocumentFormatting, null, _react["default"].createElement(_markdownToJsx["default"], null, _DocumentFormattingSample["default"]));

var withMarkdown = function withMarkdown() {
  return _ref;
};

exports.withMarkdown = withMarkdown;
withMarkdown.displayName = "withMarkdown";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement("h1", null, "h1 Heading");

var _ref3 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "h2 Heading");

var _ref4 =
/*#__PURE__*/
_react["default"].createElement("h3", null, "h3 Heading");

var _ref5 =
/*#__PURE__*/
_react["default"].createElement("h4", null, "h4 Heading");

var _ref6 =
/*#__PURE__*/
_react["default"].createElement("h5", null, "h5 Heading");

var _ref7 =
/*#__PURE__*/
_react["default"].createElement("h6", null, "h6 Heading");

var _ref8 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Typographic replacements");

var _ref9 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Enable typographer option to see result.");

var _ref10 =
/*#__PURE__*/
_react["default"].createElement("p", null, "\xA9 \xA9 \xAE \xAE \u2122 \u2122 \xA7 \xA7 \xB1");

var _ref11 =
/*#__PURE__*/
_react["default"].createElement("p", null, "test\u2026 test\u2026 test\u2026 test?.. test!..");

var _ref12 =
/*#__PURE__*/
_react["default"].createElement("p", null, "!!! ??? , \u2013 \u2014");

var _ref13 =
/*#__PURE__*/
_react["default"].createElement("p", null, "\u201CSmartypants, double quotes\u201D and \u2018single quotes\u2019");

var _ref14 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Emphasis");

var _ref15 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("strong", null, "This is bold text"));

var _ref16 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("strong", null, "This is bold text"));

var _ref17 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("em", null, "This is italic text"));

var _ref18 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("em", null, "This is italic text"));

var _ref19 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("s", null, "Strikethrough"));

var _ref20 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Blockquotes");

var _ref21 =
/*#__PURE__*/
_react["default"].createElement("blockquote", null, _react["default"].createElement("p", null, "Blockquotes can also be nested\u2026"), _react["default"].createElement("blockquote", null, _react["default"].createElement("p", null, "\u2026by using additional greater-than signs right next to each other\u2026"), _react["default"].createElement("blockquote", null, _react["default"].createElement("p", null, "\u2026or with spaces between arrows."))));

var _ref22 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Lists");

var _ref23 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Unordered");

var _ref24 =
/*#__PURE__*/
_react["default"].createElement("ul", null, _react["default"].createElement("li", null, "Create a list by starting a line with ", _react["default"].createElement("code", null, "+"), ", ", _react["default"].createElement("code", null, "-"), ", or ", _react["default"].createElement("code", null, "*")), _react["default"].createElement("li", null, "Sub-lists are made by indenting 2 spaces:", _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "Marker character change forces new list start:", _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "Ac tristique libero volutpat at")), _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "Facilisis in pretium nisl aliquet")), _react["default"].createElement("ul", null, _react["default"].createElement("li", null, "Nulla volutpat aliquam velit"))))), _react["default"].createElement("li", null, "Very easy!"));

var _ref25 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Ordered");

var _ref26 =
/*#__PURE__*/
_react["default"].createElement("ol", null, _react["default"].createElement("li", null, _react["default"].createElement("p", null, "Lorem ipsum dolor sit amet")), _react["default"].createElement("li", null, _react["default"].createElement("p", null, "Consectetur adipiscing elit")), _react["default"].createElement("li", null, _react["default"].createElement("p", null, "Integer molestie lorem at massa")), _react["default"].createElement("li", null, _react["default"].createElement("p", null, "You can use sequential numbers\u2026")), _react["default"].createElement("li", null, _react["default"].createElement("p", null, "\u2026or keep all the numbers as ", _react["default"].createElement("code", null, "1."))));

var _ref27 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Start numbering with offset:");

var _ref28 =
/*#__PURE__*/
_react["default"].createElement("ol", {
  start: 57
}, _react["default"].createElement("li", null, "foo"), _react["default"].createElement("li", null, "bar"));

var _ref29 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Tables");

var _ref30 =
/*#__PURE__*/
_react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", null, "Option"), _react["default"].createElement("th", null, "Description"))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "data"), _react["default"].createElement("td", null, "path to data files to supply the data that will be passed into templates.")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "engine"), _react["default"].createElement("td", null, "engine to be used for processing templates. Handlebars is the default.")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "ext"), _react["default"].createElement("td", null, "extension to be used for dest files."))));

var _ref31 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Right aligned columns");

var _ref32 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Links");

var _ref33 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("a", {
  href: "http://dev.nodeca.com"
}, "link text"));

var _ref34 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("a", {
  href: "http://nodeca.github.io/pica/demo/",
  title: "title text!"
}, "link with title"));

var _ref35 =
/*#__PURE__*/
_react["default"].createElement("p", null, "Autoconverted link ", _react["default"].createElement("a", {
  href: "https://github.com/nodeca/pica"
}, "https://github.com/nodeca/pica"), ' ', "(enable linkify to see)");

var _ref36 =
/*#__PURE__*/
_react["default"].createElement("h2", null, "Images");

var _ref37 =
/*#__PURE__*/
_react["default"].createElement("p", null, _react["default"].createElement("img", {
  src: "https://octodex.github.com/images/minion.png",
  alt: "Minion"
}), _react["default"].createElement("img", {
  src: "https://octodex.github.com/images/stormtroopocat.jpg",
  alt: "Stormtroopocat",
  title: "The Stormtroopocat"
}));

var withDOM = function withDOM() {
  return _react["default"].createElement(_DocumentFormatting.DocumentFormatting, null, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Option"), _react["default"].createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Description"))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "data"), _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "path to data files to supply the data that will be passed into templates.")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "engine"), _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "engine to be used for processing templates. Handlebars is the default.")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "ext"), _react["default"].createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "extension to be used for dest files.")))), _ref32, _ref33, _ref34, _ref35, _ref36, _ref37);
};

exports.withDOM = withDOM;
withDOM.displayName = "withDOM";