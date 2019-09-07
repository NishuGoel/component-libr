"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = exports.getSourceProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var extract = function extract(targetId, _ref) {
  var source = _ref.source,
      locationsMap = _ref.locationsMap;
  var location = locationsMap[targetId]; // FIXME: bad locationsMap generated for module export functions whose titles are overridden

  if (!location) return null;
  var start = location.startBody,
      end = location.endBody;
  var lines = source.split('\n');

  if (start.line === end.line) {
    return lines[start.line - 1].substring(start.col, end.col);
  } // NOTE: storysource locations are 1-based not 0-based!


  var startLine = lines[start.line - 1];
  var endLine = lines[end.line - 1];
  return [startLine.substring(start.col)].concat(_toConsumableArray(lines.slice(start.line, end.line - 1)), [endLine.substring(0, end.col)]).join('\n');
};

var getSourceProps = function getSourceProps(props, _ref2) {
  var currentId = _ref2.id,
      storyStore = _ref2.storyStore;
  var codeProps = props;
  var singleProps = props;
  var multiProps = props;
  var source = codeProps.code; // prefer user-specified code

  if (!source) {
    var targetId = singleProps.id === _shared.CURRENT_SELECTION ? currentId : singleProps.id;
    var targetIds = multiProps.ids || [targetId];
    source = targetIds.map(function (sourceId) {
      var data = storyStore.fromId(sourceId);

      if (data && data.parameters) {
        var _data$parameters = data.parameters,
            mdxSource = _data$parameters.mdxSource,
            storySource = _data$parameters.storySource;
        return mdxSource || storySource && extract(sourceId, storySource);
      }

      return '';
    }).join('\n\n');
  }

  return source ? {
    code: source,
    language: props.language || 'jsx'
  } : {
    error: _components.SourceError.SOURCE_UNAVAILABLE
  };
};
/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */


exports.getSourceProps = getSourceProps;

var SourceContainer = function SourceContainer(props) {
  return _react["default"].createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var sourceProps = getSourceProps(props, context);
    return _react["default"].createElement(_components.Source, sourceProps);
  });
};

exports.Source = SourceContainer;