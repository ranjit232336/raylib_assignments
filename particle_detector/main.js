const sketch = require("./sketch");

function loop() {
  while (sketch.running()) {
    sketch.update();
    sketch.draw();
  }

  sketch.teardown();
}

function main() {
  sketch.setup();

  loop();
}

main();
