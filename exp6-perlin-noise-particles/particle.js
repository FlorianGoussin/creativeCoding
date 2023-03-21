class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        // this.velocity = p5.Vector.random2D();
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 2;
        this.prevPosition = this.position.copy();
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

    // edges(width, height) {
    //     if (this.position.x > width) this.position.x = 0;
    //     if (this.position.x < 0) this.position.x = width;
    //     if (this.position.y > height) this.position.y = 0;
    //     if (this.position.y < 0) this.position.x = height;
    // }

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
        stroke(0, 5);
        strokeWeight(1);
        // point(this.position.x, this.position.y);
        line(this.position.x, this.position.y, this.prevPosition.x, this.prevPosition.y);
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }
}