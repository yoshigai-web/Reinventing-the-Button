
let buttonX = 100, buttonY = 650, buttonWidth = 250, buttonHeihgt = 50;
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 180;

function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if(touches.length>0){
        if (buttonX < touches[0].x && touches[0].x<buttonX + buttonWidth && buttonY < touches[0].y && touches[0].y < buttonY + buttonHeihgt) {
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
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        image(img, 75, 180, 150*2, 128*2);
        fill(0);
        textSize(25);
        text("￥29,036", 170, 600);
        // button
        fill(78, 212, 249, map(cnt, 0, MAX_cnt, 0, 255));
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill("#322F20");
        rect(buttonX, buttonY+buttonHeihgt-5, map(cnt, 0, MAX_cnt, 0, buttonWidth), 5, 5);
        fill(0);
        textSize(20);
        text("購入", 180 + 20, buttonY + 30);
    }
    
}
function touchStarted() {
    if (bought) bought = false;
}