function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    fill('magenta');
    for (var i = 0; i < touches.length; i++) {
        ellipse(touches[i].x, touches[i].y, 50, 50);
    }
}