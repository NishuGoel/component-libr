"use strict";

var _decorators = require("./decorators");

describe('Test on functional helpers: memorize', function () {
  it('should memorize the calculated result', function () {
    // given
    var someFn = jest.fn(function (x) {
      return [x];
    });
    var someFnMemo = (0, _decorators.memorize)(someFn); // when

    var resultA = someFnMemo(1);
    var resultB = someFnMemo(2);
    var resultC = someFnMemo(1); // then

    expect(someFn).toHaveBeenCalledTimes(2);
    expect(resultA).toEqual(someFn(1));
    expect(resultA).not.toEqual(resultB);
    expect(resultA).toBe(resultC);
    expect(resultB).not.toEqual(resultC);
  });
  it('should memorize based on the second argument', function () {
    // given
    var someFn = jest.fn(function (x, y) {
      return [x, y];
    });
    var someFnMemo = (0, _decorators.memorize)(someFn, function (x, y) {
      return y;
    }); // when

    var resultA = someFnMemo(1, 2);
    var resultB = someFnMemo(2, 2);
    var resultC = someFnMemo(1, 3); // then

    expect(someFn).toHaveBeenCalledTimes(2);
    expect(resultA).toEqual(someFn(1, 2));
    expect(resultA).toBe(resultB);
    expect(resultA).not.toEqual(resultC);
    expect(resultB).not.toEqual(resultC);
  });
});
describe('Test on functional helpers: singleton', function () {
  it('should make a function singleton', function () {
    // given
    var someFn = jest.fn(function (x, y, z) {
      return [x, y, z];
    });
    var someFnSingleton = (0, _decorators.singleton)(someFn); // when

    var resultA = someFnSingleton(1, 2, 3);
    var resultB = someFnSingleton(4, 5, 6);
    var resultC = someFnSingleton(7, 8, 9); // then

    expect(someFn).toHaveBeenCalledTimes(1);
    expect(resultA).toEqual(someFn(1, 2, 3));
    expect(resultA).toBe(resultB);
    expect(resultA).toBe(resultC);
    expect(resultB).toBe(resultC);
  });
});