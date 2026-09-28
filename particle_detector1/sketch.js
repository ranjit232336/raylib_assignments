const r = require("raylib");

const windowW = 900;
const windowH = 600;

function setup() {
    r.InitWindow(windowW, windowH, "Moving Detector");
    r.SetTargetFPS(60);
}


function running() {
    return !r.WindowShouldClose();
}


function teardown() {
    r.CloseWindow();
}

let strip1X = 0;
const strip1Y = 0;
let strip1W = windowW / 10;
let strip1RightMove = true;


let strip2X = windowW / 2;
const strip2Y = 0;
let strip2W = windowW / 10;
let strip2RightMove = true;

const strip3X = 0;
let strip3Y = 0;
let strip3H = windowH / 10;
let strip3DownMove = true;



function update() {
    if (strip1X + strip1W >= windowW / 2) strip1RightMove = false;
    if (strip1X <= 0) strip1RightMove = true;

    if (strip1RightMove) strip1X++;
    else strip1X--;

    if (strip2X + strip2W >= windowW) strip2RightMove = false;
    if (strip2X <= windowW / 2) strip2RightMove = true;

    if (strip2RightMove) strip2X += 2;
    else strip2X -= 2;

    if (strip3Y + strip3H >= windowH) strip3DownMove = false;
    if (strip3Y <= 0) strip3DownMove = true;

    if (strip3DownMove) strip3Y++;
    else strip3Y--;
}

// const range1PosY = 0;


function range1Pos(windowW) {
    range1PosX = windowW / 2;
}

function range2Pos(windowW) {
    range2PosX = windowW / 2 + range1W;
}

const range1W = windowW / 6;

let range1PosX = windowW / 2 - range1W;

const range2PosX = windowW / 2 + windowW / 6;
// const range2PosY = 0;
const range2W = range1W / 5;


const range3PosY = windowH * (3 / 8);
// const strip3Y = 0;
const range3H = windowH * (1 / 15);
// let strip3RightMove = true;

function isOverlap1() {

    if ((strip1X >= range1PosX - strip1W && strip1X <= range1PosX + range1W)

    ) return true;

    else return false;

}

function isOverlap2() {

    if ((strip2X >= range2PosX - strip2W && strip2X <= range2PosX + range2W)

    ) return true;

    else return false;

}

function isOverlap3() {

    if ((strip3Y >= range3PosY - strip3H && strip3Y <= range3PosY + range3H)

    ) return true;

    else return false;

}



function colour1() {

    if (isOverlap1())
        return r.RED;

    else return r.WHITE;

}
function colour2() {

    if (isOverlap2())
        return r.RED;

    else return r.WHITE;

}

function colour3() {

    if (isOverlap3())
        return r.RED;

    else return r.WHITE;

}

function draw() {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(range1PosX, 0, range1W, windowH, r.BLUE);
    r.DrawRectangle(range2PosX, 0, range2W, windowH, r.BLUE);
    r.DrawRectangle(0, range3PosY, windowW, range3H, r.BLUE);

    r.DrawRectangle(strip1X, strip1Y, strip1W, windowH, colour1());
    r.DrawRectangle(strip2X, strip2Y, strip2W, windowH, colour2());
    r.DrawRectangle(strip3X, strip3Y, windowW, strip3H, colour3());

    r.EndDrawing();
}


module.exports = {

    setup,
    running,
    teardown,
    update,
    draw,
    range1Pos,
    range2Pos

}
