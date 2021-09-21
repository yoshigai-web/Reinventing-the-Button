let btnX = 100, btnY = 500, btnW = 100, btnH = 100;
let btnNum = 5;
let btnPressed = new Array(btnNum);
let time;
let waitTime = new Array(btnNum);
let maxTime = 1500;
let pressed = false;
let first;
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
    if (pressed) {
        let t = millis();
        for (let i = 0; i < btnNum; i++) if (t - time > waitTime[i]) btnPressed[i] = true;
    }
    if (!btnPressed.includes(false)) {
        fill(0);
        textSize(50);
        text("Done", 480, height / 2);
    }
    image(img, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
}
function mousePressed() {
    if (!btnPressed.includes(false)) {
        init();
        return;
    }
    for (let i = 0; i < btnNum; i++) {
        if (btnX + i * 200 < mouseX && mouseX < btnX + i * 200 + btnW && btnY < mouseY && mouseY < btnY + btnH) {
            btnPressed[i] = !btnPressed[i];
            first = i;
        }
    }
}
function keyPressed() {
    init();
}
function init() {
    for (let i = 0; i < btnNum; i++) btnPressed[i] = false;
    for (let i = 0; i < btnNum; i++)waitTime[i] = Math.floor(Math.random() * maxTime);
    pressed = false;
}
function drawButton() {
    for (let i = 0; i < btnNum; i++) {
        if (btnPressed[i]) {
            fill(255, 0, 0);
            if (!pressed) {
                pressed = true;
                time = millis();
            }
        } else if (btnX + i * 200 < mouseX && mouseX < btnX + i * 200 + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 0, 0, 100);
        else fill(255);
        rect(btnX + i * 200, btnY, btnW, btnH, 10);
        if (!btnPressed[i] && pressed) image(img, btnX + i * 200 + noise(i) * btnW, btnY + noise(i) * btnH + waitTime[i] - (millis() - time), 286 * 0.08, 429 * 0.08);
        if (btnPressed[i] && first != i) image(img, btnX + i * 200 + noise(i) * btnW, btnY + noise(i) * btnH, 286 * 0.08, 429 * 0.08);
    }
}