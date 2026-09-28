const r = require("raylib");

const windowW = 800;
const windowH = 600;

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);

    r.InitWindow(windowW, windowH, "Moving Detector");
    r.SetTargetFPS(60);
}


function running() {
    return !r.WindowShouldClose();
}


function teardown() {
    r.CloseWindow();
}

let scanner1X = 0;
const scanner1Y = 0;
let scanner1W = windowW / 10;


let scanner2X = windowW / 2;
const scanner2Y = 0;
let scanner2W = windowW / 10;


const scanner3X = 0;
let scanner3Y = 0;
let scanner3H = windowH / 10;


let scanner1Velocity = 1;
let scanner2Velocity = 1;
let scanner3Velocity = 1;


const range1W = windowW / 6;
let range1PosX = windowW / 2 - range1W;

const range2PosX = windowW / 2 + windowW / 6;
const range2W = range1W / 5;

const range3PosY = windowH * (3 / 8);
const range3H = windowH * (1 / 15);

function update() {

    let scanner1ReachedBorder = scanner1X + scanner1W > windowW / 2 || scanner1X < 0;
    scanner1Velocity = scanner1ReachedBorder ? -scanner1Velocity : scanner1Velocity;
    scanner1X += scanner1Velocity;

    let scanner2ReachedBorder = scanner2X + scanner2W > windowW || scanner2X < windowW / 2;
    scanner2Velocity = scanner2ReachedBorder ? -scanner2Velocity : scanner2Velocity;
    scanner2X += scanner2Velocity;

    let scanner3ReachedBorder = scanner3Y + scanner3H > windowH || scanner3Y < 0;
    scanner3Velocity = scanner3ReachedBorder ? -scanner3Velocity : scanner3Velocity;
    scanner3Y += scanner3Velocity;

}

function colour(scannerX, scannerW, rangePosX, rangeW) {

    return isOverlap(scannerX, scannerW, rangePosX, rangeW) ? r.RED : r.WHITE;


}

function isOverlap(scannerX, scannerW, rangePosX, rangeW) {

    return ((scannerX >= rangePosX - scannerW && scannerX <= rangePosX + rangeW));



}

function draw() {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(range1PosX, 0, range1W, windowH, r.BLUE);
    r.DrawRectangle(range2PosX, 0, range2W, windowH, r.BLUE);
    r.DrawRectangle(0, range3PosY, windowW, range3H, r.BLUE);

    r.DrawRectangle(scanner1X, scanner1Y, scanner1W, windowH, colour(scanner1X, scanner1W, range1PosX, range1W));
    r.DrawRectangle(scanner2X, scanner2Y, scanner2W, windowH, colour(scanner2X, scanner2W, range2PosX, range2W));
    r.DrawRectangle(scanner3X, scanner3Y, windowW, scanner3H, colour(scanner3Y, scanner3H, range3PosY, range3H));

    r.EndDrawing();
}

module.exports = {

    setup,
    running,
    teardown,
    update,
    draw,

}
