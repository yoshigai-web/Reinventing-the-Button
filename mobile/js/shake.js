
let buttonX = 100, buttonY = 650, buttonWidth = 250, buttonHeihgt = 50;
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 150;
let time;
function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
    setShakeThreshold(40);
}
function draw() {
    background(255);
    if(cnt>=MAX_cnt){
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
        image(img, 50, 180, 150*2, 128*2);
        fill(0);
        textSize(25);
        text("￥29,036", 140, 600);
        // bar
        fill(50, 47, 32, 128);
        noStroke();
        rect(0, height, width, -map(cnt, 0, MAX_cnt, 0, height));
    }
    if(millis()-time>500 && frameCount%50==0 &&cnt>0)cnt--;
}
function mousePressed() {
    if (bought) bought = false;
}
function deviceShaken(){
    cnt++;
    time=millis();
}