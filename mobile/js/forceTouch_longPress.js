let size = 0;
let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeight = 100;
let bought = false;
let img;

const MAX_size = 0.9;

let cnt = 0;
const MAX_cnt = 180;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('myContainer');
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if (size >= MAX_size) {
        size=MAX_size;
        cnt++;
    } else {
        if(cnt>0)cnt--;
    }
    if(cnt>=MAX_cnt){
        bought = true;
        cnt=0;
    }
    
    if (bought) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("Thank you for shopping!", width / 2, 200);
        textSize(20);
        text("Click to back.", width / 2, 250);
    } else {
        fill(0);
        textSize(20);
        text("圧力→長押し", 110, 460);
        textSize(12);
        text("pressure: "+size, 50, 400);
        text("count: "+cnt, 50, 420);
        image(img, 100, 45, 150, 128);
        fill(0);
        textSize(30);
        textAlign(LEFT);
        text("￥29,036", 110, 220);
        // button
        fill(78, 212, 249, map(size, 0, MAX_size, 0, 255));
        rect(buttonX + map(size, 0, MAX_size, 0, 10), buttonY + map(size, 0, MAX_size, 0, 10), buttonWidth - +map(size, 0, MAX_size, 0, 20), buttonHeight - +map(size, 0, MAX_size, 0, 20), 5);
        fill("#322F20");
        strokeWeight(5);
        rect(buttonX + map(size, 0, MAX_size, 0, 10), buttonY - map(size, 0, MAX_size, 0, 10) + buttonHeight - 5, map(size, 0, MAX_size, 0, buttonWidth) - map(size, 0, MAX_size, 0, 20), 5, 5);
        rect(buttonX + map(size, 0, MAX_size, 0, 10), buttonY + map(size, 0, MAX_size, 0, 10) + 5, buttonWidth - map(size, 0, MAX_size, 0, 20)-map(cnt, 0, MAX_cnt, 0, buttonWidth - map(size, 0, MAX_size, 0, 20)), 1, 5);
        fill(0);
        textSize(60 - map(size, 0, MAX_size, 0, 10));
        text("購入", buttonX + 40 + map(size, 0, MAX_size, 0, 10), buttonY + 75 - map(size, 0, MAX_size, 0, 5));
    }
}
function touchStarted() {
    if (bought) bought = false;
}


Pressure.set('#myContainer', {
    start: function (event) {
        console.log('start', event);
    },
    change: function (force, event) {
        console.log('change', force);
        size = 0;
        if (mouseIsPressed) {
            if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeight) {
                size = force;
            }
        }
        for (let i = 0; i < touches.length; i++) {
            if (buttonX < touches[i].x && touches[i].x < buttonX + buttonWidth && buttonY < touches[i].y && touches[i].y < buttonY + buttonHeight) {
                size = force;
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
        size = 0;
    },

    unsupported: function () {
        console.log(this);
    }
});