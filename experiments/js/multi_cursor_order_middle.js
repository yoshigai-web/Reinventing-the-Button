let btnX = 100, btnY = 200, btnW = 100, btnH = 100, btnInterval = 200;
let btnNum = 5;
let btnPressed = [];
let myBtn, myBtnPressed;
let otherBtn = [], otherBtnNum = 3;
let startTime, pressedTime;
let waitTime = [];
let delayTime = 500;;
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
        if (btnX + i * btnInterval < mouseX && mouseX < btnX + i * btnInterval + btnW && btnY < mouseY && mouseY < btnY + btnH && otherBtn.includes(i)) {
            btnPressed[i] = !btnPressed[i];
            pressedTime = millis();
            myBtn = i;
            myBtnPressed = true;
        }
    }
}
function keyPressed() {
    init();
}
function init() {
    for (let i = 0; i < otherBtnNum; i++) {
        otherBtn[i] = int(random(btnNum));
    }
    print(otherBtn);
    for (let i = 0; i < btnNum; i++) btnPressed[i] = false;
    for (let i = 0; i < btnNum; i++) {
        waitTime[i] = Math.floor(Math.random() * maxTime);
        if (!otherBtn.includes(i)) waitTime[i] += delayTime;
    }
    print(waitTime);
    startTime = millis();
    myBtnPressed = false;
    myBtn = -1;
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
    for (let i = 0; i < btnNum; i++) {
        // moving
        if (!btnPressed[i]) {
            let passedTime;
            if (!otherBtn.includes(i)) {
                passedTime = millis() - startTime;
            } else if (myBtnPressed) {
                passedTime = millis() - pressedTime
            }
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
    let passedTimeFromStart = millis() - startTime;
    let passedTimeFromPressed = millis() - pressedTime;
    for (let i = 0; i < btnNum; i++) {
        if (passedTimeFromStart > waitTime[i] && !otherBtn.includes(i)) {
            btnPressed[i] = true;
        } else if (passedTimeFromPressed > waitTime[i] && myBtnPressed) {
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