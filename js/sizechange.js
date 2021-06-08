
let buttonX = 225, buttonY = 700, buttonWidth, buttonHeihgt;
let bought = false;
let img;

let dragged=false;
let cnt = 0;
const MAX_cnt = 1;
function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book.jpg');
    rectMode(CENTER);
    buttonWidth = random(50, 250), buttonHeihgt = random(40, 200);
}
function draw() {
    background(255);
    if(cnt>=MAX_cnt){
        bought=true;
        buttonWidth = random(50, 250), buttonHeihgt = random(40, 200);
        cnt=0;
    }
    if (bought) {
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
        if (!mouseIsPressed && buttonX-buttonWidth/2 < mouseX && mouseX<buttonX + buttonWidth/2 && buttonY-buttonHeihgt/2 < mouseY && mouseY < buttonY + buttonHeihgt/2){
            fill(157, 231, 251, 64);
        }else{
            fill(157, 231, 251, dragged*255);
        }
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill(0);
        textSize(20);
        text("購入", buttonX-20, buttonY+5);
    }
}
function mousePressed() {
    if (buttonX-buttonWidth/2 < mouseX && mouseX<buttonX + buttonWidth/2 && buttonY-buttonHeihgt/2 < mouseY && mouseY < buttonY + buttonHeihgt/2 &!bought) {
        dragged=true;
    }
}
function mouseReleased(){
    if (buttonX-buttonWidth/2 < mouseX && mouseX<buttonX + buttonWidth/2 && buttonY-buttonHeihgt/2 < mouseY && mouseY < buttonY + buttonHeihgt/2 &!bought) {
        cnt++;
        time=millis();
    }
    dragged=false;
    if (bought) bought = false;
}