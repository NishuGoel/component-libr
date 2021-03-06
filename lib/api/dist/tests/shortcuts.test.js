"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _shortcuts = _interopRequireDefault(require("../modules/shortcuts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createMockStore() {
  var state = {};
  return {
    getState: jest.fn().mockImplementation(function () {
      return state;
    }),
    setState: jest.fn().mockImplementation(function (s) {
      state = Object.assign({}, state, {}, s);
    })
  };
}

describe('shortcuts api', function () {
  it('sets defaults', function () {
    var store = createMockStore();

    var _initShortcuts = (0, _shortcuts["default"])({
      store: store
    }),
        api = _initShortcuts.api,
        state = _initShortcuts.state;

    store.setState(state);
    expect(api.getShortcutKeys().fullScreen).toEqual(['F']);
  });
  it('sets defaults, augmenting anything that was persisted', function () {
    var store = createMockStore();
    store.setState({
      shortcuts: {
        fullScreen: ['Z']
      }
    });

    var _initShortcuts2 = (0, _shortcuts["default"])({
      store: store
    }),
        api = _initShortcuts2.api,
        state = _initShortcuts2.state;

    store.setState(state);
    expect(api.getShortcutKeys().fullScreen).toEqual(['Z']);
    expect(api.getShortcutKeys().togglePanel).toEqual(['A']);
  });
  it('sets defaults, ignoring anything persisted that is out of date', function () {
    var store = createMockStore();
    store.setState({
      shortcuts: {
        randomKey: ['Z']
      }
    });

    var _initShortcuts3 = (0, _shortcuts["default"])({
      store: store
    }),
        api = _initShortcuts3.api,
        state = _initShortcuts3.state;

    store.setState(state);
    expect(api.getShortcutKeys().randomKey).not.toBeDefined();
  });
  it('sets new values',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var store, _initShortcuts4, api, state;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = createMockStore();
            _initShortcuts4 = (0, _shortcuts["default"])({
              store: store
            }), api = _initShortcuts4.api, state = _initShortcuts4.state;
            store.setState(state);
            _context.next = 5;
            return api.setShortcut('fullScreen', ['X']);

          case 5:
            expect(api.getShortcutKeys().fullScreen).toEqual(['X']);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('restores all defaults',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var store, _initShortcuts5, api, state;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            store = createMockStore();
            _initShortcuts5 = (0, _shortcuts["default"])({
              store: store
            }), api = _initShortcuts5.api, state = _initShortcuts5.state;
            store.setState(state);
            _context2.next = 5;
            return api.setShortcut('fullScreen', ['X']);

          case 5:
            _context2.next = 7;
            return api.setShortcut('togglePanel', ['B']);

          case 7:
            _context2.next = 9;
            return api.restoreAllDefaultShortcuts();

          case 9:
            expect(api.getShortcutKeys().fullScreen).toEqual(['F']);
            expect(api.getShortcutKeys().togglePanel).toEqual(['A']);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('restores single default',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var store, _initShortcuts6, api, state;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            store = createMockStore();
            _initShortcuts6 = (0, _shortcuts["default"])({
              store: store
            }), api = _initShortcuts6.api, state = _initShortcuts6.state;
            store.setState(state);
            _context3.next = 5;
            return api.setShortcut('fullScreen', ['X']);

          case 5:
            _context3.next = 7;
            return api.setShortcut('togglePanel', ['B']);

          case 7:
            _context3.next = 9;
            return api.restoreDefaultShortcut('fullScreen');

          case 9:
            expect(api.getShortcutKeys().fullScreen).toEqual(['F']);
            expect(api.getShortcutKeys().togglePanel).toEqual(['B']);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});