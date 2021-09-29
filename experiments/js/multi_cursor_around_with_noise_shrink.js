let btnX = 400, btnY = 400, btnW = 150, btnH = 150;
let btnNum = 1;
let btnInterval = 100;
let btnPressed;
let cursorImg;
let cursorNum = 10;
let cursorErrorX = [], cursorErrorY = [];
let sound;
let noiseSeed = 0.0;
let pressedTime;
let pressedCursorNum;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
    pressedCursorNum = int(random(cursorNum));
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10 * 30)) == 0) sound.play();
    }
    if (btnPressed && millis() - pressedTime > 500) {
        btnPressed = false;
        pressedCursorNum = int(random(cursorNum));
    }
}
function mousePressed() {
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        btnPressed = !btnPressed;
        pressedTime = millis();
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if (btnX - 100 < mouseX && mouseX < btnX + btnW + 100 && btnY - 100 < mouseY && mouseY < btnY + btnH + 100) fill(255, 100, 100, 100);
    else fill(255);
    for (let i = 0; i < btnNum; i++)rect(btnX + i * btnInterval, btnY, btnW, btnH);
}
function drawCursor() {
    if (btnX - 100 < mouseX && mouseX < btnX + btnW + 100 && btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        for (let i = 0; i < cursorNum; i++) {
            if (i < pressedCursorNum && btnPressed && millis() - pressedTime < 500) image(cursorImg, mouseX + cursorErrorX[i] + 4, mouseY + cursorErrorY[i] + 4, 286 * 0.04, 429 * 0.04);
            else image(cursorImg, mouseX + cursorErrorX[i], mouseY + cursorErrorY[i], 286 * 0.08, 429 * 0.08);
        }
    } else {
        // draw my cursor
        image(cursorImg, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
    }
}
function mouseMoved() {
    noiseSeed += 0.01;
    let range = 200;
    for (let i = 0; i < cursorNum; i++) {
        cursorErrorX[i] = noise((noiseSeed + i * 3)) * range - range / 2;
        cursorErrorY[i] = noise((noiseSeed + i * 3 + 1)) * range - range / 2;
    }
}