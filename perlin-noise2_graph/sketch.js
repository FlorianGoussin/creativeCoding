const width = 500;
const height = 500;
const increment = 0.01;
let start = 0;

function setup() {
    createCanvas(width, height)
}
  
function draw() {
    background(0);
    stroke(255);
    noFill();
    beginShape();
    let xOffset = start;
    for (let x = 0; x < width; x++) {
        let y = noise(xOffset) * height;
        vertex(x, y);
        xOffset += increment;
    }
    endShape();
    // noLoop();
    start += increment;
}