const strokeWeightVal = 1.5;
const alphaVal = 0.2;

class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        // this.velocity = p5.Vector.random2D();
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 2;
        this.prevPosition = this.position.copy();
        this.color = random(255) > 50 
            ? `rgba(0,0,0,${(alphaVal/4).toString()})` 
            : `rgba(255,36,0,${alphaVal.toString()})`;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    get x() { 
        return this.position.x;
    }
    set x(x) {
        this.position.x = x;
        this.prevPosition.x = this.position.x;
    }

    get y() { 
        return this.position.y;
    }
    set y(y) {
        this.position.x = y;
        this.prevPosition.y = this.position.y;
    }

    show() {
        stroke(this.color);
        strokeWeight(strokeWeightVal);
        // point(this.position.x, this.position.y);
        line(this.position.x, this.position.y, this.prevPosition.x, this.prevPosition.y);
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }
}