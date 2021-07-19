let sound;
let buttonX = 200, buttonY = 350, buttonWidth = 200, buttonHeihgt = 100;
let isPressed = false;
let hoverig = false;
let time;
function setup() {
    sound = loadSound('assets/electric voice.mp3');
    createCanvas(720, 720);
    textAlign(CENTER);
}
function draw() {
    background(255);
    if (isPressed || sound.isPlaying()) {
        fill(255, 0, 0);
    } else if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        fill(255, 130, 130);

    } else {
        fill(255);
    }
    if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeihgt) {
        if (!hoverig) {
            hoverig = true;
            time = millis();
        }
    } else {
        hoverig = false;
    }
    // console.log(hoverig);
    if (500 < millis() - time && millis() - time < 600 && hoverig) {
        if (!sound.isPlaying()) sound.play();
    }

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
        // if (!sound.isPlaying()) sound.play();
    }
    isPressed = false;
}