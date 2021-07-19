let sound;
let buttonX = 200, buttonY = 350, buttonWidth = 200, buttonHeihgt = 100;
let isPressed = false;
let isWating = false;
let time, latency = Math.random() * (5 - 0.2) + 0.2;
function setup() {
    sound = loadSound('assets/electric voice.mp3');
    createCanvas(720, 720);
}
function draw() {
    background(255);
    fill(0);
    text("Latency = " + latency.toPrecision(3)+" [s]", 100, 100);
    if (millis() - time > latency * 1000 && isWating) {
        if (!sound.isPlaying()) sound.play();
        isWating = false;
        latency = Math.random() * (5 - 0.2) + 0.2;
    }
    if (isPressed) fill(255, 0, 0);
    else if (sound.isPlaying()) fill(255);
    else if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) fill(255, 130, 130);
    else fill(255);
    strokeWeight(3);
    rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
}
function mousePressed() {
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        isPressed = true;
    }
}
function mouseReleased() {
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        time = millis();
        isWating = true;
    }
    isPressed = false;
}