"use strict";

var _global = require("global");

var _riot = require("riot");

var _riotCompiler = _interopRequireDefault(require("riot-compiler"));

var _rendering = require("./rendering");

var _compileStageFunctions = require("./compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootElement = _global.document.createElement('div');

rootElement.id = 'root';
_global.document.body = _global.document.createElement('body');

_global.document.body.appendChild(rootElement);

var context = {
  unregister: _riot.unregister,
  compiler: _riotCompiler["default"],
  tag2: _riot.tag2,
  mount: _riot.mount
};
beforeEach(function () {
  (0, _riot.unregister)('#root');
  rootElement.dataset.is = 'root';
});
describe('render a riot element', function () {
  it('should not work with nothing', function () {
    expect((0, _rendering.render)(null, context)).toBe(false);
    expect(rootElement.innerHTML).toEqual('');
  });
  it('can work with some text', function () {
    expect((0, _rendering.render)({
      tags: ['<div><p>some tests</p></div>']
    }, context)).toBe(true);
    expect(rootElement.innerHTML).toEqual('<div><p>some tests</p></div>');
  });
  it('can work with raw code', function () {
    expect((0, _rendering.render)("riot.tag2('root', '<div>raw code</div>', '', '', () => {})", context)).toBe(true);
    expect(rootElement.innerHTML).toEqual('<div>raw code</div>');
  });
  it('can work with compiled code', function () {
    expect((0, _rendering.render)([{}], context)).toBe(true); // does only work in true mode, and not in jest mode
  });
  it('will be possible to compile a template before rendering it', function () {
    var compiledTemplate = (0, _compileStageFunctions.asCompiledCode)('<template><div>raw code</div></template>');
    expect(compiledTemplate).toEqual("tag2('template', '<div>raw code</div>', '', '', function(opts) {\n});");
  });
  it('works with a json consisting in a tagName and opts', function () {
    (0, _riot.tag2)('hello', '<p>Hello { opts.suffix }</p>', '', '', function () {});
    expect((0, _rendering.render)({
      tagName: 'hello',
      opts: {
        suffix: 'World'
      }
    }, context)).toBe(true);
    expect(rootElement.innerHTML).toEqual('<p>Hello World</p>');
  });
  it('can nest several tags', function () {
    expect((0, _rendering.render)({
      tags: ['<Tag1><div>Inside tag1:<ul><li><Tag2><yield/></Tag2></li></ul></div></Tag1>', '<Tag2><div>Inside tag2:<ul><li><Tag3><yield/></Tag3></li></ul></div></Tag2>', '<Tag3><div>Inside tag3:<ul><li><Tag4><yield/></Tag4></li></ul></div></Tag3>', '<Tag4><div>Inside tag4:<ul><li><Tag5><yield/></Tag5></li></ul></div></Tag4>', '<Tag5><div>Inside tag5:<ul><li><yield/></li></ul></div></Tag5>'],
      template: '<Matriochka><div><Tag1>Content</Tag1></div></Matriochka>'
    }, context)).toBe(true);
    expect(rootElement.innerHTML).toMatchSnapshot();
  });
  it('can template some vars', function () {
    expect((0, _rendering.render)({
      tags: [{
        content: "<SimpleTest><div>simple test ({opts.test || 'without parameter'}). Oh, by the way ({opts.riotValue || '... well, nothing'})</div></SimpleTest>",
        boundAs: 'mustBeUniquePlease'
      }],
      template: '<SimpleTest test={ "with a parameter" } value={"value is mapped to riotValue"}></SimpleTest>'
    }, context)).toBe(true);
    expect(rootElement.innerHTML).toMatchSnapshot();
  });
  it('can accept a constructor', function () {
    expect((0, _rendering.render)({
      tags: [{
        content: "<SimpleTest><div>HACKED : {opts.hacked} ; simple test ({opts.test || 'without parameter'}). Oh, by the way ({opts.riotValue || '... well, nothing'})</div></SimpleTest>",
        boundAs: 'mustBeUniquePlease'
      }],
      template: '<SimpleTest hacked={hacked} test={ "with a parameter" } value={"value is mapped to riotValue"}></SimpleTest>',
      tagConstructor: function tagConstructor() {
        this.hacked = true;
      }
    }, context)).toBe(true);
    expect(rootElement.innerHTML).toMatchSnapshot();
  });
});