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
    easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
}

let buttonY = new Array(13), cnt = new Array(13);
let buttonX = 200, buttonWidth = 100, buttonHeihgt = 50;
let bought = false;

const MAX_cnt = 200;
let easingList = ["linear", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint"];
function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 7; i++) {
        buttonY[i] = 50 + 100 * i;
        cnt[i] = 0;
    }
    for (let i = 7; i < 13; i++) {
        buttonY[i] = 50 + 100 * (i - 7);
        cnt[i] = 0;
    }
}
function draw() {
    background(255);

    for (let i = 0; i < 7; i++) {
        if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeihgt && mouseIsPressed) {
            cnt[i]++;
            if (cnt[i] > MAX_cnt) {
                bought = true;
                cnt[i] = 0;
            }
        } else {
            if (cnt[i] > 0) cnt[i]--;
        }
    }
    for (let i = 7; i < 13; i++) {
        let _buttonX = buttonX + 300;
        if (_buttonX < mouseX && mouseX < _buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeihgt && mouseIsPressed) {
            cnt[i]++;
            if (cnt[i] > MAX_cnt) {
                bought = true;
                cnt[i] = 0;
            }
        } else {
            if (cnt[i] > 0) cnt[i]--;
        }
    }
    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        // button
        textSize(14);
        for (let i = 0; i < 7; i++) {
            let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(buttonX, buttonY[i], buttonWidth, buttonHeihgt, 5);
            fill("#322F20");
            rect(buttonX, buttonY[i] + buttonHeihgt - 5, map(easingVal, 0, 1, 0, buttonWidth), 5, 5);
            fill(0);
            text(easingList[i], buttonX, buttonY[i] - 6);
        }
        for (let i = 7; i < 13; i++) {
            let _buttonX = buttonX + 300;
            let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(_buttonX, buttonY[i], buttonWidth, buttonHeihgt, 5);
            fill("#322F20");
            rect(_buttonX, buttonY[i] + buttonHeihgt - 5, map(easingVal, 0, 1, 0, buttonWidth), 5, 5);
            fill(0);
            text(easingList[i], _buttonX, buttonY[i] - 6);
        }
    }

}
function mousePressed() {
    if (bought) bought = false;
}

