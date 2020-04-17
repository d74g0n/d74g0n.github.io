class ball {
    constructor(x = canvas.width / 2, y = canvas.height / 2, vx = 0, vy = 0, r = 1) {
        this.id = 'ball';
        this.pos = {
            x: x,
            y: y,
            z: 0,
        };
        this.vel = {
            x: vx,
            y: vy,
            z: 0,
        }
        this.r = r;

        this.grav = undefined;

        this.isDebugging = false;
        this.collision = {
            didCollide: false,
            target: undefined,
        }

    }

    attachGravity() {
        this.grav = new gravity();
    }

    reflectX() {
        this.vel.x = this.vel.x * -1;
    }

    reflectY() {
        //        this.vel.y = this.vel.y * -1;
        this.vel.y = this.vel.y * -1.0005;
    }

    friction() {
        // WIP S.
        this.vel.x = this.vel.x * 0.99999;
        this.vel.y = this.vel.y * 0.9998;
    }

    constrainToLevel() { // canvas collisions
        if (this.pos.x <= 0) {
            clog('ball-hit: left');
            this.pos.x = 0;
            this.reflectX();
        }

        if (this.pos.x + this.r > buffers.bg.width) {
            clog('ball-hit: right');
            this.pos.x = buffers.bg.width - this.r;
            this.reflectX();
        }

        if (this.pos.y <= 0) {
            clog('ball-hit: top');
            this.pos.y = 0;
            this.reflectY();
        }
        // DONT DELETE
        //        if (this.pos.y + this.r > buffers.bg.height) {
        //            clog('ball-hit: bottom');
        //            this.pos.y = buffers.bg.height - this.r;
        //            this.reflectY();
        //        }

        // hit mock bottom
        if (this.pos.y + this.r > buffers.bg.height - 128) {
            clog('ball-hit: bottom');
            this.pos.y = buffers.bg.height - 128 - this.r;
            this.reflectY();
        }

    }

    ballGradient() {
        //borked
        //        let gradient = viivctx.createLinearGradient(0, 0, 0, 64);
        //        gradient.transformOrigin = `${this.pos.x}px,${this.pos.y}px`;
        //        gradient.addColorStop(0, 'red');
        //        gradient.addColorStop(.8, 'brown');
        //        gradient.addColorStop(1, 'maroon');
        //        viivctx.fillStyle = gradient;
        //        bgctx.fillStyle = gradient;
        //        viivctx.fillRect(0, 0, 64, 64);
        return 'red';
        //        return gradient;
    }

    update() {
        if (this.grav) {
            this.vel.y += this.grav.value();

            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        } else {
            this.attachGravity();
        }
        //first results in zero.
    }

    drawSelf() {
        //        console.log(`drawn-ball`);
        //        let ballarc = new Path2D();
        //        ballarc.arc(this.pos.x, this.pos.y, this.r * 10, 0, 2 * Math.PI);
        //        ballarc.closePath();
        //        bgctx.strokeStyle = this.ballGradient();
        //        bgctx.fillStyle = this.ballGradient();
        bgctx.fillStyle = 'red';
        bgctx.beginPath();
        bgctx.arc(this.pos.x, this.pos.y, this.r * 10, 0, 2 * Math.PI);
        bgctx.lineWidth = 10;
        //        bgctx.stroke();
        bgctx.fill();
        //        bgctx.fill(ballarc, 'evenodd');
        if (this.isDebugging) {
            bgctx.fillStyle = 'white';
            bgctx.fillText(`x:${this.vel.x.toFixed(2)}`, this.pos.x + 35, this.pos.y - 5);
            bgctx.fillText(`y:${this.vel.y.toFixed(2)}`, this.pos.x + 35, this.pos.y + 20);
        }
    }

    tick() {
        this.update();
        this.constrainToLevel();
        this.friction();
        this.drawSelf();
        this.grav.tick(); //wind it up
    }
}