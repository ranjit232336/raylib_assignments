const r = require("raylib");



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

const particlePosX = 120;
const particlePosY = 0;
const particleW = 50;


function colour() {
    if (rectX >= particlePosX - stripW && rectX <= particlePosX + particleW) return r.RED;
    else return r.WHITE;

}

function draw(rectH) {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(particlePosX, particlePosY, particleW, rectH, r.BLUE);
    r.DrawRectangle(rectX, rectY, stripW, rectH, colour());

    r.EndDrawing();
}


module.exports = {

    setup,
    running,
    teardown,
    update,
    draw,

}
