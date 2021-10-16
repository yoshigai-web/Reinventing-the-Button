let btnX, btnY, btnW = 400, btnH = 400;
let btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 5;
let cursorRotation = 0;
let cursorDistance = -10;
let pressedX, pressedY;
let sound;
let pressedTime;
let sel;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger_pic.png');
    sound = loadSound('assets/electric voice.mp3');
    pixelDensity(1);
    btnX = width / 2 - btnW / 2, btnY = height / 2 - btnH / 2;

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
    drawButton();
    drawFinger();
    if (btnPressed) {
        if (millis() - pressedTime > 1500) {
            btnPressed = false;
        } else {
            if (int(random(10 * 30)) == 0) sound.play();
        }
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
    if (touches.length > 0) {
        push();
        translate(touches[0].x, touches[0].y - cursorDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, -335, cursorDistance, 284 * 2.5, 497 * 2.5);
            pop();
        }
        pop();
    }
}
function touchStarted() {
    if (touches.length > 0) {
        let touchX = touches[0].x, touchY = touches[0].y;
        if (btnX < touchX && touchX < btnX + btnW && btnY < touchY && touchY < btnY + btnH && !btnPressed) {
            btnPressed = true;
            pressedTime = millis();
            pressedX = touchX, pressedY = touchY;
        }
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