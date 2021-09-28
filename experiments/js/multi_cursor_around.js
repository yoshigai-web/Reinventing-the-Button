let btnX = 400, btnY = 400, btnW = 70, btnH = 70;
let btnNum = 1;
let btnInterval = 100;
let btnPressed;
let cursorImg;
let cursorNum = 15;
let cursorErrorX = [], cursorErrorY = [];
let sound;
let pressedTime;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
    init();
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10*30)) == 0) sound.play();
    }
    if(btnPressed && millis() - pressedTime > 500){
        btnPressed = false;
    }
}
function mousePressed() {
    // ボタンの上下100ptからカーソルを複数表示する
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        btnPressed = !btnPressed;
        pressedTime = millis();
    }
}
function init() {
    let range = 100;
    for (let i = 0; i < cursorNum; i++) {
        cursorErrorX[i] = int(random(range)) - range / 2;
        cursorErrorY[i] = int(random(range)) - range / 2;
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
    } else {
        init();
    }
}