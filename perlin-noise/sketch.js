const WIDTH = 500;
const HEIGHT = 500;

let xOffset1 = 0;
let xOffset2 = 10000;

function setup() {
    createCanvas(WIDTH, HEIGHT)
}
  
function draw() {
    background(0);
    const noiseVal1 = noise(xOffset1);
    const noiseVal2 = noise(xOffset2);
    const x = map(noiseVal1, 0, 1, 0, WIDTH);
    const y = map(noiseVal2, 0, 1, 0, WIDTH);
    ellipse(x, y, 40, 40);
    xOffset1 += 0.01;
    xOffset2 += 0.01;
}