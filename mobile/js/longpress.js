let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeight = 100;
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 180;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if(touches.length>0){
        if (buttonX < touches[0].x && touches[0].x<buttonX + buttonWidth && buttonY < touches[0].y && touches[0].y < buttonY + buttonHeight) {
            cnt++;
        }
    }else{
        if(cnt>0)cnt--;
    }
    if(cnt>MAX_cnt){
        bought=true;
        cnt=0;
    }
    if (bought) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("Thank you for shopping!", width/2, 200);
        textSize(20);
        text("Click to back.", width/2, 250);
    } else {
        image(img, 100, 45, 150, 128);
        fill(0);
        textSize(30);
        textAlign(LEFT);
        text("￥29,036", 110, 220);
        // button
        fill(78, 212, 249, map(cnt, 0, MAX_cnt, 0, 255));
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);
        fill("#322F20");
        strokeWeight(5);
        rect(buttonX, buttonY+buttonHeight-5, map(cnt, 0, MAX_cnt, 0, buttonWidth), 5, 5);
        fill(0);
        textSize(60);
        text("購入", buttonX + 40, buttonY + 75);
    }
}
function touchStarted() {
    if (bought) bought = false;
}
