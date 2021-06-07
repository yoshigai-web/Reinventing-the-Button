
let knobX=220, knobY=690, knobSize=100;
let bought = false, dragged=false;
let img;


function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/book.jpg');
    rad=140;
}
function draw() {
    background(255);
    
    if(dragged)rad=degrees(atan2(mouseY-knobY, mouseX-knobX));

    if(30<=rad && rad<=40){
        bought=true;
        rad=140;
    }else if(30<rad && rad<140){
        rad=140;
    }
    // text(rad, 10, 20);
    if (bought) {
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    } else {
        image(img, 50, 50);
        fill(0);
        textSize(20);
        text("￥2,640", 180, 600);
        
        // knob
        fill(0, 64);
        stroke(0);
        arc(knobX, knobY, knobSize, knobSize, radians(140), radians(40), PIE);
        
        fill("#322F20");
        arc(knobX, knobY, knobSize, knobSize, radians(140), radians(rad), PIE);
        ellipse(knobX+(knobSize/2)*cos(radians(rad)), knobY+(knobSize/2)*sin(radians(rad)), 20, 20);

        fill(255);
        textSize(20);
        noStroke();
        text("購入", 180 + 20, knobY-10);
    }
    
}
function mousePressed() {
    if(dist(mouseX, mouseY, knobX+(knobSize/2)*cos(radians(rad)), knobY+(knobSize/2)*sin(radians(rad)))<20 && mouseIsPressed)dragged=true;
    if (bought) bought = false;
}
function mouseReleased(){
    dragged=false;
    rad=140;
}