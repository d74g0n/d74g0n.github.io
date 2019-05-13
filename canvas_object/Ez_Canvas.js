// remember to put the use of this below the canvas.
// co = new EzCan(id, x, y, bg);


class EzCan {

    constructor(idstr, height = 10, width = 10, background = 'transparent', border = 'none') {
        this.idstr = idstr;
        this.height = height;
        this.width = width;
        this.canvas = document.getElementById(this.idstr);
        this.ctx = document.getElementById(this.idstr).getContext('2d');
        this.background = background;
        this.border = border;
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
        document.getElementById(this.idstr).style.display = 'none';
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
