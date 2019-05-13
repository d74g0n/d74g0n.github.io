// remember to put the use of this below the canvas.
// co = new EzCan(id, x, y, bg);


class EzDice {

    constructor(howmany = 1, idstr, height = 10, width = 10, background = 'transparent', border = 'none') {
        this.idstr = idstr;
        this.height = height;
//        this.width = width * howmany;
        this.width = width;
        this.canvas = document.getElementById(this.idstr);
        this.ctx = document.getElementById(this.idstr).getContext('2d');
        this.background = background;
        this.border = border;
        this.d1 = new Image(this.height, this.width);
        this.d1.src = './img/dice-1.png';
        this.d2 = new Image(this.height, this.width);
        this.d2.src = './img/dice-2.png';
        this.d3 = new Image(this.height, this.width);
        this.d3.src = './img/dice-3.png';
        this.d4 = new Image(this.height, this.width);
        this.d4.src = './img/dice-4.png';
        this.d5 = new Image(this.height, this.width);
        this.d5.src = './img/dice-5.png';
        this.d6 = new Image(this.height, this.width);
        this.d6.src = './img/dice-6.png';
        document[idstr] = this;
    }

    drawSqr() {
        //        this.ctx.rect(0, 0, this.height, this.height);
        console.log('drawSqr called');
        this.ctx.shadowColor = '#d53';
        this.ctx.shadowBlur = 20;
        this.ctx.lineJoin = 'bevel';
        this.ctx.lineWidth = 15;
        this.ctx.strokeStyle = '#38f';
        this.ctx.strokeRect(30, 30, 160, 90);

        //        this.ctx.lineWidth = 15;
        //        this.ctx.strokeStyle = '#38f';
        //        this.ctx.strokeStyle = 'black';
        //        this.ctx.strokeRect(2, 2, this.height, this.height);
    }

    rndRol(targ) {

        const min = 1;
        const max = 7;
        let random = Math.floor(Math.random() * (+max - +min)) + +min;
        //        console.log(`Rolled:${random}`);

        if (random > 6 || random < 1) {
            console.log('outofbounds happened');
        }

        switch (random) {
            case 1:
                return document[targ.idstr.toString()].d1;
                break;
            case 2:
                return document[targ.idstr.toString()].d2;
                break;
            case 3:
                return document[targ.idstr.toString()].d3;
                break;
            case 4:
                return document[targ.idstr.toString()].d4;
                break;
            case 5:
                return document[targ.idstr.toString()].d5;
                break;
            case 6:
                return document[targ.idstr.toString()].d6;
                break;

        }


    };
    timethingfunction(targ) {
        //        let rollimg = document.me.rndRol();
        let rollimg = targ.rndRol(targ);
        //        targ.ctx.drawImage(rollimg, 0, 0, targ.width, targ.height);

        document[targ.idstr.toString()].ctx.drawImage(rollimg, 0, 0, document[targ.idstr.toString()].height, document[targ.idstr.toString()].height);
        //        document.me.ctx.drawImage(rollimg, 0, 0, document.me.width, document.me.height);

    }

    rolldice() {
        this.initEz();
        this.readout();

        setTimeout(this.timethingfunction(this), 100);
    }

    help() {
        console.log('EzCanvas by d74g0n');
        console.log("use this to manage canvas's");
        return this.readout();
    }

    initEz() {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.style.background = this.background;
        
        this.ctx.drawImage(this.d4, 0, 0, this.width, this.height);
    }

    getheight() {
        return this.height;
    }

    getwidth() {
        return this.width;
    }

    getctx() {
        return this.ctx;
    }

    setborder(borderstr) {
        this.border = borderstr;
        this.canvas.style.border = borderstr;
    };

    setheight(height) {
        this.canvas.height = height;
    };

    setwidth(width) {
        this.canvas.width = width;
    };

    setbackground(colorstr) {
        this.background = colorstr;
        this.canvas.style.background = colorstr;
    };

    readout() {
        console.log(`${this.idstr} -[readout::]`);
        console.log(`[${this.idstr}]-[height: ${this.height}]`);
        console.log(`[${this.idstr}]-[width: ${this.width}]`);
        console.log(`[${this.idstr}]-[background: ${this.background}]`);
        //        if (this.border !== "none") {
        console.log(`[${this.idstr}]-[border: ${this.border}]`);
        //        }
    };

    hideMe() {
        //        document.getElementById(this.idstr).style.display = 'none';
    }

    updateCanvas() {

        //        document.getElementById(this.idstr).style.borderStyle  = 'hidden';
        document.getElementById(this.idstr).style.display = 'block';
        document.getElementById(this.idstr).style.display = 'none';

        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.style.background = this.background;

        document.getElementById(this.idstr).style.display = 'block';
    }



}
// -=-=-=- Execution level::
