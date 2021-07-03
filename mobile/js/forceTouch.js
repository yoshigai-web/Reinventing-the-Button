let size = 0;
let buttonX = 80, buttonY = 250, buttonWidth = 200, buttonHeight = 100;
let bought = false;
let img;

const MAX_size = 0.99;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('myContainer');
  img = loadImage('https://raw.githubusercontent.com/yoshigai-web/Reinventing-the-Button/main/img/airpods.jpg');
}
function draw() {
  background(255);
  if (size > MAX_size) {
    bought = true;
  }
  if (bought) {
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("Thank you for shopping!", width / 2, 200);
    textSize(20);
    text("Click to back.", width / 2, 250);
  } else {
    fill(0);
    textSize(12);
    text(size, 50, 400);
    image(img, 100, 45, 150, 128);
    fill(0);
    textSize(30);
    textAlign(LEFT);
    text("￥29,036", 110, 220);
    // button
    fill(78, 212, 249, map(size, 0, MAX_size, 0, 255));
    rect(buttonX+map(size, 0, MAX_size, 0, 10), buttonY+map(size, 0, MAX_size, 0, 10), buttonWidth-+map(size, 0, MAX_size, 0, 20), buttonHeight-+map(size, 0, MAX_size, 0, 20), 5);
    fill("#322F20");
    strokeWeight(5);
    rect(buttonX+map(size, 0, MAX_size, 0, 10), buttonY -map(size, 0, MAX_size, 0, 10) + buttonHeight - 5, map(size, 0, MAX_size, 0, buttonWidth)-map(size, 0, MAX_size, 0, 20), 5, 5);
    fill(0);
    textSize(60-map(size, 0, MAX_size, 0, 20));
    text("購入", buttonX + 40+map(size, 0, MAX_size, 0, 20), buttonY + 75);
  }
}
function touchStarted() {
  if (bought) bought = false;
}


Pressure.set('#myContainer', {
  start: function (event) {
    console.log('start', event);
  },
  change: function (force, event) {
    size = 0;
    if (mouseIsPressed) {
      if (buttonX < mouseX && mouseX < buttonX + buttonWidth && buttonY < mouseY && mouseY < buttonY + buttonHeight) {
        size = force;
      }
    }
    for (let i = 0; i < touches.length; i++) {
      if (buttonX < touches[i].x && touches[i].x < buttonX + buttonWidth && buttonY < touches[i].y && touches[i].y < buttonY + buttonHeight) {
        size = force;
      }
    }
    console.log('change', force);
  },

  startDeepPress: function (event) {
    console.log('start deep press', event);
  },

  endDeepPress: function () {
    console.log('end deep press');
  },

  end: function () {
    console.log('end');
    size = 0;
  },

  unsupported: function () {
    console.log(this);
  }
});