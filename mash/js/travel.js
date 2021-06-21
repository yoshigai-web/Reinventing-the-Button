
let buttonX = 845, buttonY = 875, buttonWidth = 160, buttonHeihgt = 55;
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 30;
let time;
function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/travel.png');
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
        image(img, 75, 180);
        // button
        fill(78, 212, 249, map(cnt, 0, MAX_cnt, 0, 255));
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill("#322F20");
        rect(buttonX, buttonY+buttonHeihgt-5, map(cnt, 0, MAX_cnt, 0, buttonWidth), 5, 5);
        fill(0);
        textSize(20);
        text("予約", buttonX + 55, buttonY +35);
    }
    if(millis()-time>500 && frameCount%50==0 &&cnt>0)cnt--;
}
function mousePressed() {
    if (buttonX < mouseX && mouseX<buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        cnt++;
        time=millis();
    }
    if (bought) bought = false;
}