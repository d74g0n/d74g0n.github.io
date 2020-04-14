class camera {
    constructor(x = 64, y = 70, w = 512, h = 256, col = 'white') {
        this.pos = {
            x: x,
            y: y,
        };
        this.w = w;
        this.h = h;
        this.col = col;
        this.ctx = bgctx;
        this.outputctx = ctx;
        this.vel = {
            x: -0.1,
            y: -0,
        }

        this.singleskyrender = true;
        this.rendercenter = false;
    }

    drawDebugFrame() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.col;
        this.ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h, this.col);
        this.ctx.stroke();
    }

    drawview() {
        this.outputctx.drawImage(buffers.bg, this.pos.x, this.pos.y, buffers.bg.width, buffers.bg.height, 0, 0, buffers.bg.width, buffers.bg.height);
    }

    drawcenterview() {
        let size = 64;
        let col = 'rgba(150,0,0,.8)';

        //        this.ctx.fillStyle = 'red';
        this.ctx.fillStyle = col;
        this.ctx.fillRect(this.pos.x + (this.w / 2) - (size / 2), this.pos.y + (this.h / 2) - (size / 2), size, size);
    }

    stop() {
        this.vel.x = 0;
        this.vel.y = 0;
    }

    reflectX() {
        this.vel.x = this.vel.x * -1;
    }

    reflectY() {
        this.vel.y = this.vel.y * -1;
    }

    updateForces() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    constrainBufferView() {
        // vel reflections are temp::
        if (this.pos.x <= 0) {
            clog('view-hit: left');
            this.pos.x = 0;
            this.reflectX();
        }

        if (this.pos.x + this.w > buffers.bg.width) {
            clog('view-hit: right');
            this.pos.x = buffers.bg.width - this.w;
            this.reflectX();
        }

        if (this.pos.y <= 0) {
            clog('view-hit: top');
            this.pos.y = 0;
            this.reflectY();
        }

        if (this.pos.y + this.h > buffers.bg.height) {
            clog('view-hit: bottom');
            this.pos.y = buffers.bg.height - this.h;
            this.reflectY();
        }

    }

    renderer() {

        build_bgbuffer(); //redraws grass (sky draws once then buffers.sky transfer after)

        gameball.tick();

        if (this.rendercenter) {
            this.drawcenterview();
        }

        this.drawview();

    }

    chaseBall() {
        let speed = 4;
        this.vel.x += gameball.pos.x / 90000;
        this.vel.y += gameball.pos.y / 90000;
    }

    tick() {
        this.updateForces();
        this.chaseBall();
        this.constrainBufferView();



        this.renderer();
        //draw after so it doesn't draw on output::
        this.drawDebugFrame();
        this.drawcenterview();
    }




}

clog('[class_camera.js]');
