let peopleNum = 3;
let buttonX = new Array(peopleNum), buttonY;
let buttonWidth, buttonHeight;
let isPressed = new Array(peopleNum);
let cnt = 0;
const MAX_cnt = 2000;
function setup() {
    createCanvas(windowWidth, windowHeight);
    buttonWidth = (windowWidth * 0.6) / peopleNum;
    buttonHeight = buttonWidth * 0.7;
    for (let i = 0; i < peopleNum; i++) {
        buttonX[i] = (i + 1) * windowWidth / (peopleNum + 1) - buttonWidth / 2;
        isPressed[i] = false;
    }
    buttonY = windowHeight - 200;
}
function draw() {
    background(255);
    for (let i = 0; i < peopleNum; i++) {
        isPressed[i] = false;
        for (let j = 0; j < touches.length; j++) {
            if (buttonX[i] < touches[j].x && touches[j].x < buttonX[i] + buttonWidth && buttonY < touches[j].y && touches[j].y < buttonY + buttonHeight) isPressed[i] = true;
        }
        if (isPressed[i]) {
            fill(78, 212, 249);
            cnt += 2;
        } else {
            fill(255);
        }
        rect(buttonX[i], buttonY, buttonWidth, buttonHeight);
    }
    if (isPressed.includes(false) && cnt > 0) cnt--;



    if (cnt > MAX_cnt) {
        textAlign(CENTER);
        textSize(50);
        fill(0);
        text("合意", windowWidth / 2, windowHeight / 2);
        cnt = MAX_cnt;
    } else {
        // progress bar
        fill(0);
        rect(0, displayHeight / 2, map(cnt, 0, MAX_cnt, 0, displayWidth), 50);
    }
}