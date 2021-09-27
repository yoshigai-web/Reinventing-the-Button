let btnX = 400, btnY = 400, btnW = 70, btnH = 70;
let btnNum = 1;
let btnInterval = 100;
let btnPressed;
let cursorImg;
let cursorNum = 20;
let cursorErrorX = [], cursorErrorY = [];
let sound;
let noiseSeed = 0.0;

function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10)) == 0) sound.play();
        btnPressed = false;
    }
}
function mousePressed() {
    // ボタンの上下100ptからカーソルを複数表示する
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let relativeMouseX = (mouseX - btnX) % btnInterval;
        if (relativeMouseX < btnW && btnY < mouseY && mouseY < btnY + btnH) btnPressed = !btnPressed;
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if (btnX - 100 < mouseX && mouseX < btnX + btnW + 100 && btnY - 100 < mouseY && mouseY < btnY + btnH + 100) fill(255, 100, 100, 100);
    else fill(255);
    for (let i = 0; i < btnNum; i++)rect(btnX + i * btnInterval, btnY, btnW, btnH);
}
function drawCursor() {
    image(cursorImg, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
    if (btnX - 100 < mouseX && mouseX < btnX + btnW + 100 && btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        for (let i = 0; i < cursorNum; i++) {
            image(cursorImg, mouseX + cursorErrorX[i], mouseY + cursorErrorY[i], 286 * 0.08, 429 * 0.08);
        }
    }
}
function mouseMoved() {
    noiseSeed += 0.01;
    let range = 150;
    for (let i = 0; i < cursorNum; i++) {
        cursorErrorX[i] = noise((noiseSeed + i * 3)) * range - range / 2;
        cursorErrorY[i] = noise((noiseSeed + i * 3 + 1)) * range - range / 2;
    }
}