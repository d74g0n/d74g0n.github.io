class grid {
    constructor(canvas = buffers.bg, ctx = bgctx, col = 'red') {
        this.ctx = ctx;
        this.canvas = canvas;
        this.col = col;
        this.horizon = this.canvas.height / 2;
        this.w = this.canvas.width;
        this.lineWidth = 6;

        this.perspective = {
            x: undefined,
            z: 100,
        }
    }

    update() {
        this.x = view.pos.x + view.w / 2;
    }

    drawSelf() {

        this.ctx.save();

        // line Setup::
        this.ctx.fillStyle = this.col;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = 'lime';


        // begin Draw Horizon line::
        this.ctx.beginPath();
        //start left::
        this.ctx.moveTo(0, this.horizon);
        this.ctx.lineTo(this.w, this.horizon);
        this.ctx.stroke();
        this.ctx.fill();

        // begin Draw zTarget::
        this.ctx.beginPath();
        //start left::
        this.ctx.moveTo(this.x, this.horizon);
        this.ctx.lineTo(this.x, this.horizon * 2);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.restore();

    }

    tick() {
        this.update();
        this.drawSelf();
    }


}
