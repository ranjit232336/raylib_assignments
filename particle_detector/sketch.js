const r = require("raylib");

const windowW = 500;
const windowH = 400;

function setup(windowW, windowH) {
    r.InitWindow(windowW, windowH, "Moving Detector");
    r.SetTargetFPS(60);
}


function running() {
    return !r.WindowShouldClose();
}


function teardown() {
    r.CloseWindow();
}

let rectX = 0;
const rectY = 0;

let stripW = 20;
let rightMove = true;

function update(windowW) {
    if (rectX + stripW == windowW) rightMove = false;
    if (rectX == 0) rightMove = true;

    if (rightMove) rectX++;
    else rectX--;
}

function draw(rectH) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(rectX, rectY, stripW, rectH, r.WHITE);
    r.EndDrawing();
}


module.exports = {

    setup,
    running,
    teardown,
    update,
    draw,

}
