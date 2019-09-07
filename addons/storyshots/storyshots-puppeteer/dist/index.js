"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageSnapshot = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _jestImageSnapshot = require("jest-image-snapshot");

var _nodeLogger = require("@storybook/node-logger");

var _url = require("./url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

expect.extend({
  toMatchImageSnapshot: _jestImageSnapshot.toMatchImageSnapshot
}); // We consider taking the full page is a reasonnable default.

const defaultScreenshotOptions = () => ({
  fullPage: true
});

const noop = () => {};

const asyncNoop = async () => {};

const defaultConfig = {
  storybookUrl: 'http://localhost:6006',
  chromeExecutablePath: undefined,
  getMatchOptions: noop,
  getScreenshotOptions: defaultScreenshotOptions,
  beforeScreenshot: noop,
  getGotoOptions: noop,
  customizePage: asyncNoop,
  getCustomBrowser: undefined
};

const imageSnapshot = (customConfig = {}) => {
  const {
    storybookUrl,
    chromeExecutablePath,
    getMatchOptions,
    getScreenshotOptions,
    beforeScreenshot,
    getGotoOptions,
    customizePage,
    getCustomBrowser
  } = _objectSpread({}, defaultConfig, {}, customConfig);

  let browser; // holds ref to browser. (ie. Chrome)

  let page; // Hold ref to the page to screenshot.

  const testFn = async ({
    context
  }) => {
    const {
      kind,
      framework,
      name
    } = context;

    if (framework === 'rn') {
      // Skip tests since we de not support RN image snapshots.
      _nodeLogger.logger.error("It seems you are running imageSnapshot on RN app and it's not supported. Skipping test.");

      return;
    }

    const url = (0, _url.constructUrl)(storybookUrl, kind, name);

    if (!browser || !page) {
      _nodeLogger.logger.error(`Error when generating image snapshot for test ${kind} - ${name} : It seems the headless browser is not running.`);

      throw new Error('no-headless-browser-running');
    }

    expect.assertions(1);
    let image;

    try {
      await customizePage(page);
      await page.goto(url, getGotoOptions({
        context,
        url
      }));
      await beforeScreenshot(page, {
        context,
        url
      });
      image = await page.screenshot(getScreenshotOptions({
        context,
        url
      }));
    } catch (e) {
      _nodeLogger.logger.error(`Error when connecting to ${url}, did you start or build the storybook first? A storybook instance should be running or a static version should be built when using image snapshot feature.`, e);

      throw e;
    }

    expect(image).toMatchImageSnapshot(getMatchOptions({
      context,
      url
    }));
  };

  testFn.afterAll = () => {
    if (getCustomBrowser && page) {
      return page.close();
    }

    return browser.close();
  };

  testFn.beforeAll = async () => {
    if (getCustomBrowser) {
      browser = await getCustomBrowser();
    } else {
      // add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
      browser = await _puppeteer.default.launch({
        args: ['--no-sandbox ', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        executablePath: chromeExecutablePath
      });
    }

    page = await browser.newPage();
  };

  return testFn;
};

exports.imageSnapshot = imageSnapshot;