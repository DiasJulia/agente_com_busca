// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

class Vehicle {
    constructor(x, y) {
        this.initialX = x;
        this.initialY = y;

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 1;
        this.maxForce = 0.25;
        this.r = 16;

        this.collectedFoods = 0;

        this.path = [];
    }

    reset() {
        this.pos.x = this.initialX;
        this.pos.y = this.initialY;
    }

    /*addaptSpeed(matrix) {
        let i = round(this.pos.x / TILE_SIZE);
        let j = round(this.pos.y / TILE_SIZE);
        if (i > 7) i = 7;
        if (j > 7) j = 7;
        if (i < 0) i = 0;
        if (j < 0) j = 0;
        this.maxSpeed = matrix[i][j] + 1;

        console.log(this.maxSpeed);
    }*/

    seek(target) {
        let force = p5.Vector.mult((p5.Vector.sub(target, this.pos)), 10);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        this.applyForce(force);
    }

    applyForce(force) {
        this.pos.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        this.edges();
    }

    show() {
        stroke('#d1a162');
        strokeWeight(3);
        fill(255);
        circle(this.pos.x, this.pos.y, 25);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        //triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);

        pop();
    }

    edges() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

}