"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listCodemods = listCodemods;
exports.runCodemod = runCodemod;
Object.defineProperty(exports, "updateOrganisationName", {
  enumerable: true,
  get: function () {
    return _updateOrganisationName.default;
  }
});
Object.defineProperty(exports, "packageNames", {
  enumerable: true,
  get: function () {
    return _updateOrganisationName.packageNames;
  }
});
Object.defineProperty(exports, "updateAddonInfo", {
  enumerable: true,
  get: function () {
    return _updateAddonInfo.default;
  }
});

var _fs = _interopRequireDefault(require("fs"));

var _globby = _interopRequireDefault(require("globby"));

var _crossSpawn = require("cross-spawn");

var _updateOrganisationName = _interopRequireWildcard(require("./transforms/update-organisation-name"));

var _updateAddonInfo = _interopRequireDefault(require("./transforms/update-addon-info"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/prefer-default-export: "off" */
const TRANSFORM_DIR = `${__dirname}/transforms`;

function listCodemods() {
  return _fs.default.readdirSync(TRANSFORM_DIR).filter(fname => fname.endsWith('.js')).map(fname => fname.slice(0, -3));
}

async function renameFile(file, from, to, {
  logger
}) {
  const newFile = file.replace(from, to);
  logger.log(`Rename: ${file} ${newFile}`);
  return _fs.default.rename(file, newFile);
}

async function runCodemod(codemod, {
  glob,
  logger,
  dryRun,
  rename,
  hasYarn
}) {
  const codemods = listCodemods();

  if (!codemods.includes(codemod)) {
    throw new Error(`Unknown codemod ${codemod}. Run --list for options.`);
  }

  let renameParts = null;

  if (rename) {
    renameParts = rename.split(':');

    if (renameParts.length !== 2) {
      throw new Error(`Codemod rename: expected format "from:to", got "${rename}"`);
    }
  }

  const files = await (0, _globby.default)([glob, '!node_modules', '!dist']);
  logger.log(`=> Applying ${codemod}: ${files.length} files`);

  if (!dryRun) {
    const runner = hasYarn ? 'yarn' : 'npm';
    (0, _crossSpawn.sync)(runner, ['run', 'jscodeshift', '-t', `${TRANSFORM_DIR}/${codemod}.js`, ...files], {
      stdio: 'inherit'
    });
  }

  if (renameParts) {
    const [from, to] = renameParts;
    logger.log(`=> Renaming ${rename}: ${files.length} files`);
    await Promise.all(files.map(file => renameFile(file, new RegExp(`${from}$`), to, {
      logger
    })));
  }
}