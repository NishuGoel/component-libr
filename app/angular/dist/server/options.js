"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-var-requires
var packageJson = require('../../package.json');
exports.default = {
    packageJson: packageJson,
    frameworkPresets: [
        require.resolve('./framework-preset-angular.js'),
        require.resolve('./framework-preset-angular-cli.js'),
    ],
};
