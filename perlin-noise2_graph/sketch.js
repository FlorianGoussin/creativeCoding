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
        // let y = noise(xOffset) * height;

        // sin gives values between -1 and 1 so we push it by height/2 and then reajust the amplitude
        // let y = height/2 + sin(xOffset) * height/2; 
        // let y = noise(xOffset)*50 + height/2 + sin(xOffset) * height/4; 

        // Mixing a wave form and perlin noise is a technique that can be applied for other things
        // e.g. Make letters look more like hand writing
        // const noiseVal = map(noise(xOffset), 0, 1, -50, 50); // Not dependend of the height so secondary here
        // const sinVal = map(noise(xOffset), -1, 1, 0, height);

        const noiseVal = map(noise(xOffset), 0, 1, 0, height); // Dependend of the height so primary here
        const sinVal = map(noise(xOffset), -1, 1, -50, 50);
        let y = noiseVal + sinVal;

        vertex(x, y);
        xOffset += increment;
    }
    endShape();
    // noLoop();
    start += increment;
}