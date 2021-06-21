// let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeihgt = 100;
let buttonNum=2;
let buttonX = [90, 220], buttonY = [250, 250], buttonWidth = 50, buttonHeihgt = 50, isPressed=[false, false];
let bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    // if all buttons are pressed
    for(let i=0; i<buttonNum; i++){
        if(isPressed[i]==false)break;
        if(i==buttonNum-1){
            bought=true;
            for(let j=0; j<buttonNum; j++)isPressed[j]=false;
        }
    }
    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 15, 100);
        textSize(20);
        text("Click to back.", 120, 150);
    } else {
        image(img, 100, 45, 150, 128);
        fill(0);
        textSize(30);
        text("￥29,036", 110, 220);
        // button
        for(let i=0; i<buttonNum; i++){
            if(isPressed[i])fill(78, 212, 249);
            else fill(255);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeihgt, 5);
        }
        fill(0);
        textSize(60);
        text("購入", buttonX + 40, buttonY + 75);
    }
}
function touchStarted() {
    if (bought)bought = false;

    for(let i=0; i<buttonNum; i++)isPressed[i]=false;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeihgt) {
                isPressed[j]=true;
            }
        }
    }
}
function touchEnded(){
    for(let i=0; i<buttonNum; i++)isPressed[i]=false;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeihgt) {
                isPressed[j]=true;
            }
        }
    }
}