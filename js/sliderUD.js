const TOP = 570;
let sliderX = 80, sliderY = TOP, sliderWidth = 300, sliderHeight = 200;
let handleY = TOP, handleHeight = 50;
let dragged = false, bought = false;
let img;

function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('../img/book.jpg');
}
function draw() {
    background(255);
    if (dragged) {
        handleY += (mouseY - pmouseY);
    }
    if (handleY + sliderHeight - handleHeight < TOP) {
        handleY = handleY + sliderHeight - handleHeight;
        bought = true;
    } else if (handleY > sliderY) {
        handleY = TOP;
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
        // slider
        noFill();
        stroke(128);
        rect(sliderX, sliderY, sliderWidth, sliderHeight, 5);
        // handle
        fill("#322F20");
        // rect(sliderX, handleY + sliderHeight - handleHeight, sliderWidth, handleHeight, 5);
        rect(sliderX, handleY + sliderHeight - handleHeight, sliderWidth, handleHeight+TOP-handleY, 5);
        fill(255);
        textSize(20);
        text("購入", 180 + 25, handleY + sliderHeight - 20);
    }
}
function mousePressed() {
    if (sliderX < mouseX && mouseX < sliderX + sliderWidth && handleY + sliderHeight - handleHeight < mouseY && mouseY < handleY + sliderHeight) {
        dragged = true;
    }
    if (bought) bought = false;
}
function mouseReleased() {
    dragged = false;
    handleY = TOP;
}