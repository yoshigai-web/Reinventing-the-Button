// let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeight = 100;
let buttonNum=2;
let buttonX = [80, 210], buttonY = [350, 350], buttonWidth = 70, buttonHeight = 100, isPressed=[false, false];
let bought = false;
let img;

let cnt = 0;
const MAX_cnt = 25;
let time;
let boughtTime;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    if(cnt>=MAX_cnt){
        bought=true;
        boughtTime=millis();
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
        strokeWeight(5);
        for(let i=0; i<buttonNum; i++){
            if(isPressed[i])fill(78, 212, 249);
            else fill(255);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeight, 5);
            fill(216, 128);
            rect(buttonX[i], buttonY[i]+buttonHeight, buttonWidth, -map(cnt, 0, MAX_cnt, 0, buttonHeight), 5, 5);
        }
    }
    if(millis()-time>500 && frameCount%50==0 &&cnt>0)cnt--;
}
function touchStarted() {
    checkButtons();
    if (bought && millis()-boughtTime>1000) bought = false;
}
function touchEnded(){
    // if all buttons are pressed
    // if(!isPressed.includes(false) && !bought)bought=true;
    checkButtons();
}

function checkButtons(){
    for(let i=0; i<buttonNum; i++)isPressed[i]=false;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeight) {
                isPressed[j]=true;
                cnt++;
                time=millis();
            }
        }
    }
}