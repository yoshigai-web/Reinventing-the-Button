let btnX = 100, btnY = 200, btnW = 100, btnH = 100, btnInterval = 200;
let btnNum = 5;
let btnPressed = [];
let myBtn;
let pressedTime;
let waitTime = [];
let delayTime = 1000;;
let maxTime = 1500;
let img;
function setup() {
    createCanvas(1200, 800);
    init();
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    noCursor();
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    makeBtnPressed();
    checkFinished();
    image(img, mouseX, mouseY, 286 * 0.08, 429 * 0.08); // draw my cursor
}
function mousePressed() {
    if (!btnPressed.includes(false)) {  // if all buttons are pressed
        init();
        return;
    }
    // check button pressed
    for (let i = 0; i < btnNum; i++) {
        if (btnX + i * btnInterval < mouseX && mouseX < btnX + i * btnInterval + btnW && btnY < mouseY && mouseY < btnY + btnH && myBtn == i) {
            btnPressed[i] = !btnPressed[i];
        }
    }
}
function keyPressed() {
    init();
}
function init() {
    for (let i = 0; i < btnNum; i++) btnPressed[i] = false;
    for (let i = 0; i < btnNum; i++) waitTime[i] = Math.floor(Math.random() * maxTime) + delayTime;
    pressedTime = millis();
    myBtn = int(random(btnNum));
    // btnPressed[myBtn] = !btnPressed[myBtn];
}
function drawButton() {
    for (let i = 0; i < btnNum; i++) {
        if (btnPressed[i]) {    // already pressed
            fill(255, 0, 0);
        } else if (btnX + i * btnInterval < mouseX && mouseX < btnX + i * btnInterval + btnW && btnY < mouseY && mouseY < btnY + btnH) {    // hover
            fill(255, 0, 0, 100);
        } else {    // nothing
            fill(255);
        }
        rect(btnX + i * btnInterval, btnY, btnW, btnH, 10);
    }
}
function drawCursor() {
    let passedTime = millis() - pressedTime;
    for (let i = 0; i < btnNum; i++) {
        // moving
        if (!btnPressed[i] && myBtn != i) {
            let cursorX = btnX + i * btnInterval + noise(i) * btnW;
            let cursorY = btnY + noise(i) * btnH + waitTime[i] - passedTime;
            image(img, cursorX, cursorY, 286 * 0.08, 429 * 0.08);
        }
        // last position
        if (btnPressed[i] && myBtn != i) {
            image(img, btnX + i * btnInterval + noise(i) * btnW, btnY + noise(i) * btnH, 286 * 0.08, 429 * 0.08);
        }
    }
}
function makeBtnPressed() {
    let passedTime = millis() - pressedTime;
    for (let i = 0; i < btnNum; i++) {
        if (passedTime > waitTime[i] && myBtn != i) {
            btnPressed[i] = true;
        }
    }
}
function checkFinished() {
    if (!btnPressed.includes(false)) {
        fill(0);
        textSize(50);
        text("Done", 480, height / 2);
    }
}