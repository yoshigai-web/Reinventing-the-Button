// let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeihgt = 100;
let buttonNum=3;
let buttonX = [30, 155, 280], buttonY = [250, 250, 250], buttonWidth = 70, buttonHeihgt = 100, isPressed=[false, false, false];
let bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    
    if (bought) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("Thank you for shopping!", width/2, 200);
        textSize(20);
        text("Click to back.", width/2, 250);
    } else {
        image(img, 100, 45, 150, 128);
        fill(0);
        textSize(30);
        textAlign(LEFT);
        text("￥29,036", 110, 220);
        // draw button
        strokeWeight(5);
        for(let i=0; i<buttonNum; i++){
            if(isPressed[i])fill(78, 212, 249);
            else fill(255);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeihgt, 5);
        }
    }
}
function touchStarted() {
    if (bought)bought = false;
    checkButtons();
}
function touchEnded(){
    // if all buttons are pressed
    if(!isPressed.includes(false) && !bought)bought=true;
    checkButtons();
}

function checkButtons(){
    for(let i=0; i<buttonNum; i++)isPressed[i]=false;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeihgt) {
                isPressed[j]=true;
            }
        }
    }
}