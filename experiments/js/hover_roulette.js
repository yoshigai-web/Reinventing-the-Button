let btnX, btnY, btnW = 150, btnH = 150;
let btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 5;
let cursorRotation = 0;
let cursorDistance = [];    // 250
let cursorSpeed = [3, 3.5, 4, 6];
const curorFinalDistance = 20;
let isReached = [];
let pressedX, pressedY;
let sound;
let pressedTime;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger.png');
    sound = loadSound('assets/electric voice.mp3');
    btnX = width / 2, btnY = height / 2;
    for (let i = 0; i < cursorNum - 1; i++) {
        cursorDistance[i] = 250;
        cursorSpeed=shuffle(cursorSpeed);
        isReached[i] = false;
    }
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed && !isReached.includes(false)) {
        if (millis() - pressedTime > 2000) {
            btnPressed = false;
            // init
            for (let i = 0; i < cursorNum - 1; i++) {
                cursorDistance[i] = 250;
                cursorSpeed=shuffle(cursorSpeed);
                isReached[i] = false;
            }
        }else{
            if (int(random(10 * 30)) == 0) sound.play();
        }
    }
}
function drawButton() {
    let isReachedNum = isReached.filter(x => x === true).length;
    if (btnPressed) fill(255, 100 - isReachedNum * 100 / (cursorNum - 1), 100 - isReachedNum * 100 / (cursorNum - 1), 50 + isReachedNum * 205 / (cursorNum - 1));
    else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 50);
    else fill(255);
    rect(btnX, btnY, btnW, btnH);
}
function drawCursor() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {   // on hover
        image(fingerImg, mouseX, mouseY, 202 * 0.15, 257 * 0.15);
    } else {    // draw my cursor
        image(cursorImg, mouseX, mouseY, 286 * 0.1, 429 * 0.1);
    }
    // other cursors
    if (btnPressed) {
        push();
        translate(pressedX, pressedY - curorFinalDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            if (cursorDistance[i] > curorFinalDistance) cursorDistance[i] -= cursorSpeed[i];
            else isReached[i] = true;

            push();
            rotate(2 * PI / cursorNum * (i + 1));
            image(fingerImg, 0, cursorDistance[i], 202 * 0.15, 257 * 0.15);
            pop();
        }
        pop();
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