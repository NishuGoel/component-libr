"use strict";

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('@storybook/addons');

var createChannel = function createChannel() {
  var channel = {
    emit: jest.fn()
  };

  _addons["default"].getChannel.mockReturnValue(channel);

  return channel;
};

var getChannelData = function getChannelData(channel) {
  return channel.emit.mock.calls[0][1].data.args;
};

describe('Action', function () {
  it('with one argument', function () {
    var channel = createChannel();
    (0, _.action)('test-action')('one');
    expect(getChannelData(channel)[0]).toEqual('one');
  });
  it('with multiple arguments', function () {
    var channel = createChannel();
    (0, _.action)('test-action')('one', 'two', 'three');
    expect(getChannelData(channel)).toEqual(['one', 'two', 'three']);
  });
});
describe('Depth config', function () {
  it('with global depth configuration', function () {
    var channel = createChannel();
    var depth = 1;
    (0, _.configureActions)({
      depth: depth
    });
    (0, _.action)('test-action')({
      root: {
        one: {
          two: 'foo'
        }
      }
    });
    expect(getChannelData(channel)[0]).toEqual({
      root: {
        one: {
          two: 'foo'
        }
      }
    });
  });
  it('per action depth option overrides global config', function () {
    var channel = createChannel();
    (0, _.configureActions)({
      depth: 1
    });
    (0, _.action)('test-action', {
      depth: 3
    })({
      root: {
        one: {
          two: {
            three: {
              four: {
                five: 'foo'
              }
            }
          }
        }
      }
    });
    expect(getChannelData(channel)[0]).toEqual({
      root: {
        one: {
          two: {
            three: {
              four: {
                five: 'foo'
              }
            }
          }
        }
      }
    });
  });
});
describe('allowFunction config', function () {
  it('with global allowFunction false', function () {
    var channel = createChannel();
    var allowFunction = false;
    (0, _.configureActions)({
      allowFunction: allowFunction
    });
    (0, _.action)('test-action')({
      root: {
        one: {
          a: 1,
          b: function b() {
            return 'foo';
          }
        }
      }
    });
    expect(getChannelData(channel)[0]).toEqual({
      root: {
        one: {
          a: 1,
          b: expect.any(Function)
        }
      }
    });
  }); // TODO: this test is pretty pointless, as the real channel isn't used, nothing is changed

  it('with global allowFunction true', function () {
    var channel = createChannel();
    var allowFunction = true;
    (0, _.configureActions)({
      allowFunction: allowFunction
    });
    (0, _.action)('test-action')({
      root: {
        one: {
          a: 1,
          b: function b() {
            return 'foo';
          }
        }
      }
    });
    expect(getChannelData(channel)[0]).toEqual({
      root: {
        one: {
          a: 1,
          b: expect.any(Function)
        }
      }
    });
  });
});