const left = 80;
let sliderX = left, sliderY = 650, sliderWidth = 300, sliderHeight = 40;
let handleX = left, handleWidth = 50;
let dragged = false, bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book.jpg');
}
function draw() {
    background(255);
    if (dragged) {
        handleX += (mouseX - pmouseX);
    }
    if (handleX > sliderX + sliderWidth - handleWidth) {
        handleX = sliderX - handleWidth;
        bought = true;
    } else if (handleX < left) {
        handleX = left;
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
        // rect(handleX, sliderY, handleWidth, sliderHeight, 5);
        rect(sliderX, sliderY, handleWidth+handleX-left, sliderHeight, 5);
        fill(255);
        textSize(20);
        noStroke();
        text("購入", handleX + 5, sliderY + 28);
    }
}
function mousePressed() {
    if (handleX < mouseX && mouseX < handleX + handleWidth && sliderY < mouseY && mouseY < sliderY + sliderHeight) {
        dragged = true;
    }
    if (bought) bought = false;
}
function mouseReleased() {
    dragged = false;
    handleX = left;
}