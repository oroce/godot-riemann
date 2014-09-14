godot-riemann [![Build Status](https://travis-ci.org/oroce/godot-riemann.svg?branch=v1.1.0)](https://travis-ci.org/oroce/godot-riemann)
=========

Forwards godot events into riemann

## API

~~~
var riemann = require('godot-riemann');
godot.createServer({
  reactors: function(socket) {
     return socket
        .pipe(riemann({
          host: 'localhost',
          port: 5555,
          transport: 'tcp'
        }));
  }
});
~~~

## License

MIT