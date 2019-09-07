"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;

var _readAsObject = require("./dependencies-lookup/readAsObject");

var _getRidOfUselessFilePrefixes = require("./dependencies-lookup/getRidOfUselessFilePrefixes");

function transform(inputSource) {
  return (0, _readAsObject.readStory)(this, inputSource).then(_getRidOfUselessFilePrefixes.getRidOfUselessFilePrefixes).then(({
    prefix,
    resource,
    source,
    sourceJson,
    addsMap,
    dependencies,
    localDependencies,
    idsToFrameworks
  }) => `
  var withSourceLoader = require('@storybook/source-loader/dist/preview').withSource;
  var __SOURCE_PREFIX__ = "${prefix.replace(/\\([^\\ ])/g, '\\\\$1')}";
  var __STORY__ = ${sourceJson};
  var __ADDS_MAP__ = ${JSON.stringify(addsMap)};
  var __MAIN_FILE_LOCATION__ = ${JSON.stringify(resource)};
  var __MODULE_DEPENDENCIES__ = ${JSON.stringify(dependencies)};
  var __LOCAL_DEPENDENCIES__ = ${JSON.stringify(localDependencies)};
  var __IDS_TO_FRAMEWORKS__ = ${JSON.stringify(idsToFrameworks)};

  ${source}
  `);
}