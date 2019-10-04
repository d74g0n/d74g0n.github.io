let counter = 0;






class SuperBook {
    constructor(id = 'SuperBook', image, x, y, z, ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.s = 0.5;
        // unused??
        this.h;
        this.w;

        this.r = 0;

        this.items = [];

        this.image = image;

        this.centerY;
        this.centerX;
        this.bottom;

        this.vx = 0;
        this.vy = 0;
        this.vz = 0;

        this.friction = 0.9;

        this.isJumping = false;
        this.gravity = 9;
        this.accumulatedGravity = 1;
        this.jumppower = -2;
        // for feetdraw::
        this.padding = 16;

        this.init();

    }

    rotate(deg = 1) {
        this.r += deg;

    }

    init() {
        console.log(`INIT`);
        this.h = this.image.height * this.s;
        this.w = this.image.width * this.s;
    }

    update() {
        this.bottom = this.y + (this.h * this.s);
        this.centerY = this.y + ((this.h * this.s) / 2);
        this.centerX = this.x + ((this.w * this.s) / 2);
    }

    applyControllerForces() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
    }

    BoundLimits() {
        if (this.s > 10) {
            this.s = 0.05;
        }
        if (this.r > 360) {
            this.r -= 360;
        }
    }

    drawFootline() {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#FF0000";
        //        drawline(this.x-this.s+this.padding, this.y+ this.s-this.padding, this.x + this.s-this.padding/4, this.y+ this.s-this.padding);
        drawline(0 - this.s + this.padding, 0 + this.s - this.padding, 0 + this.s - this.padding / 4, 0 + this.s - this.padding);
        //        drawline(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
        //        horizontalLine(this.y);

    }

    FootY() {
        return this.y + (this.h * this.s);
    }

    Center() {
        //        returns coordinates in array::
        return [this.x + ((this.w * this.s) / 2), this.y + ((this.h * this.s) / 2)];
    }

    setScalePercent(val = 1) {
        return val * this.s;
    }

    drawSelf() {

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        //        justRotate(-this.r);
        justRotate(-this.r * 2);
        //        centerDraw(sun,10);
        ctx.globalAlpha = 0.5;
        superdrawImage(sun, 0, 0, sun.width, sun.height, -sun.width * 10 / 2, -sun.height * 10 / 2, sun.width * 10, sun.height * 10);
        ctx.restore();
        ctx.globalAlpha = 1;
        ctx.save();
        //        background('pink'); //TEMPORARY.

        this.s += 0.05;

        drawImageRotated(this.image, this.x, this.y, this.s, this.r);


        //        drawImage sun
        //        this.drawFootline();

        ctx.restore();

    }

    tick() {
        //entry point
        this.update();
        this.BoundLimits();
        this.drawSelf();

    }



}


function loadAudio(path) {
    let tmp = new Audio(path);
    tmp.addEventListener('loadeddata', () => {
        console.log(`[Audio][${path}]`);

    });
    return tmp;
}

let entertainer = loadAudio(`/DMT/audio/transit.mp3`);

let bookgraphic = loadImage('/games/bookInBasement/img/booka.png');
let sun = loadImage('/games/bookInBasement/img/sunspan.png');
let Tester = new SuperBook('bob', bookgraphic, canvas.width / 2, canvas.height / 2, 20);

canvas.onclick = function () {
    console.log(`rot ${Tester.r}`);
    Tester.r += 21;
    Tester.s += 0.05;

    entertainer.play();
}

let rval = 1;

function loopdraw() {
    background('black');


      

    Tester.tick();
    ctx.save();
    Tester.rotate(rval += 0.01);
    ctx.restore();
    if (rval > 15) {
        rval -= 15;
    }
    ctx.save();
//      smokedraw();
    ctx.restore();
    requestAnimationFrame(loopdraw);
}

loopdraw();
