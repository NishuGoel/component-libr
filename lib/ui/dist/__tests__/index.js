"use strict";

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Main API', function () {
  it('should fail if provider is not extended from the base Provider', function () {
    var run = function run() {
      var fakeProvider = {};
      (0, _["default"])(null, fakeProvider);
    };

    expect(run).toThrow(/base Provider/);
  });
});