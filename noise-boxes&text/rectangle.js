class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }
    set x(value) {
        if (typeof value !== 'number') {
            throw new Error('x must be a number.')
        }
        this._x = value 
    }
    get y() {
        return this._y;
    }
    set y(value) {
        if (typeof value !== 'number') {
            throw new Error('y must be a number.')
        }
        this._y = value 
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, width, height, angle) {
        this.point1 = new Point(x, y); // top left
        // this.point2 = new Point( // top right
        //     this.point1.x + width,
        //     this.point1.y
        // );
        // this.point3 = new Point(
        //     this.point1.x,
        //     this.point1.y + height
        // );
        // this.point4 = new Point( // bottom right
        //     this.point1.x + width,
        //     this.point1.y + height
        // );
        this.width = width;
        this.height = height;
        if (angle) {
            this.angle = angle;
        }
    }

    rotate(angle) {
        // this.point1 = rotatePoint(this.point1, this.origin, angle);
        // this.point2 = rotatePoint(this.point2, this.origin, angle);
        // this.point3 = rotatePoint(this.point3, this.origin, angle);
        // this.point4 = rotatePoint(this.point4, this.origin, angle);
        this.angle += angle;
    }
    duplicate() {
        return new Rectangle(
            this.point1.x,
            this.point1.y,
            this.width,
            this.height,
            this.angle
        );
    }

    // get width() {
    //     return this.point2.x - this.point1.x;
    // }
    // get height() {
    //     return this.point3.y - this.point1.y;
    // }
    get origin() {
        return new Point(
            (this.point1.x + this.point4.x) / 2,
            (this.point1.y + this.point4.y) / 2
        );
    }
}

// https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
function rotatePoint(point, origin, angle) {
    const newAngle = angle * Math.PI / 180.0;
    const x = Math.cos(newAngle) * (point.x - origin.x) - Math.sin(newAngle) * (point.y - origin.y) + origin.x;
    const y = Math.sin(newAngle) * (point.x - origin.x) + Math.cos(newAngle) * (point.y - origin.y) + origin.y;
    return new Point(x, y);
}

/**
 * 
 * @param {*} rectangleRef 
 * @param {*} rectangleToCheck 
 */
function intersects(rectangleRef, rectangleToCheck) {
    const rectangle1Axis1 = new Vector(
        rectangleRef.point2.x - rectangleRef.point1.x,
        rectangleRef.point2.y - rectangleRef.point1.y
    );
    




    const rectangle1Axis2 = new Vector(
        rectangleRef.point3.x - rectangleRef.point1.x,
        rectangleRef.point3.y - rectangleRef.point1.y
    );
    const rectangle2Axis1 = new Vector(
        rectangleToCheck.point2.x - rectangleToCheck.point1.x,
        rectangleToCheck.point2.y - rectangleToCheck.point1.y
    );
    const rectangle2Axis2 = new Vector(
        rectangleToCheck.point3.x - rectangleToCheck.point1.x,
        rectangleToCheck.point3.y - rectangleToCheck.point1.y
    );
}
 