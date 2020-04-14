class ball {
    constructor(x = canvas.width / 2, y = canvas.height / 2, vx = 10, vy = 0, r = 2) {
        this.pos = {
            x: x,
            y: y,
        };
        this.vel = {
            x: vx,
            y: vy,
        }
        this.r = r;

        this.grav = undefined;

    }

    attachGravity() {
        this.grav = new gravity();
    }

    reflectX() {
        this.vel.x = this.vel.x * -1;
    }

    reflectY() {
        this.vel.y = this.vel.y * -1;
    }

    constrainToLevel() {
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

        if (this.pos.y + this.r > buffers.bg.height) {
            clog('ball-hit: bottom');
            this.pos.y = buffers.bg.height - this.r;
            this.reflectY();
        }


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
        bgctx.strokeStyle = '#003300';
        bgctx.fillStyle = 'red';
        //        bgctx.beginPath();
        //        bgctx.arc(this.pos.x, this.pos.y, this.r * 10, 0, 2 * Math.PI, false);


        bgctx.beginPath();
        bgctx.arc(this.pos.x, this.pos.y, this.r * 10, 0, 2 * Math.PI);
        //        bgctx.stroke();
        bgctx.fill();

        //
        //        //        bgctx.closePath();

        //        bgctx.stroke();

        bgctx.fillRect(this.pos.x, this.pos.y, this.r, this.r);
        bgctx.fill();

    }


    tick() {
        this.update();
        this.constrainToLevel();
        this.drawSelf();
        this.grav.tick(); //wind it up
    }



}
