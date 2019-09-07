"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addElement = addElement;
exports.clearElements = clearElements;
exports["default"] = void 0;

var _redux = require("redux");

var _constants = require("./constants");

// actions
// add element is passed a HighlightedElementData object as the payload
function addElement(payload) {
  return {
    type: _constants.ADD_ELEMENT,
    payload: payload
  };
} // clear elements is a function to remove elements from the map and reset elements to their original state


function clearElements() {
  return {
    type: _constants.CLEAR_ELEMENTS
  };
} // reducers


var initialState = {
  highlightedElementsMap: new Map()
};

function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _constants.ADD_ELEMENT) {
    return Object.assign({}, state, {
      highlightedElementsMap: state.highlightedElementsMap.set(action.payload.element, action.payload.highlightedElementData)
    });
  }

  if (action.type === _constants.CLEAR_ELEMENTS) {
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, _Array$from = Array.from(state.highlightedElementsMap.keys()); _i < _Array$from.length; _i++) {
      var key = _Array$from[_i];
      key.style.outline = state.highlightedElementsMap.get(key).originalOutline;
      state.highlightedElementsMap["delete"](key);
    }
  }

  return state;
} // store


var store = (0, _redux.createStore)(rootReducer);
var _default = store;
exports["default"] = _default;