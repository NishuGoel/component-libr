#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _ws = _interopRequireDefault(require("ws"));

var _standalone = _interopRequireDefault(require("@storybook/core/standalone"));

var _options = _interopRequireDefault(require("./options"));

var _cli = _interopRequireDefault(require("./cli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor(options) {
    this.attachWS = this.attachWS.bind(this);
    this.options = (0, _options.default)(options, this.attachWS);
  }

  start() {
    return (0, _standalone.default)(this.options);
  }

  attachWS(server) {
    this.wsServer = new _ws.default.Server({
      server
    });
    this.wsServer.on('connection', (s, req) => this.handleWS(s, req));
  }

  handleWS(socket, req) {
    if (this.options.manualId) {
      const params = req.url ? _querystring.default.parse(req.url.substr(1)) : {};

      if (params.pairedId) {
        socket.pairedId = params.pairedId; // eslint-disable-line
      }
    }

    socket.on('message', data => {
      this.wsServer.clients.forEach(c => {
        if (!this.options.manualId || socket.pairedId && socket.pairedId === c.pairedId) {
          c.send(data);
        }
      });
    });
  }

}

exports.default = Server;
const server = new Server((0, _cli.default)());
server.start();