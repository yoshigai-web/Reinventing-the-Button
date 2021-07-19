let sound;
let buttonX = 200, buttonY = 350, buttonWidth = 200, buttonHeihgt = 100;
let isPressed = false;
let time = 0, MAX_time = Math.floor(Math.random() * 200 - 20) + 20;
function setup() {
    sound = loadSound('assets/electric voice.mp3');
    createCanvas(720, 720);
    textAlign(CENTER);
    console.log(MAX_time/60);
}
function draw() {
    background(255);

    if (isPressed) time++;
    else time = 0;
    if (time > MAX_time) {
        if (!sound.isPlaying()) sound.play();
        time = 0;
        MAX_time = Math.floor(Math.random() * 200 - 20) + 20;
        console.log(MAX_time/60);
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
        isPressed = true;
    }
}
function mouseReleased() {
    isPressed = false;
}