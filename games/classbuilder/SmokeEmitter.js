// TODO: add has completed check for emitted array empty
// add sliders. windxy.

const buffer = document.createElement('canvas');
const bx = buffer.getContext('2d');

function initBuffer(img = smokeImage) {
    let fg = img;
    buffer.width = fg.width;
    buffer.height = fg.height;

}

class SmokeEmitter {
    constructor(x, y, amount, emitRate = 1) {
        this.id = `SmokeEmitter`;
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.emitted = [];
        this.isOn = true;
        this.framecount = 0;
        this.frameMod = 15;
        this.puffcount = 0;
        this.emitRate = 1;
        this.wind = 0;


    }

    resetWind() {
        this.setWind();
    }

    setWind(val = 0) {
        this.wind = val;
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].wind = this.wind;
        }
    }

    emit(val = this.amount) {
        return this.takePuff(val);
    }

    takePuff(val = this.amount) { // smoking cigarette context
        for (let i = 0; i <= val; i++) {
            this.emitted.unshift(this.addParticle());
        }
    }

    addParticle() {
        return new Smoke(this.x, this.y, smokeImage);
    }

    doCalculations() {
        this.framecount++;
        if (this.framecount > 100) {
            this.framecount = 1;
            this.puffcount++;
        }
        if (this.puffcount > 100) {
            this.puffcount = 1;
        }
    }

    cleanup() {
        for (let i = 0; i < this.emitted.length; i++) {
            if (this.emitted[i].isDead || this.emitted[i].alpha == 0) {
                this.emitted.splice(i, 1);
            }
        }
    }

    tick() {
        let debugging = false;
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].tick();
        }
        this.cleanup();
        if (this.framecount % this.frameMod == 0 && EMIT.emitted.length < 200) {
            this.puffcount++;
            if (this.puffcount % this.emitRate == 0) {
                if (debugging) {
                    console.log(`frame: ${this.framecount} puff: ${this.puffcount}`);
                }
                if (this.isOn) {
                    this.emit();
                }
            }
        }
        this.doCalculations();
    }
}

let tmpcol = random_hexColor();

class Smoke {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.alpha = random_range(0.5, 1).toFixed(5);
        this.alphaDecay = 0.009;
        this.r = (random_range(-1, 1) * Math.PI * 0.5);
        this.vy = random_range(-1, 1);
        this.vx = random_range(-1, 1);
        this.lifecount = 100000 + random_range(-100, 100);
        this.s = 1;
        this.sMax = 100;
        this.sFadePoint = 0.5;
//        this.sFadePoint = 15;
        this.scalerate = 0.08;
        this.isDead = false;
        this.wind = 0;

//        this.tintColor = random_hexColor();
//        this.tintColor = '#22f0f0';
        this.tintColor = tmpcol;
        this.isTinted = true;
//        this.isTinted = false;
    }

    calculateSelf() {
        this.x += this.wind;
        this.x += this.vx;
        this.y += this.vy;
        this.s += this.scalerate;

        if (this.r < 0) {
            this.r -= 0.01;
        } else {
            this.r += 0.01;
        }



        if (this.s > this.sFadePoint) {
            this.alpha -= this.alphaDecay;

            if (this.alpha < 0) {
                this.alpha = 0;
            }
        }

        if (this.s > this.sMax) {
            this.s = this.sMax;
        }

        // bound drawing to screen::
        if (this.x < -1 * (this.image.width * this.s + 1) || this.x > canvas.width + this.image.width * this.s + 1) {
            //            console.log(`outsideX: ${this.x}`);
            this.isDead = true;
        }
        if (this.y < -1 * (this.image.height * this.s + 1) || this.y > canvas.height + this.image.height * this.s + 1) {
            //            console.log(`outsideY: ${this.y}`);
            this.isDead = true;
        }
    }

    drawSelf() {
        ctx.imageSmoothing = false;

        if (this.isTinted) {
            ctx.save();

            ctx.translate(this.x, this.y);
            ctx.rotate(this.r);
            ctx.globalAlpha = this.alpha / 2;
//            ctx.drawImage(this.tintImage(this.image, this.tintColor), 0, 0, this.image.width, this.image.height,
            ctx.drawImage(this.tintImage(this.image, this.tintColor), 0, 0, this.image.width, this.image.height,
                (-this.image.width * this.s) / 2, (-this.image.height * this.s) / 2,
                this.image.width * this.s, this.image.height * this.s);


            ctx.restore();
        }





//
        if (this.isTinted) {
            ctx.globalAlpha = this.alpha / 2;
        } else {
            ctx.globalAlpha = this.alpha;
        }
        if (this.isDead) {
            ctx.globalAlpha = 0.1;
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
            (-this.image.width * this.s) / 2, (-this.image.height * this.s) / 2,
            this.image.width * this.s, this.image.height * this.s);
        ctx.restore();
    }

    tick() {
        this.calculateSelf();
        this.drawSelf();
    }

    tintImage(img, tint = random_hexColor()) {
        // fill offscreen buffer with the tint color
        bx.fillStyle = tint;
        bx.clearRect(0, 0, buffer.width, buffer.height);
        bx.fillRect(0, 0, buffer.width, buffer.height);
        // destination atop makes a result with an alpha channel 
        // identical to fg, but with all pixels retaining their original color *as far as I can tell*
        bx.globalCompositeOperation = "destination-atop";
        bx.drawImage(this.image, 0, 0);

        //then set the global alpha to the amound that you want to tint it, and draw the buffer 


        //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
        return buffer;

    }

}
// -=-= MATH:
function random_hexColor() {
    // sand - "#dede90"
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function random_range(min, max) {
    return Math.random() * (+max - +min) + +min;
}

function random_bool() {
    return Math.random() >= 0.5;
}

//function tintImage(img, tint = '#FF0000') {
//
//    let fg = img;
//    let buffer = document.createElement('canvas');
//    buffer.width = fg.width;
//    buffer.height = fg.height;
//    let bx = buffer.getContext('2d');
//    // fill offscreen buffer with the tint color
//    bx.fillStyle = tint;
//    //        bx.fillStyle = '#FF0000'
//    bx.fillRect(0, 0, buffer.width, buffer.height);
//    // destination atop makes a result with an alpha channel identical to fg, but with all pixels retaining their original color *as far as I can tell*
//    bx.globalCompositeOperation = "destination-atop";
//    bx.drawImage(fg, 0, 0);
//
//    //then set the global alpha to the amound that you want to tint it, and draw the buffer 
//
//
//    //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
//    return buffer;
//
//}
// -=- Example Below is Setup and Use::

function init() {
    const smokeImage = new Image();
    smokeImage.src = "/games/common/particles/smoke.png";
    ctx.imageSmoothing = false;
    return smokeImage;
    

}

function reRollColour(){
    tmpcol = random_hexColor();
}

function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    EMIT.tick();
    EMITB.tick();
    EMIT.setWind(2);
    EMITB.setWind(-2);
    requestAnimationFrame(renderLoop);
}

const smokeImage = init();

initBuffer(smokeImage);

let EMIT = new SmokeEmitter(canvas.width / 2, canvas.height / 2, 4);
let EMITB = new SmokeEmitter(canvas.width / 2, canvas.height / 2, 4);

document.onclick = function () {
    EMIT.isOn = !EMIT.isOn;
    tmpcol = random_hexColor();
}


setInterval(reRollColour,3000);
setTimeout(renderLoop,1000);
//renderLoop();
