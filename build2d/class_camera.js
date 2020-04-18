/*NOTES

-camera-zoomout/in


*/

class camera {
    constructor(w = 512, h = 256, x = 180, y = 0, col = 'white') {
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
            x: -1,
            y: -0,
        }

        this.singleskyrender = true;
        this.rendercenter = false;

        this.target = undefined;
        this.isChasing = true;
    }

    drawDebugFrame() {
        this.ctx.save();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.col;
        this.ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h, this.col);
        //        this.ctx.stroke();
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('LIVE CAMERA', this.pos.x + 16, this.pos.y + 32);
        this.ctx.restore();
    }

    drawview() {
        this.outputctx.save();
        this.outputctx.drawImage(buffers.bg, this.pos.x, this.pos.y, buffers.bg.width, buffers.bg.height, 0, 0, buffers.bg.width, buffers.bg.height);
        this.outputctx.restore();
    }

    drawcenterview() {
        let size = 64;
        let col = 'rgba(150,0,0,.8)';
        this.ctx.save();
        this.ctx.fillStyle = col;
        this.ctx.fillRect(this.pos.x + (this.w / 2) - (size / 2), this.pos.y + (this.h / 2) - (size / 2), size, size);
        this.ctx.restore();
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
        if (this.pos.x <= 0) {
            this.pos.x = 0;
            this.reflectX();
        }
        if (this.pos.x + this.w > buffers.bg.width) {
            this.pos.x = buffers.bg.width - this.w;
        }
        if (this.pos.y <= 0) {
            this.pos.y = 0;
            this.reflectX();
        }
        if (this.pos.y + this.h > buffers.bg.height) {
            this.pos.y = buffers.bg.height - this.h;
        }
    }

    renderer() {

        //CLEAR::
        build_bgbuffer(); //redraws grass (sky draws once then buffers.sky transfer after)


        //DRAWSTUFF::
        scene.tick();
        //        gameball.tick();






        if (this.rendercenter) {
            this.drawcenterview();
        }

        this.drawview();

    }

    chaseBall() {
        
        let speed = 10;
        this.vel.x = ((this.pos.x + (this.w / 2) - this.target.pos.x) / speed) * -2;
        this.vel.y = ((this.pos.y + (this.h / 2) - this.target.pos.y) / speed) * -2;
        //        this.vel.x = ((this.pos.x + (this.w / 2) - gameball.pos.x) / speed) * -2;
        //        this.vel.y = ((this.pos.y + (this.h / 2) - gameball.pos.y) / speed) * -2;
    }

    tick() {
        this.updateForces();
        if (this.isChasing){
            this.chaseBall();
        }
        this.constrainBufferView();



        this.renderer();
        //draw after so it doesn't draw on output::
        //POST transfer bg=>main
        function postRender(dis) {
            //            dbgrid.tick();
            dis.drawDebugFrame();
            dis.drawcenterview();
        }
        if (isDebugging) {
            postRender(this);
        }
    }




}

clog('[class_camera.js]');
