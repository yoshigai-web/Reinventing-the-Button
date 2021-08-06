let judgeX = 100, judgeY = 200, judgeW = 100, judgeH = 50;
let judgeNum = 4;
let btnX = 390, btnY = 550, btnW = 120, btnH = 80;
let judge = new Array(judgeNum);
let btn = false;
let time;
let waitTime = new Array(judgeNum);
let maxTime = 2000;
let pressed = false;
let img = new Array(judgeNum - 1);

function setup() {
    createCanvas(1200, 800);
    for (let i = 0; i < judgeNum; i++)img[i] = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/face' + i + '.jpeg');
    init();
    textAlign(CENTER, CENTER);
}
function draw() {
    background(255);
    // draw judge
    for (let i = 0; i < judgeNum; i++) {
        if (judge[i]) fill(0, 128, 255, 128);
        else fill(255);
        rect(judgeX + i * 200, judgeY, judgeW, judgeH);
        image(img[i], judgeX + i * 200, judgeY - 120, judgeW, 100)
        fill(0);
        textSize(20);
        if (btn && !judge[i]) text("Check...", judgeX + i * 200 + judgeW / 2, judgeY + judgeH / 2);
        else if (btn && judge[i]) text("OK!", judgeX + i * 200 + judgeW / 2, judgeY + judgeH / 2);
        // else text("Wait", judgeX + i * 200 + judgeW / 2, judgeY + judgeH / 2);
    }
    // draw button
    if (btn) {
        fill(255, 0, 0);
        if (!pressed) {
            pressed = true;
            time = millis();
        }
    } else if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) fill(255, 0, 0, 100);
    else fill(255);
    rect(btnX, btnY, btnW, btnH, 10);
    if (pressed) {
        let t = millis();
        for (let i = 0; i < judgeNum; i++) if (t - time > waitTime[i]) judge[i] = true;
    }
    if (!judge.includes(false)) {
        fill(0);
        textSize(50);
        text("Done", 450, height / 2);
    }
}
function mousePressed() {
    if (btnX < mouseX && mouseX < btnX + btnW && btnY < mouseY && mouseY < btnY + btnH) {
        btn = !btn;
        if(!btn)init();
    }
}
function keyPressed() {
    init();
}
function init() {
    for (let i = 0; i < judgeNum; i++) {
        waitTime[i] = Math.floor(Math.random() * maxTime);
        judge[i] = false;
    }
    btn = false;
    pressed = false;
}