let force = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    document.body.addEventListener('touchstart', function(e) {
        for (var i=0; i < e.targetTouches.length; i++) {
          force=e.targetTouches[i].force;
          console.log("targetTouches[" + i + "].force = " + e.targetTouches[i].force);
        }
     }, false);
     
     document.body.addEventListener('touchmove', function(e) {
        for (var i=0; i < e.targetTouches.length; i++) {
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