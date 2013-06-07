var ecstatic = require('ecstatic'),
  flatiron = require('flatiron'),
  path = require('path'),
  app = flatiron.app,
  BinaryServer = require('binaryjs').BinaryServer,
  fs = require('fs'),
  stream = BinaryServer({
    port: 9000
  }),
  five = require("johnny-five"),
  board = new five.Board(),
  colors;

app.use( flatiron.plugins.http, {
  before: [
    ecstatic( __dirname + '/public/' )
  ]
});

app.listen( 8422, function () {
  console.log( 'http:// 8422 listening' );
});

// invert the brightness output
var trueBrightness = function ( n ){
  var b;

  if ( n < 255 ) {
    b = 255 - n;
  }

  return b;
}

// client connects
stream.on( 'connection', function ( client ) {

  client.on( 'stream', function ( stream, rgb ) {

    if ( colors !== undefined ) {
      colors.r.brightness( trueBrightness ( rgb[0] ) );
      colors.g.brightness( trueBrightness ( rgb[1] ) );
      colors.b.brightness( trueBrightness ( rgb[2] ) );
    }

  });

});

board.on( "ready", function () {

  //http://www.adafruit.com/blog/2012/11/30/tutorial-arduino-lesson-3-rgb-leds-arduino/

  colors = {
    r: new five.Led(11),
    g: new five.Led(10),
    b: new five.Led(9)
  }

});