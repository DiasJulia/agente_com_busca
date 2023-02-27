// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

class Vehicle {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.maxForce = 0.25;
        this.r = 16;

        this.path = [];
    }

    seek(target) {
        let posY = Math.floor(this.pos.y);
        let posX = Math.floor(this.pos.x);
        let tarX = Math.floor(target.x);
        let tarY = Math.floor(target.y);

        let force = p5.Vector.sub(target, this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
        if ((posY >= tarY - 4 && posY <= tarY + 4) && (posX >= tarX - 4 && posX <= tarX + 4)) {
            target.x = Math.random() * 500;
            target.y = Math.random() * 500;
            circle(target.x, target.y, 10);
            this.count += 1;
            console.log("Comidas coletadas: " + this.count);
        }


    }

    applyForce(force) {
        this.acc.add(force);
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

    //Djikstra
    djikstra(D, matrix) {

    }

}