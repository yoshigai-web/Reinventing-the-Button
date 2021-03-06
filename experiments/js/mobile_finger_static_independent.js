let btnX, btnY, btnW = 200, btnH = 200;
let btnNum = 3;
let btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 3;
let cursorRotation = 0;
let cursorDistance = -10;
let cursorPos = [];
let sound;
let pressedTime;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger_pic.png');
    sound = loadSound('assets/electric voice.mp3');
    pixelDensity(1);
    btnX = width / 2 - btnW / 2, btnY = height / 2 - btnH / 2;
    for (let i = 0; i < cursorNum - 1; i++) {
        cursorPos[i] = random(-50, 50);
    }
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (millis() - pressedTime > 1000) {
            btnPressed = false;
            // init
            for (let i = 0; i < cursorNum - 1; i++) {
                cursorPos[i] = random(-50, 50);
            }
        } else {
            if (int(random(10 * 30)) == 0) sound.play();
        }
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0,0);
    else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 50);
    else fill(255);
    strokeWeight(5);
    stroke(0);
    rect(btnX, btnY, btnW, btnH, 10);
    if (btnPressed) {
        rect(btnX - 300, btnY, btnW, btnH, 10);
        rect(btnX + 300, btnY, btnW, btnH, 10);
    }
}
function drawCursor() {
    // other cursors
    if (btnPressed) {
        image(fingerImg, btnX - 540, btnY + btnH / 2 + cursorDistance + cursorPos[0], 284 * 2.5, 497 * 2.5);
        image(fingerImg, btnX + 20, btnY + btnH / 2 + cursorDistance + cursorPos[1], 284 * 2.5, 497 * 2.5);
    }
}
function touchStarted() {
    if (touches.length > 0) {
        let touchX = touches[0].x, touchY = touches[0].y;
        if (btnX < touchX && touchX < btnX + btnW && btnY < touchY && touchY < btnY + btnH && !btnPressed) {
            btnPressed = true;
            pressedTime = millis();
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