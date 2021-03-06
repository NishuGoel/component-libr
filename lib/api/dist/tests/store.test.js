"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _store = _interopRequireDefault(require("store2"));

var _flushPromises = _interopRequireDefault(require("flush-promises"));

var _store2 = _interopRequireWildcard(require("../store"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

jest.mock('store2', function () {
  return {
    local: {
      set: jest.fn(),
      get: jest.fn()
    },
    session: {
      set: jest.fn(),
      get: jest.fn()
    },
    _: {
      fn: function fn() {}
    }
  };
});
describe('store', function () {
  it('sensibly combines local+session storage for inital state', function () {
    _store["default"].session.get.mockReturnValueOnce({
      foo: 'bar',
      combined: {
        a: 'b'
      }
    });

    _store["default"].local.get.mockReturnValueOnce({
      foo: 'baz',
      another: 'value',
      combined: {
        c: 'd'
      }
    });

    var store = new _store2["default"]({});
    expect(store.getInitialState()).toEqual({
      foo: 'bar',
      another: 'value',
      // We don't combine subfields from the two sources.
      combined: {
        a: 'b'
      }
    });
  });
  it('passes getState right through', function () {
    var getState = jest.fn();
    var store = new _store2["default"]({
      getState: getState
    });
    store.getState();
    expect(getState).toHaveBeenCalled();
  });
  describe('setState', function () {
    it('sets values in React only by default',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var setState, store;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                return cb();
              });
              store = new _store2["default"]({
                setState: setState
              });
              _context.next = 4;
              return store.setState({
                foo: 'bar'
              });

            case 4:
              expect(setState).toHaveBeenCalledWith({
                foo: 'bar'
              }, expect.any(Function));
              expect(_store["default"].session.set).not.toHaveBeenCalled();
              expect(_store["default"].local.set).not.toHaveBeenCalled();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('sets values in React and sessionStorage if persistence === session',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var setState, store;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                return cb();
              });
              store = new _store2["default"]({
                setState: setState
              });
              _context2.next = 4;
              return store.setState({
                foo: 'bar'
              }, {
                persistence: 'session'
              });

            case 4:
              expect(setState).toHaveBeenCalledWith({
                foo: 'bar'
              }, expect.any(Function));
              expect(_store["default"].session.set).toHaveBeenCalledWith(_store2.STORAGE_KEY, {
                foo: 'bar'
              });
              expect(_store["default"].local.set).not.toHaveBeenCalled();

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('sets values in React and sessionStorage if persistence === permanent',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var setState, store;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                return cb();
              });
              store = new _store2["default"]({
                setState: setState
              });
              _context3.next = 4;
              return store.setState({
                foo: 'bar'
              }, {
                persistence: 'permanent'
              });

            case 4:
              expect(setState).toHaveBeenCalledWith({
                foo: 'bar'
              }, expect.any(Function));
              expect(_store["default"].session.set).not.toHaveBeenCalled();
              expect(_store["default"].local.set).toHaveBeenCalledWith(_store2.STORAGE_KEY, {
                foo: 'bar'
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('properly patches existing values',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var setState, store;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                return cb();
              });

              _store["default"].session.get.mockReturnValueOnce({
                foo: 'baz',
                another: 'value',
                combined: {
                  a: 'b'
                }
              });

              store = new _store2["default"]({
                setState: setState
              });
              _context4.next = 5;
              return store.setState({
                foo: 'bar',
                combined: {
                  c: 'd'
                }
              }, {
                persistence: 'session'
              });

            case 5:
              expect(setState).toHaveBeenCalledWith({
                foo: 'bar',
                combined: {
                  c: 'd'
                }
              }, expect.any(Function));
              expect(_store["default"].session.set).toHaveBeenCalledWith(_store2.STORAGE_KEY, {
                foo: 'bar',
                another: 'value',
                combined: {
                  c: 'd'
                }
              });

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('waits for react to setState',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var cb, setState, store, done;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, inputCb) {
                cb = inputCb;
              });
              store = new _store2["default"]({
                setState: setState
              }); // NOTE: not awaiting here

              done = false;
              store.setState({
                foo: 'bar'
              }).then(function () {
                done = true;
              });
              _context5.next = 6;
              return (0, _flushPromises["default"])();

            case 6:
              expect(setState).toHaveBeenCalledWith({
                foo: 'bar'
              }, expect.any(Function));
              expect(done).toBe(false);
              cb();
              _context5.next = 11;
              return (0, _flushPromises["default"])();

            case 11:
              expect(done).toBe(true);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('returns react.setState result',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var setState, store, result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                return cb('RESULT');
              });
              store = new _store2["default"]({
                setState: setState
              });
              _context6.next = 4;
              return store.setState({
                foo: 'bar'
              });

            case 4:
              result = _context6.sent;
              expect(result).toBe('RESULT');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('allows a callback',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", new Promise(function (resolve) {
                var setState = jest.fn().mockImplementation(function (x, cb) {
                  return cb('RESULT');
                });
                var store = new _store2["default"]({
                  setState: setState
                });
                store.setState({
                  foo: 'bar'
                }, function (result) {
                  expect(result).toBe('RESULT');
                  resolve();
                });
              }));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('allows a patch function and persists its results',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var setState, store, patch;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              setState = jest.fn().mockImplementation(function (x, cb) {
                x('OLD_STATE');
                cb();
              });
              store = new _store2["default"]({
                setState: setState
              });
              patch = jest.fn().mockReturnValue({
                foo: 'bar'
              });
              _context8.next = 5;
              return store.setState(patch, {
                persistence: 'session'
              });

            case 5:
              expect(patch).toHaveBeenCalledWith('OLD_STATE');
              expect(_store["default"].session.set).toHaveBeenCalledWith(_store2.STORAGE_KEY, {
                foo: 'bar'
              });

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
});