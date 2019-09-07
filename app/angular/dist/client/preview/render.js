"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./angular/helpers");
// add proper types
function render(_a) {
    var storyFn = _a.storyFn, showMain = _a.showMain, forceRender = _a.forceRender;
    showMain();
    helpers_1.renderNgApp(storyFn, forceRender);
}
exports.default = render;
