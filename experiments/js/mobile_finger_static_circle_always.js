let btnX = 30, btnY = 1660, btnW = 925, btnH = 125;
let btnTouched = false, btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 5;
let cursorRotation = 0;
let cursorDistance = -10;
let pressedX, pressedY;
let pressedTime;
let sel;
let purchaseScreen;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger_pic.png');
    purchaseScreen = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book_mobile.png');
    pixelDensity(1);
    sel = createSelect();
    sel.position(10, 10);
    sel.option(2);
    sel.option(3);
    sel.option(4);
    sel.option(5);
    sel.selected(5);
    sel.changed(mySelectEvent);
}
function draw() {
    background(255);
    if (btnPressed) {
        fill(0);
        textSize(60);
        text("Thank you for shopping!", 150, height / 2);
        if (millis() - pressedTime > 3500) {
            btnPressed = false;
            btnTouched = false;
        }
    } else {
        image(purchaseScreen, 0, 0, width, height);
        // drawButton();
        drawFinger();
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 50);
    else fill(255);
    strokeWeight(5);
    rect(btnX, btnY, btnW, btnH, 10);
}
function drawFinger() {
    // other cursors
    if (btnTouched) {
        push();
        translate(pressedX, pressedY - cursorDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, -335, cursorDistance, 284 * 2.5, 497 * 2.5);
            pop();
        }
        pop();
    } else {
        push();
        translate(btnX + btnW / 2, btnY + btnH / 2 - cursorDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, -335, cursorDistance + 350, 284 * 2.5, 497 * 2.5);
            pop();
        }
        pop();
    }
}
function touchMoved() {
    if (touches.length > 0) {
        let touchX = touches[0].x, touchY = touches[0].y;
        if (btnX < touchX && touchX < btnX + btnW && btnY < touchY && touchY < btnY + btnH && !btnPressed) {
            pressedX = touchX, pressedY = touchY;
            btnTouched = true;
        } else {
            btnTouched = false;
        }
    }
}
function touchEnded() {
    if (btnTouched) {
        btnPressed = true;
        pressedTime = millis();
    }
}
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function mySelectEvent() {
    cursorNum = sel.value();
}