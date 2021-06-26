let force = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    // document.body.addEventListener("touchstart", handle_touch);
    document.body.addEventListener('touchstart', function(e) {
        // Iterate through the list of touch points and log each touch
        // point's force.
        for (var i=0; i < e.targetTouches.length; i++) {
          // Add code to "switch" based on the force value. For example
          // minimum pressure vs. maximum pressure could result in
          // different handling of the user's input.
          force=e.targetTouches[i].force;
          console.log("targetTouches[" + i + "].force = " + e.targetTouches[i].force);
        }
     }, false);
}
function draw() {
    background(255);
    for (let i = 0; i < touches.length; i++) {
        fill(216);
        ellipse(touches[i].x, touches[i].y, 200 * force);
    }
}