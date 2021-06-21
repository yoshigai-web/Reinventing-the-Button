let buttonX, buttonY = 350, buttonWidth = 70, buttonHeight = 200, dragged = false, sliderY = 10;
let py = 0;
let bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    buttonX = width / 2 - buttonWidth / 2;
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if (touches.length == 1) {
        sliderY += (py - touches[0].y) / 2;
        if (sliderY < 10) {
            sliderY = 10;
        } else if (sliderY > buttonHeight) {
            sliderY = buttonHeight;
            bought = true;
            sliderY = 10;
        }
    }
    if (bought) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("Thank you for shopping!", width / 2, 200);
        textSize(20);
        text("Click to back.", width / 2, 250);
    } else {
        imageMode(CENTER)
        image(img, width / 2, 150, 150 * 1.5, 128 * 1.5);
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("￥29,036 ", width / 2, 300);
        // draw button
        // draw  background
        if (dragged) fill(216);
        else fill(255);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);
        // draw progress bar
        fill(78, 212, 249);
        strokeWeight(0);
        rect(buttonX, buttonY + buttonHeight, buttonWidth, -sliderY, 5);
        // draw border
        noFill();
        strokeWeight(5);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);
    }
    if (touches.length == 1) py = touches[0].y;
}
function touchStarted() {
    checkButtons();
    if (touches.length == 1) py = touches[0].y;
    if (bought) bought = false;
}
function touchEnded() {
    checkButtons();
    if (!dragged) sliderY = 10;
}

function checkButtons() {
    dragged = false;
    if (touches.length == 1) {
        if (buttonX < touches[0].x && touches[0].x < buttonX + buttonWidth && buttonY < touches[0].y && touches[0].y < buttonY + buttonHeight) {
            dragged = true;
        }
    }
}