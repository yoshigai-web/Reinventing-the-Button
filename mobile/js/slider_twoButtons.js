let buttonNum=2;
let buttonX = [80, 210], buttonY = [250, 250], buttonWidth = 70, buttonHeight = 150, dragID=[-1, -1], sliderY=[10, 10], isCompleted=[false, false]; // per buttons
let py=[0, 0];  // per touches
let bought = false;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
    background(255);
    for(let i=0; i<touches.length; i++){
        sliderY[dragID.indexOf(i)]+=py[i]-touches[i].y;
        if(sliderY[dragID.indexOf(i)]<10){
            sliderY[dragID.indexOf(i)]=10;
        }else if(sliderY[dragID.indexOf(i)]>buttonHeight){
            sliderY[dragID.indexOf(i)]=buttonHeight;
            isCompleted[i]=true;
        }else{
            isCompleted[i]=false;
        }
    }
    if(!isCompleted.includes(false)){
        bought=true;
        sliderY=[10, 10];
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
            if(dragID[i]!=-1)fill(216);
            else fill(255);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeight, 5);
            // draw progress bar
            fill(78, 212, 249);
            strokeWeight(0);
            rect(buttonX[i], buttonY[i]+buttonHeight, buttonWidth, -sliderY[i], 5);
            // draw border
            noFill();
            strokeWeight(5);
            rect(buttonX[i], buttonY[i], buttonWidth, buttonHeight, 5);
        }
    }
    for(let i=0; i<touches.length; i++)py[i]=touches[i].y;
}
function touchStarted() {
    for(let i=0; i<touches.length; i++)py[i]=touches[i].y;
    if (bought)bought = false;
    checkButtons();
}
function touchEnded(){
    checkButtons();
    for(let i=0; i<buttonNum; i++){
        if(dragID[i]==-1)sliderY[i]=10;
    }
}

function checkButtons(){
    for(let i=0; i<buttonNum; i++)dragID[i]=-1;
    for(let i=0; i<touches.length; i++){
        for(let j=0; j<buttonNum; j++){
            if (buttonX[j] < touches[i].x && touches[i].x<buttonX[j] + buttonWidth && buttonY[j] < touches[i].y && touches[i].y < buttonY[j] + buttonHeight) {
                dragID[j]=i;
            }
        }
    }
}