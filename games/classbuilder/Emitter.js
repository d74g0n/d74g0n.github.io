class Emitter {
    constructor(x, y, amount) {
        this.id = `Emitter`;
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.emitted = [];
        this.isOn = true;

        this.framecount = 0;
        this.puffcount = 0;

    }

    takePuff(val = 5) {
        for (let i = 0; i <= val; i++) {
            this.emitted.unshift(this.addParticle());
        }
    }

    init() {
        for (let i = 0; i <= this.amount; i++) {
            this.emitted.unshift(this.addParticle());
        }
        console.log(`[EMIT][INIT]`);
        console.log(this.emitted);
    }

    addBatch(val = 1) {
        for (let i = 0; i <= val; i++) {
            this.emitted.unshift(this.addParticle());
        }
    }

    addParticle() {
        return new Smoke(this.x, this.y, smokeImage);
    }

    doCalculations() {
        this.framecount++;

        if (this.emitted.length < this.amount) {
//            this.takePuff();
        }

        if (this.framecount > 100) {
            this.framecount -= 100;
            this.puffcount++;
            if (this.puffcount >= 100) {
                this.puffcount -= 100;
            }
        }
    }

    tick() {
        if (this.isOn) {
            
            if (this.emitted.length <= this.amount){
                console.log(`puffhalf`);
                this.takePuff();
            }
            
            
            for (let i = 0; i < this.emitted.length; i++) {
                //                console.log(`I:${i}`);

                this.emitted[i].tick();

                if (this.emitted[i].isDead) {
                    //                    console.log(`particle Removed`);
                    //                    this.emitted[i] = this.addParticle();
                    this.emitted.splice(i, 1);
                    this.doCalculations();
                }
            }

            if (this.framecount % 16 == 0 && EMIT.emitted.length < 200) {

                this.puffcount++;
                if (this.puffcount % 90 == 0) {
                    console.log(`frame: ${this.framecount} puff: ${this.puffcount}`);
                    this.takePuff();
                    console.log(`puff`);
                    if (this.puffcount > 100){
                        this.puffcount = 0;
                        this.takePuff();
                    }
                }
            }


        }
    }

    debugdata() {
        console.log(`[Emitter.js][debugdata][ID:${this.id}][COORDS:${this.x},${this.y}]`);
        //        console.log(`id -${this.}`);
    }



}

class Smoke {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.alpha = 0.3;

        this.r = -Math.floor(Math.random() * (360) + 0.5);
        this.vy = Math.floor(Math.random() * (1) + 0.5);
        this.vx = Math.floor(Math.random() * (1) + 0.5);

        this.s = 1;
        this.isDead = false;
        //        this.velY = -1 - (Math.random() * 0.5);
        //        this.velY = 0.5 * (Math.random() * 0.5);
        //        this.velX = Math.floor(Math.random() * (-6) + 3);
        //        this.velX = Math.floor(Math.random() * (-6)+1);
        //        this.velX = Math.floor(Math.random() * (-6) + 3) / 10;

    }

    wind(val) {
        this.x += val;
    }

    calculateSelf() {
        this.x += this.vx;
        this.y += this.vy;
        this.s += 0.1;
        this.r += 0.5;

        if (this.s > 1) {
            this.alpha -= 0.001;
            if (this.alpha < 0) {
                this.alpha = 0;
                this.isDead = true;
            }
        }

        //        if (this.alpha = 0.5) {
        //            EMIT.addBatch(1);
        //        }


        // bound drawing to screen::
        if (this.x < -1 * (this.image.width * this.s + 1) || this.x > canvas.width + this.image.width * this.s + 1) {
            console.log(`outsideX: ${this.x}`);
            //            this.x = canvas.width / 2;
            this.isDead = true;
        }
        if (this.y < -1 * (this.image.height * this.s + 1) || this.y > canvas.height + this.image.height * this.s + 1) {
            console.log(`outsideY: ${this.y}`);
            //            this.y = canvas.height / 2
            this.isDead = true;
        }
    }

    drawSelf() {
        ctx.imageSmoothing = false;
        ctx.save();
        //        ctx.clearRect(0, 0, canvas.width, canvas.height);  //temp clear rec
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r / 180 * Math.PI);
        //        ctx.drawImage(this.image,this.x,this.y);
        //        ctx.drawImage(this.image,0,0,this.image.width,this.image.height, this.x,this.y,this.image.width*this.s,this.image.height*this.s);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, (-this.image.width * this.s) / 2, (-this.image.height * this.s) / 2, this.image.width * this.s, this.image.height * this.s);
        ctx.restore();
    }

    tick() {
        this.calculateSelf();
        this.drawSelf();
    }

}



function init() {
    const smokeImage = new Image();
    smokeImage.src = "/games/common/particles/smoke.png";
    return smokeImage;
    ctx.imageSmoothing = false;
}

function experimental() {
    //this becomes the function of the Emitter::
    //Refactor into list.
    //tick then isdead removal slice.

    //    particle.tick();
    //    if (particle.isDead) {
    //        console.log(`died`);
    //        particle = new Smoke(canvas.width / 2, canvas.height / 2, smokeImage);
    //    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    EMIT.tick();

    requestAnimationFrame(experimental);
}

let smokeImage = init();
//let particle = new Smoke(canvas.width / 2, canvas.height / 2, smokeImage);
let EMIT = new Emitter(canvas.width / 2-20, canvas.height / 2, 32);
//let EMIT = new Emitter(canvas.width / 2 - 20, canvas.height, 32);
EMIT.init();
experimental();
