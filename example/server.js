var ReadWriteStream = require('godot').common.ReadWriteStream;
var Riemann = require('../');

var riemann = Riemann({
  host: 'localhost',
  port: 5555
});

riemann.write({
  host: 'foo.example.org',
  service: 'test',
  state: 'ok'
});
/*var s = new ReadWriteStream();
reactor.createStream(s);
s.write({
  host: 'dummy',
  service: 'yup',
  'meta': {
    'action': 'action'
  }
});

s.write({
  host: 'dummy',
  service: 'yup',
  'meta': {
    'action': 'signup',
    'status': 'failure'
  }
});*/