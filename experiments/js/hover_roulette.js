let btnX, btnY, btnW = 150, btnH = 150;
let btnPressed = false;
let cursorImg, fingerImg;
let cursorNum = 5;
let cursorRotation = 0;
let cursorDistance = 250;
const curorFinalDistance = 20;
let roulette = [], rouletteNum;
let sound;
let pressedTime;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    fingerImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/finger.png');
    sound = loadSound('assets/electric voice.mp3');
    btnX = width / 2, btnY = height / 2;
    for (let i = 0; i < cursorNum - 1; i++) roulette[i] = i + 1;
    roulette = shuffle(roulette);
    rouletteNum = int(random(1, cursorNum - 1));
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10 * 30)) == 0) sound.play();
    }
    if (btnPressed && millis() - pressedTime > 500) {
        btnPressed = false;
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 100, 100, 100);
    else fill(255);
    rect(btnX, btnY, btnW, btnH);
}
function drawCursor() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {   // on hover
        push();
        translate(mouseX, mouseY);

        // // rotate(cursorRotation += 0.012);
        image(fingerImg, 0, 0, 202 * 0.15, 257 * 0.15);
        translate(0, -curorFinalDistance);
        for (let i = 0; i < cursorNum - 1; i++) {
            push();
            rotate(2 * PI / cursorNum * roulette[i]);
            if (i < rouletteNum && btnPressed) image(fingerImg, 0, cursorDistance - 8, 202 * 0.15, 257 * 0.15);
            else image(fingerImg, 0, cursorDistance, 202 * 0.15, 257 * 0.15);
            pop();
        }
        if (cursorDistance > curorFinalDistance) cursorDistance -= 10;
        pop();
    } else {
        // draw my cursor
        image(cursorImg, mouseX, mouseY, 286 * 0.1, 429 * 0.1);
        // init
        cursorDistance = 250;
        cursorRotation = 0;
    }
}
function mousePressed() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {
        btnPressed = !btnPressed;
        pressedTime = millis();
        roulette = shuffle(roulette);
        rouletteNum = int(random(1, cursorNum - 1));
        print(rouletteNum, roulette)
    }
}
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}