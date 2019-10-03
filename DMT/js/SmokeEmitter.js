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
        this.windy = 0;

        this.alphaDecay = 0.001;
        this.sFadePoint = 0.4;
        this.scalerate = 0.1;
    }

    reinit() {
        this.emitted = [];
        this.emit(this.amount);
        this.setalphaDecay();
        this.setsFadePoint();
        this.setscalerate();
        this.setWind(this.wind, this.windy);
        return this;
    }

    syncData() {
        this.setalphaDecay();
        this.setsFadePoint();
        this.setscalerate();
        this.setWind(this.wind, this.windy);
    }

    setalphaDecay(val = this.alphaDecay) {
        this.alphaDecay = val;
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].alphaDecay = this.alphaDecay;
        }
    }
    setsFadePoint(val = this.sFadePoint) {
        this.sFadePoint = val;
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].sFadePoint = this.sFadePoint;
        }
    }

    setscalerate(val = this.scalerate) {
        this.scalerate = val;
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].scalerate = this.scalerate;
        }
    }

    resetWind() {
        this.setWind();
    }

    setWind(valx = 0, valy = 0) {
        this.wind = valx;
        this.windy = valy
        for (let i = 0; i < this.emitted.length; i++) {
            this.emitted[i].wind = this.wind;
            this.emitted[i].windy = this.windy;
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
        
        this.syncData();
        
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
        this.alpha = random_range(0.5, 1).toFixed(4);
        this.alphaDecay = 0.001;
        this.r = (random_range(-1, 1) * Math.PI * 0.5);
        this.vy = random_range(-1, 1);
        this.vx = random_range(-1, 1);
        this.s = 1;
        this.sMax = 24;
        this.sFadePoint = 0.4;
        this.scalerate = 0.3;
        this.isDead = false;
        this.wind = 0;
        this.windy = 0;
        // this.tintColor = random_hexColor();
        // this.tintColor = '#22f0f0';
        // this.tintColor = tmpcol;
        this.isTinted = false;
        // this.isTinted = false;
    }

    calculateSelf() {

        this.x += this.wind;
        this.x += this.vx;

        this.y += this.windy;
        this.y += this.vy;
        this.s += this.scalerate;

        if (this.r < 0) {
            this.r -= 0.01;
        } else {
            this.r += 0.01;
        }

        if (this.s > this.sFadePoint) {
            this.alpha -= this.alphaDecay;

            if (this.alpha < 0.01) {
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
        if (this.isTinted) {
            this.drawTinted();
        } else {


            if (this.isTinted) {
                ctx.globalAlpha = this.alpha / 2;
            } else {
                ctx.globalAlpha = this.alpha / 4;
            }
            if (this.isDead) {
                ctx.globalAlpha = 0.1;
            }
            ctx.save();
            ctx.imageSmoothingEnabled = true;         
            ctx.translate(this.x, this.y);
            ctx.rotate(this.r);
            ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                (-this.image.width * this.s) / 2, (-this.image.height * this.s) / 2,
                this.image.width * this.s, this.image.height * this.s);
            ctx.restore();
        }
    }

    drawTinted() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        ctx.globalAlpha = this.alpha / 2;
        ctx.drawImage(this.tintImage(this.image, this.tintColor), 0, 0, this.image.width, this.image.height,
            (-this.image.width * this.s) / 2, (-this.image.height * this.s) / 2,
            this.image.width * this.s, this.image.height * this.s);
        ctx.restore();
    }

    tick() {
        ctx.save();
        this.calculateSelf();
        this.drawSelf();
        ctx.restore();
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

function initsmokeImage() {
    const smokeImage = new Image();
    smokeImage.src = "/games/common/particles/smoke.png";
    //    ctx.imageSmoothing = false;
    return smokeImage;
}

function reRollColour() {
    tmpcol = random_hexColor();
}

const smokeImage = initsmokeImage();
