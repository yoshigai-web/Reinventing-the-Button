let size = 0;
function setup() {
    let cnv=createCanvas(windowWidth, windowHeight);
    cnv.parent('myContainer');
}
function draw() {
    background(0);
    fill(255);
    text(size, 50, 50);
    
    if(size>0.8)fill(0, 255, 0);
    else fill(255);
    noStroke();
    if(mouseIsPressed)ellipse(mouseX, mouseY, 200 * size);
    else{
        for (let i = 0; i < touches.length; i++) {
            ellipse(touches[i].x, touches[i].y, 200 * size);
        }
    }
}
Pressure.set('#myContainer', {
    start: function(event) {
        console.log('start', event);
      },
      change: function(force, event) {
        size=force;
        console.log('change', force);
      },
    
      startDeepPress: function(event) {
        console.log('start deep press', event);
      },
    
      endDeepPress: function() {
        console.log('end deep press');
      },
    
      end: function() {
        console.log('end');
        size=0;
      },
    
      unsupported: function() {
        console.log(this);
      }
});