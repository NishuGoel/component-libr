"use strict";

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _global = require("global");

var _versions = _interopRequireDefault(require("../modules/versions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

jest.mock('../version', function () {
  return {
    version: '3.0.0'
  };
});
jest.mock('global', function () {
  return {
    fetch: jest.fn()
  };
});
jest.mock('@storybook/client-logger');

function createMockStore() {
  var state = {
    versions: {
      latest: {},
      current: {}
    }
  };
  return {
    getState: jest.fn().mockImplementation(function () {
      return state;
    }),
    setState: jest.fn().mockImplementation(function (s) {
      state = Object.assign({}, state, {}, s);
    })
  };
}

var makeResponse = function makeResponse(latest, next) {
  var nextVersion = next && {
    next: {
      version: next
    }
  };
  return {
    json: jest.fn(function () {
      return Promise.resolve(Object.assign({
        latest: {
          version: latest
        }
      }, nextVersion));
    })
  };
};

var newResponse = makeResponse('4.0.0', null);
var oldResponse = makeResponse('2.0.0', null);
var prereleaseResponse = makeResponse('3.0.0', '4.0.0-alpha.0');
var patchResponse = makeResponse('3.0.1', '4.0.0-alpha.0');
jest.mock('@storybook/client-logger');
describe('versions API', function () {
  it('sets initial state with current version',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var store, _initVersions, state;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = createMockStore();
            _initVersions = (0, _versions["default"])({
              store: store
            }), state = _initVersions.state;
            expect(state.versions.current).toEqual({
              version: '3.0.0'
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('sets initial state based on persisted versions',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var store, _initVersions2, state;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            store = createMockStore();
            store.setState({
              versions: {
                current: {
                  info: '3-info',
                  version: '3.0.0'
                },
                latest: {
                  version: '4.0.0',
                  info: '4-info'
                }
              }
            });
            _initVersions2 = (0, _versions["default"])({
              store: store
            }), state = _initVersions2.state;
            expect(state.versions).toEqual({
              current: {
                version: '3.0.0',
                info: '3-info'
              },
              latest: {
                version: '4.0.0',
                info: '4-info'
              }
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('sets versions in the init function',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var store, _initVersions3, initialState, init, api;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            store = createMockStore();
            _initVersions3 = (0, _versions["default"])({
              store: store
            }), initialState = _initVersions3.state, init = _initVersions3.init, api = _initVersions3.api;
            store.setState(initialState);
            store.setState.mockReset();

            _global.fetch.mockResolvedValueOnce(newResponse);

            _context3.next = 7;
            return init({
              api: Object.assign({
                addNotification: jest.fn()
              }, api)
            });

          case 7:
            // expect(fetch.mock.calls).toBe(1);
            expect(store.setState).toHaveBeenCalledWith({
              versions: {
                latest: {
                  version: '4.0.0'
                },
                current: {
                  version: '3.0.0'
                }
              },
              lastVersionCheck: expect.any(Number)
            }, {
              persistence: 'permanent'
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('sets a new latest version if old version was cached',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var store, _initVersions4, initialState, init, api;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            store = createMockStore();
            store.setState({
              versions: {
                current: {
                  version: '3.0.0'
                },
                latest: {
                  version: '3.1.0'
                }
              },
              lastVersionCheck: 0
            });
            _initVersions4 = (0, _versions["default"])({
              store: store
            }), initialState = _initVersions4.state, init = _initVersions4.init, api = _initVersions4.api;
            store.setState(initialState);

            _global.fetch.mockResolvedValueOnce(newResponse);

            store.setState.mockReset();
            _context4.next = 8;
            return init({
              api: Object.assign({
                addNotification: jest.fn()
              }, api)
            });

          case 8:
            expect(store.setState).toHaveBeenCalledWith({
              versions: {
                current: {
                  version: '3.0.0'
                },
                latest: {
                  version: '4.0.0'
                }
              },
              lastVersionCheck: expect.any(Number)
            }, {
              persistence: 'permanent'
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('does not set versions if check was recent',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var store, _initVersions5, initialState, init, api;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            store = createMockStore();
            store.setState({
              lastVersionCheck: Date.now()
            });
            _initVersions5 = (0, _versions["default"])({
              store: store
            }), initialState = _initVersions5.state, init = _initVersions5.init, api = _initVersions5.api;
            store.setState(initialState);
            store.setState.mockReset();
            _context5.next = 7;
            return init({
              api: Object.assign({
                addNotification: jest.fn()
              }, api)
            });

          case 7:
            expect(store.setState).not.toHaveBeenCalled();

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('handles failures in the versions function',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var store, _initVersions6, init, api, initialState;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            store = createMockStore();
            _initVersions6 = (0, _versions["default"])({
              store: store
            }), init = _initVersions6.init, api = _initVersions6.api, initialState = _initVersions6.state;
            store.setState(initialState);

            _global.fetch.mockRejectedValueOnce(new Error('fetch failed'));

            _context6.next = 6;
            return init({
              api: Object.assign({
                addNotification: jest.fn()
              }, api)
            });

          case 6:
            expect(store.getState().versions.current).toEqual({
              version: '3.0.0'
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  describe('notifications', function () {
    it('sets an update notification right away in the init function',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var store, _initVersions7, init, api, initialState, addNotification;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              store = createMockStore();
              _initVersions7 = (0, _versions["default"])({
                store: store
              }), init = _initVersions7.init, api = _initVersions7.api, initialState = _initVersions7.state;
              store.setState(initialState);

              _global.fetch.mockResolvedValueOnce(newResponse);

              addNotification = jest.fn();
              _context7.next = 7;
              return init({
                api: Object.assign({
                  addNotification: addNotification
                }, api)
              });

            case 7:
              expect(addNotification).toHaveBeenCalled();

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('does not set an update notification if it has been dismissed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var store, _initVersions8, init, api, initialState, addNotification;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              store = createMockStore();
              store.setState({
                dismissedVersionNotification: '4.0.0'
              });
              _initVersions8 = (0, _versions["default"])({
                store: store
              }), init = _initVersions8.init, api = _initVersions8.api, initialState = _initVersions8.state;
              store.setState(initialState);

              _global.fetch.mockResolvedValueOnce(newResponse);

              addNotification = jest.fn();
              _context8.next = 8;
              return init({
                api: Object.assign({
                  addNotification: addNotification
                }, api)
              });

            case 8:
              expect(addNotification).not.toHaveBeenCalled();

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('does not set an update notification if the latest version is a patch',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var store, _initVersions9, init, api, initialState, addNotification;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              store = createMockStore();
              _initVersions9 = (0, _versions["default"])({
                store: store
              }), init = _initVersions9.init, api = _initVersions9.api, initialState = _initVersions9.state;
              store.setState(initialState);

              _global.fetch.mockResolvedValueOnce(patchResponse);

              addNotification = jest.fn();
              _context9.next = 7;
              return init({
                api: Object.assign({
                  addNotification: addNotification
                }, api)
              });

            case 7:
              expect(addNotification).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('does not set an update notification in production mode',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var store, _initVersions10, init, api, initialState, addNotification;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              store = createMockStore();
              _initVersions10 = (0, _versions["default"])({
                store: store,
                mode: 'production'
              }), init = _initVersions10.init, api = _initVersions10.api, initialState = _initVersions10.state;
              store.setState(initialState);

              _global.fetch.mockResolvedValueOnce(newResponse);

              addNotification = jest.fn();
              _context10.next = 7;
              return init({
                api: Object.assign({
                  addNotification: addNotification
                }, api)
              });

            case 7:
              expect(addNotification).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  it('persists a dismissed notification',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var store, _initVersions11, init, api, initialState, notification, addNotification;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            store = createMockStore();
            _initVersions11 = (0, _versions["default"])({
              store: store
            }), init = _initVersions11.init, api = _initVersions11.api, initialState = _initVersions11.state;
            store.setState(initialState);

            _global.fetch.mockResolvedValueOnce(newResponse);

            addNotification = jest.fn().mockImplementation(function (n) {
              notification = n;
            });
            _context11.next = 7;
            return init({
              api: Object.assign({
                addNotification: addNotification
              }, api)
            });

          case 7:
            notification.onClear();
            expect(store.setState).toHaveBeenCalledWith({
              dismissedVersionNotification: '4.0.0'
            }, {
              persistence: 'permanent'
            });

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('getCurrentVersion works',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    var store, _initVersions12, api, init, initialState;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            store = createMockStore();
            _initVersions12 = (0, _versions["default"])({
              store: store
            }), api = _initVersions12.api, init = _initVersions12.init, initialState = _initVersions12.state;
            store.setState(initialState);

            _global.fetch.mockResolvedValueOnce(newResponse);

            _context12.next = 6;
            return init({
              api: Object.assign({}, api, {
                addNotification: jest.fn()
              })
            });

          case 6:
            expect(api.getCurrentVersion()).toEqual({
              version: '3.0.0'
            });

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('getLatestVersion works',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    var store, _initVersions13, api, init, initialState;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            store = createMockStore();
            _initVersions13 = (0, _versions["default"])({
              store: store
            }), api = _initVersions13.api, init = _initVersions13.init, initialState = _initVersions13.state;
            store.setState(initialState);

            _global.fetch.mockResolvedValueOnce(newResponse);

            _context13.next = 6;
            return init({
              api: Object.assign({}, api, {
                addNotification: jest.fn()
              })
            });

          case 6:
            expect(api.getLatestVersion()).toMatchObject({
              version: '4.0.0'
            });

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  describe('versionUpdateAvailable', function () {
    describe('stable current version', function () {
      it('new latest version',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14() {
        var store, _initVersions14, api, init, initialState;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                store = createMockStore();
                _initVersions14 = (0, _versions["default"])({
                  store: store
                }), api = _initVersions14.api, init = _initVersions14.init, initialState = _initVersions14.state;
                store.setState(initialState);

                _global.fetch.mockResolvedValueOnce(newResponse);

                _context14.next = 6;
                return init({
                  api: Object.assign({}, api, {
                    addNotification: jest.fn()
                  })
                });

              case 6:
                expect(api.versionUpdateAvailable()).toEqual(true);

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      })));
      it('old latest version',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        var store, _initVersions15, api, init, initialState;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                store = createMockStore();
                _initVersions15 = (0, _versions["default"])({
                  store: store
                }), api = _initVersions15.api, init = _initVersions15.init, initialState = _initVersions15.state;
                store.setState(initialState);

                _global.fetch.mockResolvedValueOnce(oldResponse);

                _context15.next = 6;
                return init({
                  api: Object.assign({}, api, {
                    addNotification: jest.fn()
                  })
                });

              case 6:
                expect(api.versionUpdateAvailable()).toEqual(false);

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
      it('new next version',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16() {
        var store, _initVersions16, api, init, initialState;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                store = createMockStore();
                _initVersions16 = (0, _versions["default"])({
                  store: store
                }), api = _initVersions16.api, init = _initVersions16.init, initialState = _initVersions16.state;
                store.setState(initialState);

                _global.fetch.mockResolvedValueOnce(prereleaseResponse);

                _context16.next = 6;
                return init({
                  api: Object.assign({}, api, {
                    addNotification: jest.fn()
                  })
                });

              case 6:
                expect(api.versionUpdateAvailable()).toEqual(false);

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      })));
    });
    describe('prerelease current version', function () {
      it('new latest version',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17() {
        var store, _initVersions17, api, init, initialState;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                store = createMockStore();
                _initVersions17 = (0, _versions["default"])({
                  store: store
                }), api = _initVersions17.api, init = _initVersions17.init, initialState = _initVersions17.state;
                initialState.versions.current.version = '3.1.0-alpha.0';
                store.setState(initialState);

                _global.fetch.mockResolvedValueOnce(newResponse);

                _context17.next = 7;
                return init({
                  api: Object.assign({}, api, {
                    addNotification: jest.fn()
                  })
                });

              case 7:
                expect(api.versionUpdateAvailable()).toEqual(true);

              case 8:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      })));
      it('new next version',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee18() {
        var store, _initVersions18, api, init, initialState;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                store = createMockStore();
                _initVersions18 = (0, _versions["default"])({
                  store: store
                }), api = _initVersions18.api, init = _initVersions18.init, initialState = _initVersions18.state;
                initialState.versions.current.version = '3.1.0-alpha.0';
                store.setState(initialState);

                _global.fetch.mockResolvedValueOnce(prereleaseResponse);

                _context18.next = 7;
                return init({
                  api: Object.assign({}, api, {
                    addNotification: jest.fn()
                  })
                });

              case 7:
                expect(api.versionUpdateAvailable()).toEqual(true);

              case 8:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      })));
    });
  });
});