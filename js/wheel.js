const TOP = 570;
let sliderX = 80, sliderY = TOP, sliderWidth = 300, sliderHeight = 200;
let handleY = TOP, handleHeight = 50;
let bought = false;
let img;
let time;
function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book.jpg');
}
function draw() {
    background(255);
    if (handleY + sliderHeight - handleHeight < TOP) {
        handleY = TOP-sliderHeight+handleHeight;
        bought = true;
        time=millis();
    } else if (handleY > sliderY) {
        handleY = TOP;
    }
    if (bought && millis()-time>50) {
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
        fill("#9DE7FB");
        // rect(sliderX, handleY + sliderHeight - handleHeight, sliderWidth, handleHeight+TOP-handleY, 5);
        rect(sliderX, handleY + sliderHeight - handleHeight, sliderWidth, handleHeight+TOP-handleY, 5);
        fill(0);
        textSize(20);
        noStroke();
        text("購入", 180 + 20, handleY + sliderHeight - 20);
    }
}
function mousePressed() {
    if (bought) {
        bought = false;
    }
    handleY = TOP;
}
function mouseReleased() {
    
}
function mouseWheel(event) {
    if(!bought && sliderX<mouseX && mouseX<sliderX+sliderWidth && sliderY<mouseY && mouseY<sliderY+sliderHeight)handleY-=event.delta*0.05;
}