function setup() {
  // put setup code here
  createCanvas(800, 800)
  background(235, 235, 211)
  frameRate(30)
  // saveCanvas('myCanvas', 'jpg');
}

var colorPallette = [[8, 61, 119], [192, 224, 222], [218, 65, 103], [244, 211, 94], [247, 135, 100]];

function getRandomColor(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var index = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  return colorPallette[index];
}

var x = 50;
var y = 50;
var stop = false;

function draw() {
  // put drawing code here
  if (!stop) {

    fill(getRandomColor(0, 4))
    ellipse(y, x, 25, 25)
    if (x == 750 && y !== 750) {
      y += 50;
      x = 50;
    } else if (y == 750 && x == 750) {
      stop = true;
    } else {
      x += 50;
    }
  }
}