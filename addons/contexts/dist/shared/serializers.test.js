"use strict";

var _serializers = require("./serializers");

describe('Test on serializers', function () {
  // given
  var someContextsQueryParam = 'CSS Themes=Forests,Languages=Fr';
  var someSelectionState = {
    'CSS Themes': 'Forests',
    Languages: 'Fr'
  };
  it('Should deserialize a string representation into the represented selection state', function () {
    expect((0, _serializers.deserialize)('')).toEqual(null);
    expect((0, _serializers.deserialize)('An invalid string=')).toEqual(null);
    expect((0, _serializers.deserialize)(someContextsQueryParam)).toEqual(someSelectionState);
  });
  it('Should serialize selection state into its string representation', function () {
    expect((0, _serializers.serialize)(null)).toEqual(null);
    expect((0, _serializers.serialize)(someSelectionState)).toEqual(someContextsQueryParam);
  });
});