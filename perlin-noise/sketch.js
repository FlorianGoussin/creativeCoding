const WIDTH = 500;
const HEIGHT = 500;

let xOffset = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT)
}
  
function draw() {
    background(0);
    const noiseVal = noise(xOffset);
    const x = map(noiseVal, 0, 1, 0, WIDTH);
    ellipse(x, HEIGHT/2, 40, 40);
    xOffset += 0.01;
}