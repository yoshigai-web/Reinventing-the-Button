
let buttonX = 100, buttonY = 670, buttonWidth = 250, buttonHeihgt = 50;
let mode=0;   // 0: 購入, 1: キャンセル, 2: お買い上げありがとう
let img;

let time;
const limitTime=5*1000;
function setup() {
    createCanvas(windowWidth, windowHeight);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book.jpg');
}
function draw() {
    background(255);

    if(mode==0 || mode==1){
        image(img, 50, 50);
        fill(0);
        textSize(25);
        text("￥2,640", 170, 600);
        
        if(mode==0){
            // button
            fill("#9DE7FB");
            noStroke();
            rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
            fill(0);
            textSize(20);
            text("購入", 180 + 20, buttonY + 30);
        }else{
            // button
            fill(128);
            noStroke();
            rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
            fill(255);
            textSize(20);
            text("考え直す", 180, buttonY + 30);
            fill(0);
            // text(int((limitTime-(millis()-time))/1000)+1+"秒後に請求", 180-10, buttonY+90);
            text("24時間後に請求", 180-35, buttonY-20);
            noStroke();
            fill(255, 196);
            rect(0, 0, 450, 550);
            fill(0);
            textSize(50);
            text("購入済み", 130, 300);
            rect(170, 600-10, 100, 5);
        }
    
        // if (mode==1 && millis()-time>limitTime) {
        //     mode=2;
        // }
    }else if(mode==2){
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    }
    // text(mode, 20, 20);
}
function mousePressed() {
    
}
function mouseReleased(){
    if (buttonX < mouseX && mouseX<buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        if(mode==0)mode=1;    // キャンセル画面へ
        else if(mode==1)mode=0;   // 購入画面へ戻る
        // bought=true;
        time=millis();
    }
    if(mode==2)mode=0;
}