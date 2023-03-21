window.increment = 0.1;
const width = 200;
const height = 200;
const scaleVal = 10; // number of pixels for each vector
let cols, rows;
let zOffset = 0;

function setup() {
    createCanvas(width, height);
    pixelDensity(1); // Workaround for high density displays like Retina
    cols = floor(width / scaleVal);
    rows = floor(height / scaleVal); 
}
  
function draw() {
    background(255);
    randomSeed(); // check documentation
    noiseDetail(10);
    let yOffset = 0;
    for (let x = 0; x < cols; x++) {
        let xOffset = 0;
        for (let y = 0; y < rows; y++) {
            const r = noise(xOffset, yOffset, zOffset) * TWO_PI;
            const vect = p5.Vector.fromAngle(r);
            stroke(0);
            push();
            translate(x * scaleVal, y * scaleVal);
            rotate(vect.heading());
            rotate(PI / 2);
            line(0, 0, scaleVal, 0);
            pop();
            // fill(random(255));
            fill(r);
            // rect(x * scaleVal, y * scaleVal, scaleVal, scaleVal);
            xOffset += increment;
        }
        yOffset += increment;
        zOffset += increment / 10;
    }
    // noLoop();
}