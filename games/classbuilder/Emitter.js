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

        //        if (this.emitted.length < this.amount) {
        //            //            this.takePuff();
        //        }

        if (this.framecount > 100) {
            this.framecount -= 100;
            this.puffcount++;
            if (this.puffcount >= 100) {
                this.puffcount -= 100;
            }
        }

        //        this.shakeEmitter(random_range(-5,5));
    }
    shakeEmitter(val = 1) {
        let centX = canvas.width / 2;
        let centY = canvas.height / 2;


        if (random_bool()) {
            this.x = centX + val;
        } else {
            this.x = centX - val;
        }

        if (random_bool()) {
            this.x = centY + val;
        } else {
            this.x = centY - val;
        }




    }





    tick() {
        if (this.isOn) {

            if (this.emitted.length <= this.amount) {
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

            if (this.framecount % 30 == 0 && EMIT.emitted.length < 200) {

                this.puffcount++;
                if (this.puffcount % 40 == 0) {
                    console.log(`frame: ${this.framecount} puff: ${this.puffcount}`);
                    this.takePuff();
                    console.log(`puff`);

                }
            }

            if (this.puffcount >= 100) {
                this.puffcount = 1;
                //                        this.takePuff();
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
        this.alpha = random_range(0.5, 0.8).toFixed(3);

        this.r = (random_range(-1, 1) * Math.PI * 0.5);
        this.vy = random_range(-1, 1);
        this.vx = random_range(-1, 1);
        this.lifecount = 100000 + random_range(-100,100);
        this.s = 1;
        this.isDead = false;

    }

    wind(val) {
        this.x += val;
    }

    calculateSelf() {
        
//        if (this.lifecount < 0){
//            this.isDead = true;
//        }else{
//            this.lifecount--;
//        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.s += 0.1;

        if (this.r < 0) {
            this.r -= 0.01;
        } else {
            this.r += 0.01;
        }

        this.alpha -= (0.001).toFixed(4);
        
        if (this.s > 5) {
//            this.alpha -= 0.001;
            if (this.alpha < 0.1) {
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
        //        ctx.rotate(this.r / 180 * Math.PI);
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

}

function random_range(min, max) {
    return Math.random() * (+max - +min) + +min;
}

function random_bool() {
    return Math.random() >= 0.5;
}


function init() {
    const smokeImage = new Image();
    smokeImage.src = "/games/common/particles/smoke.png";
    return smokeImage;
    ctx.imageSmoothing = false;
}

function experimental() {
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
    ctx.fill();
    EMIT.tick();

    requestAnimationFrame(experimental);
}

let smokeImage = init();
//let particle = new Smoke(canvas.width / 2, canvas.height / 2, smokeImage);
let EMIT = new Emitter(canvas.width / 2, canvas.height / 2, 64);
//let EMIT = new Emitter(canvas.width / 2 - 20, canvas.height, 32);
EMIT.init();
experimental();
