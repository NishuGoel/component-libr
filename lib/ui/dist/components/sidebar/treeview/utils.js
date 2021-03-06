"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFiltered = exports.toId = exports.getNext = exports.getPrevious = exports.getMains = exports.getParents = exports.getParent = exports.get = exports.createId = exports.keyEventToAction = exports.prevent = void 0;

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _fuse = _interopRequireDefault(require("fuse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FUZZY_SEARCH_THRESHOLD = 0.4;

var prevent = function prevent(e) {
  return e.preventDefault();
};

exports.prevent = prevent;
var toList = (0, _memoizerific["default"])(1)(function (dataset) {
  return Object.values(dataset);
});

var keyEventToAction = function keyEventToAction(_ref) {
  var keyCode = _ref.keyCode,
      ctrlKey = _ref.ctrlKey,
      shiftKey = _ref.shiftKey,
      altKey = _ref.altKey,
      metaKey = _ref.metaKey;

  if (shiftKey || metaKey || ctrlKey || altKey) {
    return false;
  }

  switch (keyCode) {
    case 18:
      {
        return 'ENTER';
      }

    case 32:
      {
        return 'SPACE';
      }

    case 38:
      {
        return 'UP';
      }

    case 40:
      {
        return 'DOWN';
      }

    case 37:
      {
        return 'LEFT';
      }

    case 39:
      {
        return 'RIGHT';
      }

    default:
      {
        return false;
      }
  }
};

exports.keyEventToAction = keyEventToAction;

var createId = function createId(id, prefix) {
  return "".concat(prefix, "_").concat(id);
};

exports.createId = createId;
var get = (0, _memoizerific["default"])(1000)(function (id, dataset) {
  return dataset[id];
});
exports.get = get;
var getParent = (0, _memoizerific["default"])(1000)(function (id, dataset) {
  var item = get(id, dataset);

  if (!item || item.isRoot) {
    return undefined;
  }

  return get(item.parent, dataset);
});
exports.getParent = getParent;
var getParents = (0, _memoizerific["default"])(1000)(function (id, dataset) {
  var parent = getParent(id, dataset);

  if (!parent) {
    return [];
  }

  return [parent].concat(_toConsumableArray(getParents(parent.id, dataset)));
});
exports.getParents = getParents;
var getMains = (0, _memoizerific["default"])(1)(function (dataset) {
  return toList(dataset).filter(function (m) {
    return m.depth === 0;
  });
});
exports.getMains = getMains;
var getMainsKeys = (0, _memoizerific["default"])(1)(function (dataset) {
  return getMains(dataset).map(function (m) {
    return m.id;
  });
});

var getPrevious = function getPrevious(_ref2) {
  var id = _ref2.id,
      dataset = _ref2.dataset,
      expanded = _ref2.expanded;
  // STEP 1
  // find parent
  // if no previous sibling, use parent
  // unless parent is root
  //
  // STEP 2
  // find previous sibling
  // recurse into that sibling's last children that are expanded
  var current = get(id, dataset);
  var parent = getParent(id, dataset);
  var mains = getMainsKeys(dataset);
  var siblings = parent && parent.children ? parent.children : mains;
  var index = siblings.indexOf(current.id);

  if (index === 0) {
    if (parent && parent.isRoot) {
      return getPrevious({
        id: parent.id,
        dataset: dataset,
        expanded: expanded
      });
    }

    if (!parent) {
      return undefined;
    }

    return parent;
  }

  var item = get(siblings[index - 1], dataset);

  while (item.children && expanded[item.id]) {
    item = get(item.children.slice(-1)[0], dataset);
  }

  if (item.isRoot) {
    return getPrevious({
      id: item.id,
      dataset: dataset,
      expanded: expanded
    });
  }

  return item;
};

exports.getPrevious = getPrevious;

var getNext = function getNext(_ref3) {
  var id = _ref3.id,
      dataset = _ref3.dataset,
      expanded = _ref3.expanded;
  // STEP 1:
  // find any children if the node is expanded, first child
  //
  // STEP 2
  // iterate over parents, + fake 'root':
  // - find index of last parent as child in grandparent
  // - if child has next sibling, return
  // - if not, continue iterating
  var current = get(id, dataset);

  if (!current) {
    return undefined;
  }

  var children = current.children;

  if (children && children.length && (expanded[current.id] || current.isRoot)) {
    return get(children[0], dataset);
  }

  var mains = getMainsKeys(dataset);
  var parents = getParents(id, dataset).concat([{
    children: mains
  }]);
  var next = parents.reduce(function (acc, item) {
    if (acc.result) {
      return acc;
    }

    var parent = item;
    var siblings = parent && parent.children ? parent.children : mains;
    var index = siblings.indexOf(acc.child.id);

    if (siblings[index + 1]) {
      return {
        result: get(siblings[index + 1], dataset)
      };
    }

    return {
      child: parent
    };
  }, {
    child: current,
    result: undefined
  });

  if (next.result && next.result.isRoot) {
    return getNext({
      id: next.result.id,
      dataset: dataset,
      expanded: expanded
    });
  }

  return next.result;
};

exports.getNext = getNext;
var fuse = (0, _memoizerific["default"])(5)(function (dataset) {
  return new _fuse["default"](toList(dataset), {
    threshold: FUZZY_SEARCH_THRESHOLD,
    keys: ['kind', 'name', 'parameters.fileName', 'parameters.notes']
  });
});
var exactMatch = (0, _memoizerific["default"])(1)(function (filter) {
  return function (i) {
    return i.kind && i.kind.includes(filter) || i.name && i.name.includes(filter) || i.parameters && i.parameters.fileName && i.parameters.fileName.includes(filter) || i.parameters && typeof i.parameters.notes === 'string' && i.parameters.notes.includes(filter);
  };
});

var toId = function toId(base, addition) {
  return base === '' ? "".concat(addition) : "".concat(base, "-").concat(addition);
};

exports.toId = toId;

var toFiltered = function toFiltered(dataset, filter) {
  var found;

  if (filter.length && filter.length > 2) {
    found = fuse(dataset).search(filter);
  } else {
    found = toList(dataset).filter(exactMatch(filter));
  } // get all parents for all results


  var result = found.reduce(function (acc, item) {
    var parents = getParents(item.id, dataset).reduce(function (pacc, pitem) {
      return Object.assign({}, pacc, _defineProperty({}, pitem.id, Object.assign({}, pitem)));
    }, {});
    return Object.assign({}, acc, _defineProperty({}, item.id, item), parents);
  }, {}); // filter the children of the found items (and their parents) so only found entries are present

  return Object.entries(result).reduce(function (acc, _ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        k = _ref5[0],
        v = _ref5[1];

    return Object.assign({}, acc, _defineProperty({}, k, v.children ? Object.assign({}, v, {
      children: v.children.filter(function (c) {
        return !!result[c];
      })
    }) : v));
  }, {});
};

exports.toFiltered = toFiltered;