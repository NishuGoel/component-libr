"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

var _global = require("global");

var _url = require("./url");

jest.mock('global', function () {
  return {
    history: {
      replaceState: jest.fn()
    },
    document: {
      location: {
        pathname: 'pathname',
        search: ''
      }
    }
  };
});
describe('url', function () {
  describe('pathToId', function () {
    it('should parse valid ids', function () {
      expect((0, _url.pathToId)('/story/story--id')).toEqual('story--id');
    });
    it('should error on invalid ids', function () {
      [null, '', '/whatever/story/story--id'].forEach(function (path) {
        expect(function () {
          return (0, _url.pathToId)(path);
        }).toThrow(/Invalid/);
      });
    });
  });
  describe('setPath', function () {
    it('should navigate to storyId', function () {
      (0, _url.setPath)({
        storyId: 'story--id'
      });
      expect(_global.history.replaceState).toHaveBeenCalledWith({}, '', 'pathname?id=story--id');
    });
    it('should replace legacy parameters but preserve others', function () {
      _global.document.location.search = 'foo=bar&selectedStory=selStory&selectedKind=selKind';
      (0, _url.setPath)({
        storyId: 'story--id'
      });
      expect(_global.history.replaceState).toHaveBeenCalledWith({}, '', 'pathname?foo=bar&id=story--id');
    });
  });
  describe('getIdFromLegacyQuery', function () {
    it('should parse story paths', function () {
      expect((0, _url.getIdFromLegacyQuery)({
        path: '/story/story--id'
      })).toBe('story--id');
    });
    it('should parse legacy queries', function () {
      expect((0, _url.getIdFromLegacyQuery)({
        path: null,
        selectedKind: 'kind',
        selectedStory: 'story'
      })).toBe('kind--story');
    });
    it('should not parse non-queries', function () {
      expect((0, _url.getIdFromLegacyQuery)({})).toBeUndefined();
    });
  });
  describe('parseQueryParameters', function () {
    it('should parse id', function () {
      expect((0, _url.parseQueryParameters)('?foo=bar&id=story--id')).toBe('story--id');
    });
    it('should not parse non-ids', function () {
      expect((0, _url.parseQueryParameters)('')).toBeUndefined();
    });
  });
  describe('initializePath', function () {
    it('should handle id queries', function () {
      _global.document.location.search = '?id=story--id';
      expect((0, _url.initializePath)()).toEqual({
        storyId: 'story--id'
      });
      expect(_global.history.replaceState).not.toHaveBeenCalled();
    });
    it('should redirect legacy queries', function () {
      _global.document.location.search = '?selectedKind=kind&selectedStory=story';
      expect((0, _url.initializePath)()).toEqual({
        storyId: 'kind--story'
      });
      expect(_global.history.replaceState).toHaveBeenCalledWith({}, '', 'pathname?id=kind--story');
    });
  });
});