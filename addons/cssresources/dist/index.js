"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCssResources = void 0;

var _global = require("global");

var _addons = require("@storybook/addons");

var _constants = require("./constants");

var changeMediaAttribute = function changeMediaAttribute(element, enabled) {
  var current = element.getAttribute('media');

  if (enabled && !current || !enabled && current === 'max-width: 1px') {// don't do anything
  } else if (enabled && current === 'max-width: 1px') {
    // remove the attribute
    element.removeAttribute('media');
  } else if (enabled) {
    // add the disable attribute
    var value = current.replace(' and max-width: 1px', '');
    element.setAttribute('media', value);
  } else {
    // modify the existing attribute so it disables
    var _value = current ? "".concat(current, " and max-width: 1px") : 'max-width: 1px';

    element.setAttribute('media', _value);
  }
};

var createElement = function createElement(id, code) {
  var element = _global.document.createElement('div');

  element.setAttribute('id', "storybook-addon-resource_".concat(id));
  element.innerHTML = code;
  return element;
};

var getElement = function getElement(id, code) {
  var found = _global.document.querySelector("[id=\"storybook-addon-resource_".concat(id, "\"]"));

  return {
    element: found || createElement(id, code),
    created: !found
  };
};

var updateElement = function updateElement(id, code, value) {
  var _getElement = getElement(id, code),
      element = _getElement.element,
      created = _getElement.created;

  element.querySelectorAll('link').forEach(function (child) {
    return changeMediaAttribute(child, value);
  });
  element.querySelectorAll('style').forEach(function (child) {
    return changeMediaAttribute(child, value);
  });

  if (created) {
    _global.document.body.appendChild(element);
  }
};

var list = [];

var setResources = function setResources(resources) {
  var added = resources.filter(function (i) {
    return !list.find(function (r) {
      return r.code === i.code;
    });
  });
  var removed = list.filter(function (i) {
    return !resources.find(function (r) {
      return r.code === i.code;
    });
  });
  added.forEach(function (r) {
    return list.push(r);
  });
  resources.forEach(function (r) {
    var id = r.id,
        code = r.code;
    updateElement(id, code, true);
  });
  removed.forEach(function (r) {
    var id = r.id,
        code = r.code;
    updateElement(id, code, false);
  });
};

var withCssResources = (0, _addons.makeDecorator)({
  name: 'withCssResources',
  parameterName: _constants.PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: false,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;

    _addons.addons.getChannel().on(_constants.EVENTS.SET, setResources);

    if (!Array.isArray(storyOptions) && !Array.isArray(storyOptions.cssresources)) {
      throw new Error('The `cssresources` parameter needs to be an Array');
    }

    return getStory(context);
  }
});
exports.withCssResources = withCssResources;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}