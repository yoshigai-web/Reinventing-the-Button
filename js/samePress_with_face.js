let btnX = 100, btnY = 200, btnW = 100, btnH = 100;
let btnNum = 5;
let btn = new Array(btnNum);
let time;
let waitTime = new Array(btnNum);
let maxTime = 10000;
let pressed = false;
let img = new Array(btnNum - 1);

function setup() {
    createCanvas(1200, 800);
    for (let i = 0; i < btnNum - 1; i++)img[i] = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/face' + i + '.jepg');
    for (let i = 0; i < btnNum; i++)waitTime[i] = Math.floor(Math.random() * maxTime);
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
        if (0 < i) {
            image(img[i - 1], btnX + i * 200, btnY - 120, btnW, btnH);
            fill(0);
            textSize(25);
            if (btn[0] && !btn[i]) text("Check", btnX + i * 200 + 15, btnY + 50);
            else if (btn[0] && btn[i]) text("OK", btnX + i * 200 + 15, btnY + 50);
            else text("Wait", btnX + i * 200 + 15, btnY + 50);
        } else {
            fill(255);
            rect(btnX + i * 200, btnY - 120, btnW, btnH);
            fill(0);
            textSize(50);
            text("me", btnX + i * 200 + 5, btnY - 60);
        }
    }
    if (pressed) {
        let t = millis();
        for (let i = 0; i < btnNum; i++) if (t - time > waitTime[i]) btn[i] = true;
    }

    for (let i = 0; i < btnNum; i++) {
        if (!btn[i]) break;
        fill(0);
        textSize(50);
        if (i == btnNum - 1) text("Done", width / 2, height / 2);
    }
}
function mousePressed() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) btn[0] = !btn[0];
}
function keyPressed() {
    for (let i = 0; i < btnNum; i++) btn[i] = false;
    for (let i = 0; i < btnNum; i++)waitTime[i] = Math.floor(Math.random() * maxTime);
    pressed = false;
}