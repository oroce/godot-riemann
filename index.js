'use strict';

var util = require('util');
var riemann = require('riemann');
var ReadWriteStream = require('godot').common.ReadWriteStream;

var Riemann = module.exports = function Riemann(options) {
  if (!(this instanceof Riemann)) {
    return new Riemann(options);
  }

  options = options || {};
  ReadWriteStream.call(this);

  this.options = options;

  this.transport = options.transport || 'tcp';

  var client = options.client;

  if (!client) {
    client = riemann.createClient({
      host: options.host,
      port: options.port
    });
    client.on('error', function(err) {
      this.emit('reactor:error', err);
    }.bind(this));
  }
  this.client  = client;
};

util.inherits(Riemann, ReadWriteStream);

Riemann.prototype.write = function (data) {
  var transport = this.client[this.transport];

  /*eslint-disable new-cap*/
  var evt = this.client.Event(data);
  /*eslint-enable new-cap*/

  this.client.send(evt, transport);

  this.emit('data', data);
};
