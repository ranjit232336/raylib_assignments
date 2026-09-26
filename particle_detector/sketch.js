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

let stripW = 25;
let rightMove = true;

function update(windowW) {
    if (rectX + stripW == windowW) rightMove = false;
    if (rectX == 0) rightMove = true;

    if (rightMove) rectX++;
    else rectX--;
}

const range1PosX = 120;
const range1PosY = 0;
const range1W = 50;



const range2PosX = 300;
const range2PosY = 0;
const range2W = 10;


function colour() {

    if ((rectX >= range1PosX - stripW && rectX <= range1PosX + range1W) ||
        rectX >= range2PosX - stripW && rectX <= range2PosX + range2W
    )
        return r.RED;

    else return r.WHITE;

}

function draw(rectH) {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(range1PosX, range1PosY, range1W, rectH, r.BLUE);
    r.DrawRectangle(range2PosX, range2PosY, range2W, rectH, r.BLUE);

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
