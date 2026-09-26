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

let stripX = 0;
const stripY = 0;

let stripW = 25;
let rightMove = true;

function update(windowW) {
    if (stripX + stripW == windowW) rightMove = false;
    if (stripX == 0) rightMove = true;

    if (rightMove) stripX++;
    else stripX--;
}

const range1PosX = 120;
const range1PosY = 0;
const range1W = 50;



const range2PosX = 300;
const range2PosY = 0;
const range2W = 10;

function isOverlap() {

    if ((stripX >= range1PosX - stripW && stripX <= range1PosX + range1W) ||
        stripX >= range2PosX - stripW && stripX <= range2PosX + range2W
    ) return true;

    else return false;

}


function colour() {

    if (isOverlap())
        return r.RED;

    else return r.WHITE;

}

function draw(rectH) {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(range1PosX, range1PosY, range1W, rectH, r.BLUE);
    r.DrawRectangle(range2PosX, range2PosY, range2W, rectH, r.BLUE);

    r.DrawRectangle(stripX, stripY, stripW, rectH, colour());

    r.EndDrawing();
}


module.exports = {

    setup,
    running,
    teardown,
    update,
    draw,

}
