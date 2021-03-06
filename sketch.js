var base = [];
var theBird;
var thePipes = [];
var myWidth;
var myHeight;

let formColor = document.getElementById('color-form');
formColor.addEventListener('click', color);
let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restart);
let sketchHolder = document.getElementById('sketch-holder');
sketchHolder.addEventListener('click', onTouch);

function onTouch() {
  if (theBird.a == 0) {
    theBird.a = 0.8;
    theBird.v = 10;
    theBird.mobileUp();
  } else {
    theBird.mobileUp();
  }
}

function restart(event) {
  event.preventDefault();
  noStroke();
  cnv = createCanvas(myWidth, myHeight);
  cnv.parent('sketch-holder');
  // centerCanvas();
  theBird = new bird(colorOfBird);
  s = new score();
  thePipes = [];
  base = [];
  base.push(new Base(0));
  base.push(new Base(width));
  loop();
}

var colorOfBird = '';
function color(event) {
  colorOfBird = event.target.value;
  noStroke();
  cnv = createCanvas(myWidth, myHeight);
  cnv.parent('sketch-holder');
  theBird = new bird(colorOfBird);
  s = new score();
  thePipes = [];
  base = [];
  base.push(new Base(0));
  base.push(new Base(width));
  loop();
}

function setup() {
  myHeight = displayHeight * 0.68;
  myWidth = displayWidth * 0.95;
  noStroke();
  cnv = createCanvas(myWidth, myHeight);
  // centerCanvas();
  cnv.parent('sketch-holder');
  theBird = new bird(colorOfBird);
  s = new score();
  base.push(new Base(0));
  base.push(new Base(width));
}

function draw() {
  image(theBird.backgroundimg, 0, 0, width, height);
  //image(b.baseimg, 0, 6 * height / 8, width, height / 4);

  if (frameCount % 70 == 0) {
    if (theBird.a != 0) {
      thePipes.push(new pipe());
    }
  }

  for (var i = 0; i < thePipes.length; i++) {
    //check whether out of frame

    if (thePipes[i].outOfFrame()) {
      thePipes.shift();
      s.increase();
    }

    thePipes[i].update();
    thePipes[i].show();
    //check collision

    if (theBird.collide(thePipes[i]) || theBird.y >= (6 * height) / 8) {
      noLoop();
    }
  }

  for (var j = 0; j < base.length; j++) {
    if (base[j].outOfFrame()) {
      base.push(new Base(width * 0.98));
      base.shift();
    }

    base[j].update();
    base[j].show();
  }

  theBird.update();
  theBird.show();

  s.show();
}

function keyPressed() {
  if (key == 'j') {
    if (theBird.a == 0) {
      theBird.a = 0.7;
      theBird.v = 10;
      theBird.up();
    } else {
      theBird.up();
    }
  } else if (key == 'r') {
    noStroke();
    cnv = createCanvas(myWidth, myHeight);
    cnv.parent('sketch-holder');
    theBird = new bird(colorOfBird);
    s = new score();
    thePipes = [];
    base = [];
    base.push(new Base(0));
    base.push(new Base(width));
    loop();
  }
}
