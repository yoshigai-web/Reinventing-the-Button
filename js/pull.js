const TOP = 630, handleWIDTH=300, handleXX=80;
// let sliderX = 80, sliderY = TOP, sliderWidth = 300, sliderHeight = 200;
let handleX=handleXX, handleY = TOP, handleWidth=handleWIDTH, handleHeight = 50;
let dragged = false, bought = false, flying=false;
let power;
let img;

function setup() {
    createCanvas(windowHeight, windowWidth);
    img = loadImage('../img/book.jpg');
}
function draw() {
    background(255);
    if (dragged) {
        if(handleY>=TOP)handleY += (mouseY - pmouseY);
        // 下限
        if(handleY>=TOP+150){
            handleY=TOP+150;
        }
        // handle size
        handleX=80+(handleY-TOP)/2;
        handleWidth=300-(handleY-TOP);
    }else if(flying){
        handleY-=power;
        handleX=80+(handleY-TOP)/2;
        handleWidth=300-(handleY-TOP);
    }else{
        // initialize
        handleWidth=handleWIDTH;
        handleX=handleXX;
        handleY = TOP;
        flying=false;
    }
    

    if(handleY+handleHeight<0){
        bought=true;
        // initialize
        handleWidth=handleWIDTH;
        handleX=handleXX;
        handleY = TOP;
        flying=false;
    }
    
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
        
        // target
        noFill();
        rect(80+75, TOP+150, 150 ,handleHeight, 5);
        fill(0);
        text("購入", 180 + 30, TOP + 150+30);

        // handle
        fill("#322F20");
        rect(handleX, handleY, handleWidth, handleHeight, 5);
        fill(255);
        textSize(20);
        text("購入", 180 + 30, handleY + 30);
    }
}
function mousePressed() {
    if (handleX < mouseX && mouseX < handleX+handleWidth && handleY < mouseY && mouseY < handleY + handleHeight) {
        dragged = true;
    }
    if (bought) bought = false;
}
function mouseReleased() {
    dragged = false;
    power=(handleY-TOP)/3;
    if(handleY>=TOP+150){
        flying=true;
    }
}