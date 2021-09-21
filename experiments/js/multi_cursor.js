let btnX = 200, btnY = 400, btnW = 100, btnH = 100;
let btnNum = 5;
let btnInterval = 150;
let btnPressed;
let cursorImg;
let sound;
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
        if(int(random(10))==0)sound.play();
        btnPressed = false;
    }
}
function mousePressed() {
    // ボタンの上下100ptからカーソルを複数表示する
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let x = (mouseX - btnX) % btnInterval;
        if (x < btnW && btnY < mouseY && mouseY < btnY + btnH) btnPressed = !btnPressed;
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if ((mouseX - btnX) % btnInterval < btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 100);
    else fill(255);
    for (let i = 0; i < btnNum; i++)rect(btnX + i * btnInterval, btnY, btnW, btnH);
}
function drawCursor() {
    image(cursorImg, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let x = (mouseX - btnX) % btnInterval;
        for (let i = -1; i <= btnNum; i++) {
            image(cursorImg, btnX + i * btnInterval + x, mouseY, 286 * 0.08, 429 * 0.08);
        }
    }
}