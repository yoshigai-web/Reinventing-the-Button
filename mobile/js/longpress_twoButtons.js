let buttonNum=2;
let buttonX = [80, 210], buttonY = [250, 250], buttonWidth = 70, buttonHeight = 100, isPressed=[false, false];
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 180;
let allPressed=false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if(allPressed)cnt++;
    else if(cnt>0)cnt--;
    if(cnt>MAX_cnt){
        bought=true;
        cnt=0;
    }
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
        for(let i=0; i<buttonNum; i++){
            // draw  background
            if(isPressed[i])fill(216);
            else fill(255);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeight, 5);
            // draw progress bar
            fill(78, 212, 249);
            strokeWeight(0);
            rect(buttonX[i], buttonY[i]+buttonHeight, buttonWidth, -map(cnt, 0, MAX_cnt, 0, buttonHeight), 5);
            // draw border
            noFill();
            strokeWeight(5);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeight, 5);
        }
    }
}
function touchStarted() {
    if (bought)bought = false;
    checkButtons();
    allPressed=!isPressed.includes(false);
}
function touchEnded(){
    checkButtons();
    allPressed=!isPressed.includes(false);
}

function checkButtons(){
    for(let i=0; i<buttonNum; i++)isPressed[i]=false;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeight) {
                isPressed[j]=true;
            }
        }
    }
}