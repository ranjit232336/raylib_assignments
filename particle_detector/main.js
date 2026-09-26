const sketch = require("./sketch");

const windowW = 500;
const windowH = 400;

function loop() {

    while (sketch.running()) {
        sketch.update(windowW);
        sketch.draw(windowH);

    }

    sketch.teardown();

}

function main() {

    sketch.setup(windowW, windowH);
    loop();

}

main();

