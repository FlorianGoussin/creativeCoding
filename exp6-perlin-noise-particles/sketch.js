window.increment = 0.1;
const width = 200;
const height = 200;
const scaleVal = 10; // number of pixels for each vector
let cols, rows;
let zOffset = 0;

let particles = [];
let flowfield = [];

function setup() {
    createCanvas(width, height);
    pixelDensity(1); // Workaround for high density displays like Retina
    cols = floor(width / scaleVal);
    rows = floor(height / scaleVal);

    for (let i = 0; i < 200; i++) {
        particles[i] = new Particle(random(width), random(height));
    }

    background(255);
}
  
function draw() {
    randomSeed(); // check documentation
    noiseDetail(10);
    let yOffset = 0;
    for (let x = 0; x < cols; x++) {
        let xOffset = 0;
        for (let y = 0; y < rows; y++) {
            const index = x + y * cols; // for flowfield
            const r = noise(xOffset, yOffset, zOffset) * TWO_PI * 4;
            const vect = p5.Vector.fromAngle(r);
            vect.setMag(1);

            // drawVector(vect, x, y);

            // fill(random(255));
            // fill(r);
            // rect(x * scaleVal, y * scaleVal, scaleVal, scaleVal);
            flowfield[index] = vect;
            xOffset += increment;
        }
        yOffset += increment;
        zOffset += increment / 500;
    }
    // noLoop();

    function drawVector(vect, x, y) {
        strokeWeight(1);
        stroke(0, 50); // show the vector with a bit of transparency to see the particles
        push();
        translate(x * scaleVal, y * scaleVal);
        rotate(vect.heading());
        line(0, 0, scaleVal, 0);
        pop();
    }

    for (let particle of particles) {
        // particle.edges(width, height);
        checkEdges(particle);
        particle.update();
        particle.show();
        follow(particle, flowfield);
    }

    function follow(particle, vectors) {
        const x = floor(particle.position.x / scaleVal);
        const y = floor(particle.position.y / scaleVal);
        const index = x + y * cols;
        const force = vectors[index];
        particle.applyForce(force);
    }

    function checkEdges(particle) {
        if (particle.position.x > width) {
            particle.x = 0;
        }
        if (particle.position.x < 0) {
            particle.x = width;
        }
        if (particle.position.y > height) {
            particle.y = 0;
        }
        if (particle.position.y < 0) {
            particle.y = height;
        }
    }
}