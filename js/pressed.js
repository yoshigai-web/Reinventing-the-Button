
let buttonX = 100, buttonY = 650, buttonWidth = 250, buttonHeihgt = 50;
let bought = false;
let img;
let time;
let cnt = 0;
const MAX_cnt = 1;
function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('../img/book.jpg');
}
function draw() {
    background(255);
    if(cnt>=MAX_cnt){
        bought=true;
        cnt=0;
    }
    if (bought && millis()-time>100) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        image(img, 50, 50);
        fill(0);
        textSize(20);
        text("￥2,640", 180, 600);
        // button
        fill(157, 231, 251, bought*255);
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill(0);
        textSize(20);
        text("購入", 180 + 20, buttonY + 30);
    }
}
function mousePressed() {
    if (buttonX < mouseX && mouseX<buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt && !bought) {
        cnt++;
        time=millis();
    }
    if (bought) bought = false;
}