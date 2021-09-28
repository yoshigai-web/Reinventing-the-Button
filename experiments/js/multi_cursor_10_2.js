let btnX = 100, btnY = 400, btnW = 70, btnH = 70;
let btnNum = 10;
let btnInterval = 100;
let btnPressed;
let cursorImg;
let cursorErrorX = [], cursorErrorY = [];
let errorRange = 50;
let sound;
let noiseSeed = 0.0;
let atari = [], atariNum = 2;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
    for (let i = 0; i < btnNum; i++) {
        atari[i] = i;
    }
    atari = shuffle(atari);
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10)) == 0) sound.play();
        btnPressed = false;
        atari = shuffle(atari);
    }
}
function mousePressed() {
    // ボタンの上下100ptからカーソルを複数表示する
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let relativeMouseX = (mouseX - btnX) % btnInterval;
        if (relativeMouseX < btnW && btnY < mouseY && mouseY < btnY + btnH) btnPressed = !btnPressed;
    }
}
function drawButton() {
    for (let i = 0; i < btnNum; i++) {
        if (btnPressed && checkAtari(i)) fill(255, 0, 0);
        else fill(255);
        rect(btnX + i * btnInterval, btnY, btnW, btnH);
    }
}
function drawCursor() {
    image(cursorImg, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
    if (btnY - 100 < mouseY && mouseY < btnY + btnH + 100) {
        let relativeMouseX = (mouseX - btnX) % btnInterval;
        for (let i = 0; i < btnNum; i++) {
            if (btnX + i * btnInterval + relativeMouseX != mouseX) {
                let cursorX = btnX + i * btnInterval + relativeMouseX + cursorErrorX[i];
                let cursorY = mouseY + cursorErrorY[i];
                image(cursorImg, cursorX, cursorY, 286 * 0.08, 429 * 0.08);
            }
        }
    }
}
function mouseMoved() {
    noiseSeed += 0.01;
    for (let i = 0; i < btnNum; i++) {
        cursorErrorX[i] = noise((noiseSeed + i * 3)) * errorRange - errorRange / 2;
        cursorErrorY[i] = noise((noiseSeed + i * 3 + 1)) * errorRange - errorRange / 2;
    }
}
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function checkAtari(num) {
    for (let i = 0; i < atariNum; i++) {
        if (atari[i] == num) return true;
    }
    return false;
}