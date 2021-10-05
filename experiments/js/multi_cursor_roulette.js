let btnX, btnY, btnW = 70, btnH = 70;
let btnPressed = false;
let cursorImg;
let cursorNum = 5;
let cursorRotation = 0;
let roulette = [], rouletteNum;
let sound;
let pressedTime;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
    btnX = width / 2, btnY = height / 2;
    for (let i = 0; i < cursorNum; i++) roulette[i] = i;
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
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {
        push();
        translate(mouseX, mouseY - 10);

        rotate(cursorRotation += 0.01);
        for (let i = 0; i < cursorNum; i++) {
            push();
            rotate(2 * PI / cursorNum * roulette[i]);
            if (rouletteNum < i) {
                if (btnPressed) image(cursorImg, 0, 10 - 8, 286 * 0.06, 429 * 0.06);
                else image(cursorImg, 0, 10, 286 * 0.08, 429 * 0.08);
                // image(cursorImg, 0, 10 - btnPressed * 8, 286 * 0.05, 429 * 0.05);
            } else {
                image(cursorImg, 0, 10, 286 * 0.08, 429 * 0.08);
            }

            pop();
        }
        pop();
    } else {
        // draw my cursor
        image(cursorImg, mouseX, mouseY, 286 * 0.08, 429 * 0.08);

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