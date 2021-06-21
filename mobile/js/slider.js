let buttonX, buttonY = 350, buttonWidth = 70, buttonHeight = 200, dragID=-1, sliderY=10, isCompleted=false;
let py=0;
let bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    buttonX=width/2-buttonWidth/2;
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    for(let i=0; i<touches.length; i++){
        if(i==dragID){
            sliderY+=py-touches[i].y;
            if(sliderY<10){
                sliderY=10;
            }else if(sliderY>buttonHeight){
                sliderY=buttonHeight;
                isCompleted=true;
            }else{
                isCompleted=false;
            }
        }
    }
    if(isCompleted){
        bought=true;
        sliderY=[10];
    }
    if (bought) {
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("Thank you for shopping!", width/2, 200);
        textSize(20);
        text("Click to back.", width/2, 250);
    } else {
        imageMode(CENTER)
        image(img, width/2, 150, 150*1.5, 128*1.5);
        fill(0);
        textSize(30);
        textAlign(CENTER);
        text("￥29,036 ", width/2, 300);
        // draw button
        // draw  background
        if(dragID!=-1)fill(216);
        else fill(255);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);
        // draw progress bar
        fill(78, 212, 249);
        strokeWeight(0);
        rect(buttonX, buttonY+buttonHeight, buttonWidth, -sliderY, 5);
        // draw border
        noFill();
        strokeWeight(5);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);
    }
    for(let i=0; i<touches.length; i++){
        if(i==dragID)py=touches[i].y;
    }
}
function touchStarted() {
    checkButtons();
    for(let i=0; i<touches.length; i++){
        if(i==dragID)py=touches[i].y;
    }
    if (bought)bought = false;
}
function touchEnded(){
    checkButtons();
    if(dragID==-1)sliderY=10;
}

function checkButtons(){
    dragID=-1;
    for(let i=0; i<touches.length; i++){
        if (buttonX < touches[i].x && touches[i].x<buttonX + buttonWidth && buttonY < touches[i].y && touches[i].y < buttonY + buttonHeight) {
            dragID=i;
        }
    }
}