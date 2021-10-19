let btnX = 845, btnY = 715, btnW = 160, btnH = 55;
let btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 5;
let cursorRotation = 0;
let cursorDistance = [];    // 250
let cursorSpeed = [3, 3.5, 4, 6];
const curorFinalDistance = 15;
let isReached = [];
let pressedX, pressedY;
let pressedTime;
let purchaseScreen;
function setup() {
    createCanvas(1300, 1000);
    noCursor();
    purchaseScreen = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/travel.png');
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger.png');
    for (let i = 0; i < cursorNum - 1; i++) {
        cursorDistance[i] = 250;
        cursorSpeed = shuffle(cursorSpeed);
        isReached[i] = false;
    }
}
function draw() {
    background(255);
    if (isReached.includes(false)) {
        image(purchaseScreen, 75, 20);
        drawButton();
        drawCursor();
    }
    if (btnPressed && !isReached.includes(false)) {
        if (millis() - pressedTime > 3500) {
            btnPressed = false;
            // init
            for (let i = 0; i < cursorNum - 1; i++) {
                cursorDistance[i] = 250;
                cursorSpeed = shuffle(cursorSpeed);
                isReached[i] = false;
            }
        } else {
            fill(0);
            textSize(30);
            text("Thank you for shopping!", width / 2, height / 2);
        }
    }
}
function drawButton() {
    let isReachedNum = isReached.filter(x => x === true).length;
    if (btnPressed) fill(255, 100 - isReachedNum * 100 / (cursorNum - 1), 100 - isReachedNum * 100 / (cursorNum - 1), 50 + isReachedNum * 205 / (cursorNum - 1));
    else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 50);
    else fill(255);
    rect(btnX, btnY, btnW, btnH, 5);
    fill(0);
    textSize(20);
    text("予約", btnX + 55, btnY + 35);
}
function drawCursor() {
    // other cursors
    if (btnPressed) {
        push();
        translate(pressedX + 8, pressedY - curorFinalDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            if (cursorDistance[i] > curorFinalDistance) cursorDistance[i] -= cursorSpeed[i];
            else isReached[i] = true;

            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, -14, cursorDistance[i], 202 * 0.15, 257 * 0.15);
            pop();
        }
        pop();
    } else {
        push();
        translate(mouseX + 8, mouseY - curorFinalDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, -14, cursorDistance[i], 202 * 0.15, 257 * 0.15);
            pop();
        }
        pop();
    }
    // my cursor
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {   // on hover
        image(fingerImg, mouseX, mouseY, 202 * 0.15, 257 * 0.15);
    } else {    // draw my cursor
        image(cursorImg, mouseX, mouseY, 286 * 0.1, 429 * 0.1);
    }
}
function mousePressed() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH && !btnPressed) {
        btnPressed = true;
        pressedTime = millis();
        pressedX = mouseX, pressedY = mouseY;
    }
}
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}