
let buttonX = 125, buttonY = 650, buttonWidth = 200, buttonHeihgt = 60;
let bought = false;
let img;

const px = 20;
let isScratched;
let time;
function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('../img/book.jpg');
    isScratched = new Array(int(buttonHeihgt / px)+5);
    for (let i = 0; i < int(buttonWidth / px)+5; i++)isScratched[i] = new Array(int(buttonWidth / px)+5);
}
function draw() {
    background(255);
    if (buttonX < mouseX && mouseX<buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt && mouseIsPressed && !bought) {
        isScratched[int((mouseX-buttonX)/px)][int((mouseY-buttonY)/px)]=true;
        bought=isComplete();
    }
    
    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
        // initialize
        for (let i = 0; i < buttonWidth / px; i++) {
            for (let j = 0; j < buttonHeihgt / px; j++) {
                isScratched[i][j]=false;
            }
        }
    } else {
        image(img, 50, 50);
        fill(0);
        textSize(20);
        text("￥2,640", 180, 600);
        // button
        fill(50, 47, 32, 128);
        strokeWeight(1);
        stroke(0);
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt);
        // scrach
        for (let i = 0; i < buttonWidth / px; i++) {
            for (let j = 0; j < buttonHeihgt / px; j++) {
                if (isScratched[i][j]) {
                    fill(255);
                    noStroke();
                    rect(buttonX + i * px, buttonY + j * px, px, px);
                }
            }
        }
        fill(0);
        textSize(20);
        noStroke();
        text("購入", 180 + 20, buttonY + 35);
    }
}
function mouseReleased() {
    if (bought) bought = false;
}
function isComplete(){
    for (let i = 0; i < buttonWidth / px; i++) {
        for (let j = 0; j < buttonHeihgt / px; j++) {
            if (!isScratched[i][j]) {
                return false;
            }
        }
    }
    return true;
}