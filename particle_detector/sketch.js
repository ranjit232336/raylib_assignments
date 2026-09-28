const r = require("raylib");
const s1 = require("./s1.js");
const s2 = require("./s2.js");
const s3 = require("./s3.js");

const windowW = 900;
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

s1.scanner1W = windowW / 10;
s2.scanner2X = windowW / 2;
s2.scanner2W = windowW / 10;
s3.scanner3H = windowH / 10;

let scanner1Velocity = 1;
let scanner2Velocity = 1;
let scanner3Velocity = 1;

const range1W = windowW / 6;
let range1PosX = windowW / 2 - range1W;

const range2PosX = windowW / 2 + windowW / 6;
const range2W = range1W / 5;

const range3PosY = windowH * (3 / 8);
const range3H = windowH * (1 / 15);

function scannerOutOfBound(scannerX, scannerStart, scannerEnd, scannerW) {
  return scannerX + scannerW > scannerEnd || scannerX < scannerStart;
}
function scannerVelocity(sOutOfBound, scannerVelocity) {
  return sOutOfBound ? -scannerVelocity : scannerVelocity;
}

function update() {
  s1OutofBound = scannerOutOfBound(s1.scanner1X, 0, windowW / 2, s1.scanner1W);
  scanner1Velocity = scannerVelocity(s1OutofBound, scanner1Velocity);
  s1.scanner1X += scanner1Velocity;

  s2OutofBound = scannerOutOfBound(
    s2.scanner2X,
    windowW / 2,
    windowW,
    s2.scanner2W,
  );
  scanner2Velocity = scannerVelocity(s2OutofBound, scanner2Velocity);
  s2.scanner2X += scanner2Velocity;

  s3OutofBound = scannerOutOfBound(s3.scanner3Y, 0, windowH, s3.scanner3H);
  scanner3Velocity = scannerVelocity(s3OutofBound, scanner3Velocity);
  s3.scanner3Y += scanner3Velocity;
}

function chooseColour(scannerX, scannerW, rangePosX, rangeW) {
  return isOverlapping(scannerX, scannerW, rangePosX, rangeW) ? r.RED : r.WHITE;
}

function isOverlapping(scannerX, scannerW, rangePosX, rangeW) {
  return scannerX >= rangePosX - scannerW && scannerX <= rangePosX + rangeW;
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  r.DrawRectangle(range1PosX, 0, range1W, windowH, r.BLUE);
  r.DrawRectangle(range2PosX, 0, range2W, windowH, r.BLUE);
  r.DrawRectangle(0, range3PosY, windowW, range3H, r.BLUE);

  r.DrawRectangle(
    s1.scanner1X,
    s1.scanner1Y,
    s1.scanner1W,
    windowH,
    chooseColour(s1.scanner1X, s1.scanner1W, range1PosX, range1W),
  );
  r.DrawRectangle(
    s2.scanner2X,
    s2.scanner2Y,
    s2.scanner2W,
    windowH,
    chooseColour(s2.scanner2X, s2.scanner2W, range2PosX, range2W),
  );
  r.DrawRectangle(
    s3.scanner3X,
    s3.scanner3Y,
    windowW,
    s3.scanner3H,
    chooseColour(s3.scanner3Y, s3.scanner3H, range3PosY, range3H),
  );

  r.EndDrawing();
}

module.exports = {
  setup,
  running,
  teardown,
  update,
  draw,
};
