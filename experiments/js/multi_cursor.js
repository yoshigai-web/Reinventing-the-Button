let btnX = 200, btnY = 400, btnW = 100, btnH = 100;
let btnNum = 5;
let btnInterval = 200;
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
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let x = (mouseX - 100) % btnInterval;
        if (100 < x && x < 200 && btnY < mouseY && mouseY < btnY + btnH) btnPressed = !btnPressed;
    }
}
function drawButton(){
    if (btnPressed) fill(255, 0, 0);
    else fill(255);
    for (let i = 0; i < btnNum; i++)rect(btnX + i * btnInterval, btnY, btnW, btnH);
}
function drawCursor(){
    fill(255);
    ellipse(mouseX, mouseY, 10, 10);
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let x = (mouseX - 100) % btnInterval;
        for (let i = 0; i < btnNum; i++) {
            ellipse(100 + i * btnInterval + x, mouseY, 10, 10);
        }
    }
}