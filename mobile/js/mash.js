let buttonX, buttonY = 450, buttonWidth = 250, buttonHeihgt =100;
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 25;
let time;
let boughtTime;
function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');

    buttonX=(width-buttonWidth)/2;
}
function draw() {
    background(255);
    if(cnt>=MAX_cnt){
        bought=true;
        boughtTime=millis();
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
        imageMode(CENTER);
        image(img, width/2, 200, 150*2, 128*2);
        fill(0);
        textSize(25);
        textAlign(CENTER);
        text("￥29,036", width/2, 400);
        // button
        fill(78, 212, 249, map(cnt, 0, MAX_cnt, 0, 255));
        strokeWeight(3);
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill("#322F20");
        rect(buttonX, buttonY+buttonHeihgt-5, map(cnt, 0, MAX_cnt, 0, buttonWidth), 5, 5);
        fill(0);
        textSize(30);
        text("購入", width/2, buttonY + buttonHeihgt/2+10);
    }
    if(millis()-time>500 && frameCount%50==0 &&cnt>0)cnt--;
}
function touchStarted() {
    for(let i=0; i<touches.length; i++){
        if (buttonX < touches[i].x && touches[i].x<buttonX + buttonWidth && buttonY < touches[i].y && mouseY < touches[i].y + buttonHeihgt) {
            cnt++;
            time=millis();
        }
    }
    if (bought && millis()-boughtTime>1000) bought = false;
}