'use strict';

var test = require('tap').test;
var Riemann = require('..');
var createClient = require('riemann').createClient;

test('should reuse client', function(t) {
  var r = new Riemann({
    client: true
  });

  t.equal(r.client, true, 'should handle truthy value as client');
  t.end();
});

test('shouldnt listen on error event if there was client', function(t) {
  var client = createClient({});
  var r = new Riemann({
    client: client
  });
  t.equal(r.client._events.error, undefined, 'No listener should be attached');
  client.disconnect();
  t.end();
});

test('should listen on error event if no client was set', function(t) {
  var r = new Riemann();

  t.equal(typeof r.client._events.error, 'function', 'There should a error listener');
  r.client.disconnect();
  t.end();
});

test('fallback to default transport', function(t) {
  var r = new Riemann({
    client: true
  });
  t.equal(r.transport, 'tcp', 'Default transport is tcp');
  t.end();
});

test('should reuse passed transport', function(t) {
  var r = new Riemann({
    client: true,
    transport: 'udp'
  });
  t.equal(r.transport, 'udp', 'Use udp transport');
  t.end();
});

test('Host and port from options', function(t) {
  var r = new Riemann({
    host: 'foo.example.org',
    port: 9999
  });

  t.equal(r.client.udp.options.host, 'foo.example.org', 'Udp host should equal foo.example.org');
  t.equal(r.client.udp.options.port, 9999, 'Udp port should equal 9999');
  t.end();
});

test('should emit reactor:error on error', function(t) {
  var r = new Riemann();

  r.on('reactor:error', function(err) {
    t.ok(err, 'Error should exist');
    r.client.disconnect();
    t.end();
  });

  r.client.emit('error', new Error());

});
