const width = 200;
const height = 200;
window.increment = 0.01;

function setup() {
    createCanvas(width, height);
    pixelDensity(1); // Workaround for high density displays like Retina
}
  
function draw() {
    noiseDetail(10);
    loadPixels();
    let yOffset = 0;
    for (let x = 0; x < width; x++) {
        let xOffset = 0;
        for (let y = 0; y < width; y++) {
            const index = (x + y * width) * 4;
            // const r = random(255);
            const r = noise(xOffset, yOffset) * 255;
            pixels[index+0] = r; // red
            pixels[index+1] = r; // green
            pixels[index+2] = r; // blue
            pixels[index+3] = 255; // alpha
            xOffset += increment;
        }
        yOffset += increment;
    }
    updatePixels();
    noLoop();
}