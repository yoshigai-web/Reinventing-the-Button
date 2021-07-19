let sound;
let buttonX = 200, buttonY = 350, buttonWidth = 200, buttonHeihgt = 100;
let isPressed = false;
let cnt = 0, MAX_cnt = Math.floor(Math.random() * 25 - 3) + 3;
function setup() {
    sound = loadSound('assets/electric voice.mp3');
    createCanvas(720, 720);
    textAlign(CENTER);
    console.log(MAX_cnt);
}
function draw() {
    background(255);

    if (cnt > MAX_cnt) {
        if (!sound.isPlaying()) sound.play();
        cnt = 0;
        MAX_cnt = Math.floor(Math.random() * 25 - 3) + 3;
        console.log(MAX_cnt)+1;
    }

    if (isPressed) fill(255, 0, 0);
    else if (sound.isPlaying()) fill(255);
    else if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) fill(255, 130, 130);
    else fill(255);
    strokeWeight(3);
    rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
    fill(0);
    textSize(20);
    // text("SHOCK", buttonX + buttonWidth / 2, buttonY + buttonHeihgt / 2 + 8);
}
function mousePressed() {
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        if (!sound.isPlaying()) isPressed = true;
    }
}
function mouseReleased() {
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        if (!sound.isPlaying()) cnt++;
    }
    isPressed = false;
}