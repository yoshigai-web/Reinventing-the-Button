let size = 0;
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvasContainer');
}
function draw() {
    background(255);
    for (let i = 0; i < touches.length; i++) {
        fill(216);
        ellipse(touches[i].x, touches[i].y, 200 * size);
    }
}
Pressure.set('#canvasContainer', {
    change: function (force, event) {
        console.log(force);
        size = force;
    }
});