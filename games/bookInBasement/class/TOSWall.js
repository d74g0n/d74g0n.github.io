// - make floor class
// - make door class

class TOSPanel {
    constructor(x = 10, y = 50, w = 200, h = 60) {
        this.cid = 'TOSPanel';
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.detailList = [];
        this.color = {
            colTlite: TOS.color.wall.top.light,
            colTdark: TOS.color.wall.top.dark,
            colMlite: TOS.color.wall.bottom.light,
            colMdark: TOS.color.wall.bottom.dark,
        }
        this.gradient = {
            T: undefined,
            B: undefined,
        }
        this.isVerbose = true;
    }

    init() {
        if (this.gradient.T == undefined) {
            this.gradientT(this.y, this.h);
        }
        if (this.gradient.B == undefined) {
            this.gradientB(this.y, this.h);
        }
    }

    drawSelf() {
        //drawbase:
        ctx.fillStyle = this.gradient.T;
        drawRect(this.x, this.y, this.w, this.h);
        // lines and details:
        ctx.lineWidth = 4;
        setStrokeColor('black');
        // horz:
        drawline(this.x, this.y, this.x + this.w, this.y);
        drawline(this.x, this.y + this.h * 5, this.x + this.w, this.y + this.h * 5);
        ctx.lineWidth = 6;
        drawline(this.x + (this.w / 20), this.y + this.h * 5, this.x + this.w - (this.w / 20), this.y + this.h * 5);
        // vert:
        ctx.lineWidth = 4;
        drawline(this.x, this.y, this.x, this.y + this.h * 5);
        drawline(this.x + this.w, this.y, this.x + this.w, this.y + this.h * 5);
        // Mid Grey:
        ctx.fillStyle = this.gradient.B;
        drawRect(this.x, this.y + this.h, this.w, this.h * 4);
    }

    drawDetails() {
        if (this.detailList.length >= 1) {
            this.detailList.forEach(function (data,index) {
                data.tick();
            })
        }
    }

    tick() {
        this.drawSelf();
        this.drawDetails();
    }

    readout() {
        console.log(`[CID][${this.cid}]`);
        console.log(`this.x:${this.x}`);
        console.log(`this.y:${this.y}`);
        console.log(`this.w:${this.w}`);
        console.log(`this.h:${this.h}`);
        if (this.detailList.length > 0) {
            console.log(`this.detailList:${this.detailList}`);
        } else {
            console.log(`no details to list`);
        }
    }

    gradientT(y, h) {
        let gradient = ctx.createLinearGradient(0, 200, 0, h);
        gradient.addColorStop(0, this.color.colTdark);
        gradient.addColorStop(0.3, this.color.colTdark);
        gradient.addColorStop(1, this.color.colTlite);
        //debugger
        this.gradient.T = gradient;
    }

    gradientB(y, h) {
        let gradient = ctx.createLinearGradient(0, y, 0, h * 4);
        gradient.addColorStop(0, this.color.colMdark);
        gradient.addColorStop(0.3, this.color.colMdark);
        gradient.addColorStop(1, this.color.colMlite);
        //debugger
        this.gradient.B = gradient;
    }
    
    movex(val=0){
        this.x += val;
    }
    
    movey(val=0){
        this.y =+ val;
    }
    
    moveup(val=0){
        this.y -= val;
    }

    propMsg(msg) {
        if (this.isVerbose) {
            console.log(msg);
        }
    }
    
}
