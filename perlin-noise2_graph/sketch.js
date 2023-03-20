const WIDTH = 500;
const HEIGHT = 500;

let xOffset = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT)
}
  
function draw() {
    background(0);
    stroke(255);
    noFill();
    beginShape();
    for (let x = 0; x < WIDTH; x++) {
        let y = noise(xOffset) * HEIGHT;
        vertex(x, y);
        xOffset += 0.01;
    }
    endShape();
    noLoop();
}