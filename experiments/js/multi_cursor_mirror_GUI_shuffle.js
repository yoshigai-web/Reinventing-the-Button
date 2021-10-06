let btnX, btnY, btnW = 70, btnH = 70;
let btnPressed = false;
let cursorImg;
let sound;
let pressedTime;
function setup() {
    createCanvas(1200, 800);
    noCursor();
    cursorImg = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/cursor.png');
    sound = loadSound('assets/electric voice.mp3');
    rectMode(CENTER);
    btnX = width / 2, btnY = height / 2;
}
function draw() {
    background(255);
    drawButton();
    drawCursor();
    if (btnPressed) {
        if (int(random(10 * 30)) == 0) sound.play();
    }
    if (btnPressed && millis() - pressedTime > 500) {
        btnPressed = false;
    }
}
function drawButton() {
    if (btnPressed) fill(255, 0, 0);
    else if (btnX - 100 < mouseX && mouseX < btnX + btnW + 100 && btnY - 100 < mouseY && mouseY < btnY + btnH + 100) fill(255, 100, 100, 100);
    else fill(255);
    rect(btnX, btnY, btnW, btnH);
}
function drawCursor() {
    push();
        translate(mouseX, mouseY);
        image(cursorImg, 0, 0, 286 * 0.08, 429 * 0.08);
    pop();

    push();
        translate(width - mouseX, mouseY);
        rotate(PI/4);
        image(cursorImg, 0, 0, 286 * 0.08, 429 * 0.08);
    pop();

    push()
        translate(mouseX, height - mouseY,);
        rotate(PI*4/3);
        image(cursorImg, 0, 0, 286 * 0.08, 429 * 0.08);
    pop();

    push();
        translate(width - mouseX, height - mouseY);
        rotate(PI);
        image(cursorImg, 0, 0, 286 * 0.08, 429 * 0.08);
    pop();
    
}
function mousePressed() {
    if (btnX - btnW / 2 < mouseX && mouseX < btnX + btnW / 2 && btnY - btnH / 2 < mouseY && mouseY < btnY + btnH) {
        btnPressed = !btnPressed;
        pressedTime = millis();
    }
}