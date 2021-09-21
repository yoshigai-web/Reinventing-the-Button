let btnX = 200, btnY = 400, btnW = 100, btnH = 100;
let btnNum = 5;
let btnInterval = 170;
let btnPressed;
function setup() {
    createCanvas(1200, 800);
    noCursor();
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
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
    else fill(255);
    for (let i = 0; i < btnNum; i++)rect(btnX + i * btnInterval, btnY, btnW, btnH);
}
function drawCursor() {
    fill(255);
    ellipse(mouseX, mouseY, 10, 10);
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let x = (mouseX - btnX) % btnInterval;
        for (let i = -1; i <= btnNum; i++) {
            ellipse(btnX + i * btnInterval + x, mouseY, 10, 10);
        }
    }
}