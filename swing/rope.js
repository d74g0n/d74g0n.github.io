class Rope {
    constructor(x, y, len) {
        this.pos = {
            xa: x,
            ya: y,
            xb: x,
            yb: y + len,
        }
        this.len = len;

        //hardcode::
        this.width = 4;
        this.fillstyle = 'white';
        this.vel = {
            x: 0,
            y: 0,
        }
        this.sineframe = 0;
        this.swingMagnitude = 0.005;

        //child::
        this.baby = undefined;

        this.lastpos = this.pos;

    }

    update() {
        this.lastpos = this.pos;



    }

    drawSelf() {
        drawline(this.pos.xa, this.pos.ya, this.pos.xb, this.pos.yb);
    }

    tick() {
        update();
        drawSelf();
    }



}
