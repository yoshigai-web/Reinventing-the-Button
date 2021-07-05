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

const MAX_pressure = 0.9;
let pressure = new Array(easingNum);

let easingList = ["linear", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInOutTan"];

let showGraph = false;

function setup() {
    let cnv = createCanvas(800, 800);
    cnv.parent('myContainer');

    button = createButton('show graph');
    button.position(360, 75);
    button.mousePressed(changeGraphview);
    for (let i = 0; i < 7; i++) {
        buttonY[i] = 100 + 100 * i;
        pressure[i] = 0;
    }
    for (let i = 7; i < easingNum; i++) {
        buttonY[i] = 100 + 100 * (i - 7);
        pressure[i] = 0;
    }
}
function draw() {
    background(255);
    for (let i = 0; i < easingNum; i++) {
        if (pressure[i] > MAX_pressure) bought = true;
    }
    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        textSize(30);
        text("圧力", buttonX+160, 50);
        // button
        textSize(12);
        for (let i = 0; i < 7; i++) {
            let eX = map(pressure[i], 0, MAX_pressure, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(buttonX, buttonY[i], buttonWidth, buttonHeight);
            fill("#322F20");
            rect(buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
            if (showGraph) {
                for (let j = 0; j < 1; j += 0.01) {
                    point(buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
                }
                line(buttonX + map(pressure[i], 0, MAX_pressure, 0, buttonWidth), buttonY[i], buttonX + map(pressure[i], 0, MAX_pressure, 0, buttonWidth), buttonY[i] + buttonHeight);
            }
            fill(0);
            text(easingList[i], buttonX, buttonY[i] - 6);
        }
        for (let i = 7; i < easingNum; i++) {
            let eX = map(pressure[i], 0, MAX_pressure, 0, 1);
            let easingVal = EasingFunctions[easingList[i]](eX);
            let _buttonX = buttonX + 300;
            fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
            rect(_buttonX, buttonY[i], buttonWidth, buttonHeight);
            fill("#322F20");
            rect(_buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
            if (showGraph) {
                for (let j = 0; j < 1; j += 0.01) {
                    point(_buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
                }
                line(_buttonX + map(pressure[i], 0, MAX_pressure, 0, buttonWidth), buttonY[i], _buttonX + map(pressure[i], 0, MAX_pressure, 0, buttonWidth), buttonY[i] + buttonHeight);
            }
            fill(0);
            text(easingList[i], _buttonX, buttonY[i] - 6);
        }


        // // reduce cnt
        // for (let i = 0; i < easingNum; i++) {
        //     if (time - recentTime[i] > 500 && frameCount % 50 == 0 && cnt[i] > 0) cnt[i]--;
        // }
        // textSize(30);
        // text("連打（15回）", buttonX + 150, 50);
        // // button
        // textSize(14);
        // for (let i = 0; i < 7; i++) {
        //     let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
        //     let easingVal = EasingFunctions[easingList[i]](eX);
        //     fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
        //     rect(buttonX, buttonY[i], buttonWidth, buttonHeight);
        //     fill("#322F20");
        //     rect(buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
        //     if (showGraph) {
        //         for (let j = 0; j < 1; j += 0.01) {
        //             point(buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
        //         }
        //         line(buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i], buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i] + buttonHeight);
        //     }
        //     fill(0);
        //     text(easingList[i], buttonX, buttonY[i] - 6);
        // }
        // for (let i = 7; i < easingNum; i++) {
        //     let _buttonX = buttonX + 300;
        //     let eX = map(cnt[i], 0, MAX_cnt, 0, 1);
        //     let easingVal = EasingFunctions[easingList[i]](eX);
        //     fill(78, 212, 249, map(easingVal, 0, 1, 0, 255));
        //     rect(_buttonX, buttonY[i], buttonWidth, buttonHeight);
        //     fill("#322F20");
        //     rect(_buttonX, buttonY[i] + buttonHeight - 5, map(easingVal, 0, 1, 0, buttonWidth), 5);
        //     if (showGraph) {
        //         for (let j = 0; j < 1; j += 0.01) {
        //             point(_buttonX + map(j, 0, 1, 0, buttonWidth), buttonY[i] + buttonHeight - map(EasingFunctions[easingList[i]](j), 0, 1, 0, buttonHeight));
        //         }
        //         line(_buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i], _buttonX + map(cnt[i], 0, MAX_cnt, 0, buttonWidth), buttonY[i] + buttonHeight);
        //     }
        //     fill(0);
        //     text(easingList[i], _buttonX, buttonY[i] - 6);
        // }
    }
}
// function mousePressed() {
//     if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
//         cnt++;
//         time = millis();
//     }
//     for (let i = 0; i < 7; i++) {
//         if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight && mouseIsPressed) {
//             cnt[i]++;
//             recentTime[i] = millis();
//             if (cnt[i] > MAX_cnt) {
//                 bought = true;
//                 cnt[i] = 0;
//                 boughtTime = millis();
//             }
//         }
//     }
//     for (let i = 7; i < easingNum; i++) {
//         let _buttonX = buttonX + 300;
//         if (_buttonX < mouseX && mouseX < _buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight && mouseIsPressed) {
//             cnt[i]++;
//             recentTime[i] = millis();
//             if (cnt[i] > MAX_cnt) {
//                 bought = true;
//                 cnt[i] = 0;
//                 boughtTime = millis();
//             }
//         }
//     }
// }
function touchStarted() {
    if (bought) bought = false;
}

function changeGraphview() {
    showGraph = !showGraph;
}

Pressure.set('#myContainer', {
    start: function (event) {
        console.log('start', event);
    },
    change: function (force, event) {
        console.log('change', force);
        for (let i = 0; i < easingNum; i++)pressure[i] = 0;
        if (mouseIsPressed) {
            for (let i = 0; i < 7; i++) {
                if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight) {
                    pressure[i] = force;
                }
            }
            for (let i = 7; i < easingNum; i++) {
                let _buttonX = buttonX + 300;
                if (_buttonX < mouseX && mouseX < _buttonX + buttonWidth && buttonY[i] < mouseY && mouseY < buttonY[i] + buttonHeight) {
                    pressure[i] = force;
                }
            }
        }
        for (let i = 0; i < touches.length; i++) {
            for (let j = 0; j < 7; j++) {
                if (buttonX < touches[i].x && touches[i].x < buttonX + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeight) {
                    pressure[j] = force;
                }
            }
            for (let j = 7; j < easingNum; j++) {
                let _buttonX = buttonX + 300;
                if (_buttonX < touches[i].x && touches[i].x < _buttonX + buttonWidth && buttonY[i] < touches[i].y && touches[i].y < buttonY[i] + buttonHeight) {
                    pressure[i] = force;
                }
            }
        }
    },

    startDeepPress: function (event) {
        console.log('start deep press', event);
    },

    endDeepPress: function () {
        console.log('end deep press');
    },

    end: function () {
        console.log('end');
        for (let i = 0; i < easingNum; i++)pressure[i] = 0;
    },

    unsupported: function () {
        console.log(this);
    }
});