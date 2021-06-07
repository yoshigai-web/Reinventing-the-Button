let dragged = false, bought = false;
let buttonX = 125, buttonY = 650, buttonWidth = 200, buttonHeihgt = 100;
let img, img2;

const IMGX=50+354/2, IMGY=50+499/2, IMGWidth=354, IMGHeight=499;
var imgX=IMGX, imgY=IMGY, imgWidth=IMGWidth, imgHeight=IMGHeight;

function setup() {
    createCanvas(windowHeight, windowWidth);
    img=loadImage('../img/book.jpg');
    imageMode(CENTER);
}
function draw() {
    background(255);
    
    if(bought){
        fill(0);
        textSize(30);
        text("Thank you for shopping!", 100, 400);
        textSize(20);
        text("Click to back.", 200, 450);
    }else{
        image(img, IMGX, IMGY);
        

        fill(0);
        textSize(20);
        text("￥2,640", 180, 600);
        if(buttonX<imgX && imgX<buttonX+buttonWidth && buttonY<imgY && imgY<buttonY+buttonHeihgt)fill(192);
        else fill("#322F20");
        rect(buttonX, buttonY, buttonWidth, buttonHeihgt, 5);
        fill(255);
        textSize(20);
        text("購入", 180 + 20, buttonY+55);

        if(dragged){
            image(img, imgX, imgY, imgWidth, imgHeight);
            imgX+=mouseX - pmouseX;
            imgY+=mouseY-pmouseY;
            imgWidth=IMGWidth-map(imgY-IMGY, 0, 600, 0, IMGWidth);
            imgHeight=IMGHeight-map(imgY-IMGY, 0, 600, 0, IMGHeight);
            
        }
    }
}
function mousePressed() {
    if(IMGX-IMGWidth/2<mouseX && mouseX<IMGX+IMGWidth/2 && IMGY-IMGHeight/2<mouseY && mouseY <IMGY+IMGHeight/2)dragged=true;
    if (bought) bought = false;
}
function mouseReleased() {
    if(buttonX<imgX && imgX<buttonX+buttonWidth && buttonY<imgY && imgY<buttonY+buttonHeihgt){
        bought=true;
    }
    dragged = false;
    imgX=IMGX, imgY=IMGY, imgWidth=IMGWidth, imgHeight=IMGHeight;
    handleY = TOP;
}