// Connect to Binary.js server
var bc = new BinaryClient('ws://localhost:9000');

// Wait for connection to BinaryJS server
bc.on('open', function() {

  function show_source(target) {
    target.slideDown();
  }

  function set_source(f, target) {
    f();
    target.text(f.toString())
  }

  function update(color){
    var stream = bc.send({}, [color.r, color.g, color.b]);
  }

  function input_example() {
    var cw = Raphael.colorwheel($("#input_example .colorwheel")[0], 300, 180);
    cw.input($("#input_example input")[0]);
    cw.onchange(update);
  }

  $(document).ready(function() {
    set_source(input_example, $("#input_example .source"));
  })


});
