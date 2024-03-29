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

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = exports.TreeState = void 0;

var _global = require("global");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _utils = require("./utils");

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var createHandler = (0, _memoizerific["default"])(10000)(function (item, cb) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return cb.apply(void 0, args.concat([item]));
  };
});

var linked = function linked(C, _ref) {
  var onClick = _ref.onClick,
      onKeyUp = _ref.onKeyUp,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix,
      L = _ref.Link;

  var Linked = _react["default"].memo(function (p) {
    return _react["default"].createElement(L, _extends({
      prefix: prefix
    }, p, {
      onKeyUp: createHandler(p, onKeyUp),
      onClick: createHandler(p, onClick)
    }), _react["default"].createElement(C, p));
  });

  Linked.displayName = "Linked".concat(C.displayName);
  return Linked;
};

var getLink = (0, _memoizerific["default"])(1)(function (Link) {
  return Link || _components.DefaultLink;
});
var getHead = (0, _memoizerific["default"])(1)(function (Head, Link, prefix, events) {
  return linked(Head || _components.DefaultHead, {
    onClick: events.onClick,
    onKeyUp: events.onKeyUp,
    prefix: prefix,
    Link: getLink(Link)
  });
});
var getLeaf = (0, _memoizerific["default"])(1)(function (Leaf, Link, prefix, events) {
  return linked(Leaf || _components.DefaultLeaf, {
    onClick: events.onClick,
    onKeyUp: events.onKeyUp,
    prefix: prefix,
    Link: getLink(Link)
  });
});
var getFilter = (0, _memoizerific["default"])(1)(function (Filter) {
  return Filter || _components.DefaultFilter;
});
var getTitle = (0, _memoizerific["default"])(1)(function (Title) {
  return Title || _components.DefaultRootTitle;
});
var getContainer = (0, _memoizerific["default"])(1)(function (Section) {
  return Section || _components.DefaultSection;
});
var getMessage = (0, _memoizerific["default"])(1)(function (Message) {
  return Message || _components.DefaultMessage;
});

var branchOrLeaf = function branchOrLeaf( // eslint-disable-next-line react/prop-types
_ref2, _ref3) {
  var Branch = _ref2.Branch,
      Leaf = _ref2.Leaf,
      Head = _ref2.Head,
      List = _ref2.List;
  var root = _ref3.root,
      dataset = _ref3.dataset,
      expanded = _ref3.expanded,
      selected = _ref3.selected,
      depth = _ref3.depth;
  var node = dataset[root];
  return node.children ? _react["default"].createElement(Branch, _extends({
    key: node.id
  }, {
    Branch: Branch,
    Leaf: Leaf,
    Head: Head,
    List: List,
    dataset: dataset,
    root: root,
    depth: depth,
    expanded: expanded,
    selected: selected
  })) : _react["default"].createElement(Leaf, _extends({
    key: node.id
  }, node, {
    depth: depth,
    isSelected: selected[node.id]
  }));
};

var Tree = function Tree(props) {
  var root = props.root,
      depth = props.depth,
      dataset = props.dataset,
      expanded = props.expanded,
      selected = props.selected,
      _props$Branch = props.Branch,
      Branch = _props$Branch === void 0 ? Tree : _props$Branch,
      _props$List = props.List,
      List = _props$List === void 0 ? _components.DefaultList : _props$List,
      _props$Leaf = props.Leaf,
      Leaf = _props$Leaf === void 0 ? _components.DefaultLeaf : _props$Leaf,
      _props$Head = props.Head,
      Head = _props$Head === void 0 ? _components.DefaultHead : _props$Head;

  var _ref4 = dataset[root] || {},
      children = _ref4.children,
      node = _objectWithoutProperties(_ref4, ["children"]);

  var mapNode = function mapNode(i) {
    return branchOrLeaf({
      Branch: Branch,
      Leaf: Leaf,
      Head: Head,
      List: List
    }, {
      dataset: dataset,
      selected: selected,
      expanded: expanded,
      root: i,
      depth: depth + 1
    });
  };

  switch (true) {
    case !!(children && children.length && node.name):
      {
        return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Head, _extends({}, node, {
          depth: depth,
          isExpanded: expanded[node.id],
          isSelected: selected[node.id]
        })), children && expanded[node.id] ? _react["default"].createElement(List, null, children.map(mapNode)) : null);
      }

    case !!(children && children.length):
      {
        return _react["default"].createElement(List, null, children.map(mapNode));
      }

    default:
      {
        return null;
      }
  }
};

exports.Tree = Tree;
var calculateTreeState = (0, _memoizerific["default"])(50)(function (_ref5, _ref6) {
  var dataset = _ref5.dataset,
      selectedId = _ref5.selectedId;
  var lastSelectedId = _ref6.lastSelectedId,
      unfilteredExpanded = _ref6.unfilteredExpanded;

  if (selectedId === lastSelectedId) {
    return null;
  } // If a new selection is made, we need to ensure it is part of the expanded set


  var selectedAncestorIds = selectedId ? (0, _utils.getParents)(selectedId, dataset).map(function (i) {
    return i.id;
  }) : [];
  var newExpanded = Object.keys(dataset).reduce(function (acc, key) {
    return Object.assign({}, acc, _defineProperty({}, key, selectedAncestorIds.includes(key) || unfilteredExpanded[key]));
  }, {});
  return {
    lastSelectedId: selectedId,
    unfilteredExpanded: newExpanded
  };
});

var getExpanded = function getExpanded(_ref7) {
  var unfilteredExpanded = _ref7.unfilteredExpanded,
      filteredExpanded = _ref7.filteredExpanded,
      filter = _ref7.filter;
  return filter ? filteredExpanded : unfilteredExpanded;
};

var getFilteredDataset = (0, _memoizerific["default"])(50)(function (_ref8) {
  var dataset = _ref8.dataset,
      filter = _ref8.filter;
  return filter ? (0, _utils.toFiltered)(dataset, filter) : dataset;
}); // Update the set of expansions we are currently working with

var updateExpanded = function updateExpanded(fn) {
  return function (_ref9) {
    var unfilteredExpanded = _ref9.unfilteredExpanded,
        filteredExpanded = _ref9.filteredExpanded,
        filter = _ref9.filter;

    if (filter) {
      return {
        filteredExpanded: fn(filteredExpanded)
      };
    }

    return {
      unfilteredExpanded: fn(unfilteredExpanded)
    };
  };
};

var getPropsForTree = (0, _memoizerific["default"])(50)(function (_ref10) {
  var dataset = _ref10.dataset,
      selectedId = _ref10.selectedId;
  var selected = Object.keys(dataset).reduce(function (acc, k) {
    return Object.assign(acc, _defineProperty({}, k, k === selectedId));
  }, {});

  var _getMains$reduce = (0, _utils.getMains)(dataset).reduce(function (acc, item) {
    var isRoot = item.isRoot;
    return isRoot ? Object.assign({}, acc, {
      roots: [].concat(_toConsumableArray(acc.roots), [item])
    }) : Object.assign({}, acc, {
      others: [].concat(_toConsumableArray(acc.others), [item])
    });
  }, {
    roots: [],
    others: []
  }),
      roots = _getMains$reduce.roots,
      others = _getMains$reduce.others;

  return {
    selected: selected,
    roots: roots,
    others: others
  };
});

var TreeState =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TreeState, _PureComponent);

  function TreeState() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TreeState);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TreeState)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      // We maintain two sets of expanded nodes, so we remember which were expanded if we clear the filter
      unfilteredExpanded: {},
      filteredExpanded: {},
      filter: null,
      lastSelectedId: null
    };
    _this.events = {
      onClick: function onClick(e, item) {
        _this.setState(updateExpanded(function (expanded) {
          return Object.assign({}, expanded, _defineProperty({}, item.id, !expanded[item.id]));
        }));
      },
      onFilter: function onFilter(inputFilter) {
        var dataset = _this.props.dataset;
        var filter = inputFilter.length >= 2 ? inputFilter : '';
        var filteredDataset = getFilteredDataset({
          dataset: dataset,
          filter: filter
        }); // Whenever we change the filter, we reset the "filtered" expanded set back to all matching stories

        _this.setState({
          filter: filter,
          filteredExpanded: !!filter && Object.keys(filteredDataset).reduce(function (acc, k) {
            return Object.assign(acc, _defineProperty({}, k, true));
          }, {})
        });
      },
      onKeyUp: function onKeyUp(e, item) {
        var _this$props = _this.props,
            prefix = _this$props.prefix,
            dataset = _this$props.dataset;
        var filter = _this.state.filter;
        var filteredDataset = getFilteredDataset({
          dataset: dataset,
          filter: filter
        });
        var expanded = getExpanded(_this.state);
        var action = (0, _utils.keyEventToAction)(e);

        if (action) {
          (0, _utils.prevent)(e);
        }

        if (action === 'RIGHT') {
          var next = (0, _utils.getNext)({
            id: item.id,
            dataset: filteredDataset,
            expanded: expanded
          });

          if (!filteredDataset[item.id].children || expanded[item.id]) {
            if (next) {
              try {
                _global.document.getElementById((0, _utils.createId)(next.id, prefix)).focus();
              } catch (err) {// debugger;
              }
            }
          }

          _this.setState(updateExpanded(function (currExpanded) {
            return Object.assign({}, currExpanded, _defineProperty({}, item.id, true));
          }));
        }

        if (action === 'LEFT') {
          var prev = (0, _utils.getPrevious)({
            id: item.id,
            dataset: filteredDataset,
            expanded: expanded
          });

          if (!filteredDataset[item.id].children || !expanded[item.id]) {
            var parent = (0, _utils.getParent)(item.id, filteredDataset);

            if (parent && parent.children) {
              try {
                _global.document.getElementById((0, _utils.createId)(parent.id, prefix)).focus();
              } catch (err) {// debugger;
              }

              if (prev) {
                try {
                  _global.document.getElementById((0, _utils.createId)(prev.id, prefix)).focus();
                } catch (err) {// debugger;
                }
              }
            }
          }

          _this.setState(updateExpanded(function (currExpanded) {
            return Object.assign({}, currExpanded, _defineProperty({}, item.id, false));
          }));
        }

        if (action === 'DOWN') {
          var _next = (0, _utils.getNext)({
            id: item.id,
            dataset: filteredDataset,
            expanded: expanded
          });

          if (_next) {
            try {
              _global.document.getElementById((0, _utils.createId)(_next.id, prefix)).focus();
            } catch (err) {// debugger;
            }
          }
        }

        if (action === 'UP') {
          var _prev = (0, _utils.getPrevious)({
            id: item.id,
            dataset: filteredDataset,
            expanded: expanded
          });

          if (_prev) {
            try {
              _global.document.getElementById((0, _utils.createId)(_prev.id, prefix)).focus();
            } catch (err) {// debugger;
            }
          }
        }
      }
    };
    return _this;
  }

  _createClass(TreeState, [{
    key: "render",
    value: function render() {
      var events = this.events,
          _this$state = this.state,
          filter = _this$state.filter,
          unfilteredExpanded = _this$state.unfilteredExpanded,
          filteredExpanded = _this$state.filteredExpanded,
          props = this.props;
      var prefix = props.prefix,
          dataset = props.dataset,
          selectedId = props.selectedId;
      var Filter = getFilter(props.Filter);
      var List = getFilter(props.List);
      var Branch = Tree;
      var Title = getTitle(props.Title);
      var Link = getLink(props.Link);
      var Leaf = getLeaf(props.Leaf, Link, prefix, events);
      var Head = getHead(props.Head, Link, prefix, events);
      var Section = getContainer(props.Section);
      var Message = getMessage(props.Message);
      var filteredDataset = getFilteredDataset({
        dataset: dataset,
        filter: filter
      });
      var expanded = filter ? filteredExpanded : unfilteredExpanded;

      var _getPropsForTree = getPropsForTree({
        dataset: filteredDataset,
        selectedId: selectedId
      }),
          selected = _getPropsForTree.selected,
          roots = _getPropsForTree.roots,
          others = _getPropsForTree.others;

      return _react["default"].createElement(_react.Fragment, null, Filter ? _react["default"].createElement(Filter, {
        key: "filter",
        onChange: this.events.onFilter
      }) : null, roots.length || others.length ? _react["default"].createElement(_react.Fragment, null, roots.map(function (_ref11) {
        var id = _ref11.id,
            name = _ref11.name,
            children = _ref11.children;
        return _react["default"].createElement(Section, {
          key: id
        }, _react["default"].createElement(Title, {
          type: "section",
          mods: ['uppercase']
        }, name), children.map(function (key) {
          return _react["default"].createElement(Branch, {
            key: key,
            depth: 0,
            dataset: filteredDataset,
            selected: selected,
            expanded: expanded,
            root: key,
            events: events,
            Head: Head,
            Leaf: Leaf,
            Branch: Branch,
            List: List
          });
        }));
      }), others.length ? _react["default"].createElement(Section, {
        key: "other"
      }, roots.length ? _react["default"].createElement(Title, {
        type: "section",
        mods: ['uppercase']
      }, "Others") : null, others.map(function (_ref12) {
        var id = _ref12.id;
        return _react["default"].createElement(Branch, {
          key: id,
          depth: 0,
          dataset: filteredDataset,
          selected: selected,
          expanded: expanded,
          root: id,
          events: events,
          Link: Link,
          Head: Head,
          Leaf: Leaf,
          Branch: Branch
        });
      })) : null) : _react["default"].createElement(Message, null, "This filter resulted in 0 results"));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return calculateTreeState(props, state);
    }
  }]);

  return TreeState;
}(_react.PureComponent);

exports.TreeState = TreeState;
TreeState.displayName = "TreeState";
TreeState.propTypes = {
  prefix: _propTypes["default"].string.isRequired,
  dataset: _propTypes["default"].shape({}).isRequired,
  selectedId: _propTypes["default"].string,
  Filter: _propTypes["default"].elementType,
  List: _propTypes["default"].elementType,
  Title: _propTypes["default"].elementType,
  Link: _propTypes["default"].elementType,
  Leaf: _propTypes["default"].elementType,
  Head: _propTypes["default"].elementType,
  Section: _propTypes["default"].elementType,
  Message: _propTypes["default"].elementType
};
TreeState.defaultProps = {
  selectedId: null,
  Filter: undefined,
  List: undefined,
  Title: undefined,
  Link: undefined,
  Leaf: undefined,
  Head: undefined,
  Section: undefined,
  Message: undefined
};