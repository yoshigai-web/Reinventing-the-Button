// from: https://gist.github.com/gre/1650294
EasingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t * t,
    // decelerating to zero velocity
    easeOutQuad: t => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // accelerating from zero velocity 
    easeInCubic: t => t * t * t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t) * t * t + 1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity 
    easeInQuart: t => t * t * t * t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1 - (--t) * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    // accelerating from zero velocity
    easeInQuint: t => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
    easeInOutTan: t => map(1 / 3 * tan(map(t, 0, 1, -1.3, 1.3)), 1 / 3 * tan(-1.3), 1 / 3 * tan(1.3), 0, 1)
}
const easingNum = 14;
let buttonY = new Array(easingNum), cnt = new Array(easingNum);
let buttonX = 200, buttonWidth = 100, buttonHeight = 50;
let bought = false;

const MAX_cnt = 15;
let easingList = ["linear", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInOutTan"];

let showGraph = false;

let recentTime = new Array(easingNum);
let boughtTime;

function setup() {
    createCanvas(800, 800);
    button = createButton('show graph');
    button.position(360, 75);
    button.mousePressed(changeGraphview);
    for (let i = 0; i < 7; i++) {
        buttonY[i] = 100 + 100 * i;
        cnt[i] = 0;
    }
    for (let i = 7; i < easingNum; i++) {
        buttonY[i] = 100 + 100 * (i - 7);
        cnt[i] = 0;
    }
}
function draw() {
    background(255);

    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        // reduce cnt
        let time = millis();
        for (let i = 0; i < easingNum; i++) {
            if (time - recentTime[i] > 500 && frameCount % 50 == 0 && cnt[i] > 0) cnt[i]--;
        }
        textSize(30);
        text("連打（15回）", buttonX + 150, 50);
        // button
        textSize(14);
        for (let i = 0; i < 7; i++) {
            let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(buttonX, buttonY[i], buttonWidth, buttonHeight);
            fill("#322F20");
            rect(buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
            if (showGraph) {
                for (let j = 0; j < 1; j += 0.01) {
                    point(buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
                }
                line(buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i], buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i] + buttonHeight);
            }
            fill(0);
            text(easingList[i], buttonX, buttonY[i] - 6);
        }
        for (let i = 7; i < easingNum; i++) {
            let _buttonX = buttonX + 300;
            let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(_buttonX, buttonY[i], buttonWidth, buttonHeight);
            fill("#322F20");
            rect(_buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
            if (showGraph) {
                for (let j = 0; j < 1; j += 0.01) {
                    point(_buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
                }
                line(_buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i], _buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i] + buttonHeight);
            }
            fill(0);
            text(easingList[i], _buttonX, buttonY[i] - 6);
        }
    }
}
function mousePressed() {
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        cnt++;
        time = millis();
    }
    for (let i = 0; i < 7; i++) {
        if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight && mouseIsPressed) {
            cnt[i]++;
            recentTime[i] = millis();
            if (cnt[i] > MAX_cnt) {
                bought = true;
                cnt[i] = 0;
                boughtTime = millis();
            }
        }
    }
    for (let i = 7; i < easingNum; i++) {
        let _buttonX = buttonX + 300;
        if (_buttonX < mouseX && mouseX < _buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight && mouseIsPressed) {
            cnt[i]++;
            recentTime[i] = millis();
            if (cnt[i] > MAX_cnt) {
                bought = true;
                cnt[i] = 0;
                boughtTime = millis();
            }
        }
    }
    if (bought && millis() - boughtTime > 1000) bought = false;
}

function changeGraphview() {
    showGraph = !showGraph;
}