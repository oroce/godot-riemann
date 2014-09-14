'use strict';

var test = require('tap').test;
var Riemann = require('..');
var createClient = require('riemann').createClient;

test('write should call event', function(t) {
  var client = createClient();
  // prevent write after end errors because on disconnect
  client.on('error', function() {});
  var r = new Riemann({
    client: client
  });
  var Event = client.Event;
  client.Event = function(data) {
    client.disconnect();
    t.equal(data.service, 'foo', 'Should pass the data');
    t.end();
    return Event.apply(null, arguments);
  };

  r.write({
    service: 'foo'
  });
});


test('send and transport set', function(t) {
  var client = createClient();
  // prevent write after end errors because on disconnect
  client.on('error', function() {});
  var r = new Riemann({
    client: client
  });
  client.send = function(data) {
    client.disconnect();
    t.ok(data, 'send has been called');
    t.end();
  };

  r.write({
    service: 'foo'
  });
});

test('should emit data', function(t) {
  var r = new Riemann();
  r.on('data', function(data) {
    t.equal(data.service, 'foo', 'Data should be emitted');
    r.client.disconnect();
    t.end();
  });
  r.write({
    service: 'foo'
  });
});
