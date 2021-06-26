let force=0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    document.body.addEventListener("touchstart", handle_touch);
        document.body.addEventListener("touchmove", handle_touch);
}
function draw() {
    background(255);
    for (let i = 0; i < touches.length; i++) {
        fill(216);
        ellipse(touches[i].x, touches[i].y, 100*force);
    }
}
function touchStarted() {
    
}

function handle_touch(event) {
    try {
        force=event.touches[0].force;
    } catch (e) {
        console.log("error");
    }
}