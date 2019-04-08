/**
 * Main application file
 */

'use strict';

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to MongoDB
_mongoose2.default.connect(_environment2.default.mongo.uri, _environment2.default.mongo.options);
_mongoose2.default.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Setup server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(_environment2.default.port, _environment2.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _environment2.default.port, app.get('env'));
  });
}

(0, _setImmediate3.default)(startServer);

// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
