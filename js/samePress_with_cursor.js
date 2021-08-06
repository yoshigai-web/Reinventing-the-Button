let btnX = 100, btnY = 100, btnW = 100, btnH = 100;
let btnNum = 5;
let btn = new Array(btnNum);
let time;
let waitTime = new Array(btnNum);
let maxTime = 2000;
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
    for (let i = 0; i < btnNum; i++) {
        if (btn[i]) {
            fill(255, 0, 0);
            if (!pressed) {
                pressed = true;
                time = millis();
            }
        } else fill(255);
        rect(btnX + i * 200, btnY, btnW, btnH);
        if (!btn[i] && pressed) image(img, btnX + i * 200 + noise(i) * btnW, btnY + noise(i) * btnH + waitTime[i] - (millis() - time), 286 * 0.08, 429 * 0.08);
        if (btn[i] && first != i) image(img, btnX + i * 200 + noise(i) * btnW, btnY + noise(i) * btnH, 286 * 0.08, 429 * 0.08);
    }
    if (pressed) {
        let t = millis();
        for (let i = 0; i < btnNum; i++) if (t - time > waitTime[i]) btn[i] = true;
    }
    image(img, mouseX, mouseY, 286 * 0.08, 429 * 0.08);
}
function mousePressed() {
    if (!btn.includes(false)) {
        init();
        return;
    }
    for (let i = 0; i < btnNum; i++) {
        if (btnX + i * 200 < mouseX && mouseX < btnX + i * 200 + btnW && btnY < mouseY && mouseY < btnY + btnH) {
            btn[i] = !btn[i];
            first = i;
        }
    }
}
function keyPressed() {
    init();
}
function init() {
    for (let i = 0; i < btnNum; i++) btn[i] = false;
    for (let i = 0; i < btnNum; i++)waitTime[i] = Math.floor(Math.random() * maxTime);
    pressed = false;
}