"use strict";

var _notifications = _interopRequireDefault(require("../modules/notifications"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('notifications API', function () {
  it('allows adding notifications', function () {
    var store = {
      getState: function getState() {
        return {
          notifications: []
        };
      },
      setState: jest.fn()
    };

    var _initNotifications = (0, _notifications["default"])({
      store: store
    }),
        api = _initNotifications.api;

    api.addNotification({
      id: '1'
    });
    expect(store.setState).toHaveBeenCalledWith({
      notifications: [{
        id: '1'
      }]
    });
  });
  it('allows removing notifications', function () {
    var store = {
      getState: function getState() {
        return {
          notifications: [{
            id: '1'
          }, {
            id: '2'
          }, {
            id: '3'
          }]
        };
      },
      setState: jest.fn()
    };

    var _initNotifications2 = (0, _notifications["default"])({
      store: store
    }),
        api = _initNotifications2.api;

    api.clearNotification('2');
    expect(store.setState).toHaveBeenCalledWith({
      notifications: [{
        id: '1'
      }, {
        id: '3'
      }]
    });
  });
});