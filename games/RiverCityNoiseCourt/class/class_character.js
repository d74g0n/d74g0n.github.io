class character {
    constructor(x = 100, y = 100) {
        this.id = 'character';
        this.w = 32;
        this.h = 64;
        this.pos = {
            x: x,
            y: y,
            z: 0,
        }
        this.vel = {
            x: 0,
            y: 0,
        }

        this.r = 64;
        this.speed = 1;
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

    friction() {
        // WIP S.
        this.vel.x = this.vel.x * 0.99999;
        this.vel.y = this.vel.y * 0.9998;
    }


    constrainToLevel() { // canvas collisions
        if (this.pos.x <= 0) {
            clog('char-hit: left');
            this.pos.x = 0;
            this.reflectX();
        }

        if (this.pos.x + this.r > buffers.bg.width) {
            clog('char-hit: right');
            this.pos.x = buffers.bg.width - this.r;
            this.reflectX();
        }

        if (this.pos.y <= 0) {
            clog('char-hit: top');
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
            clog('char-hit: bottom');
            this.pos.y = buffers.bg.height - 128 - this.r;
            this.reflectY();
        }

    }

    drawSelf() {
        bgctx.save();
        bgctx.fillStyle = 'blue';
        bgctx.fillRect(this.pos.x, this.pos.y, this.w, this.h); // dont do fill or it does ball
        bgctx.restore();
    }

    update() {
        //can actually destroy gravity on landing.
        if (this.grav) {
            this.vel.y += this.grav.value();

            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        } else {
            this.attachGravity();
        }
        //first results in zero.
    }

    tick() {
        this.update();
        this.constrainToLevel();
        this.friction();
        this.drawSelf();
        this.grav.tick(); //wind it up
    }

}
