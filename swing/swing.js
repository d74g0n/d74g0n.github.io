class swing() {
    //defaults for testing::
    constructor(ctx, x = canvas.width / 2, y = 25) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.wieghts = {

        };



    }


    setKey(key, value) {
        this[key] = value;
    }

    readOut() {
        console.log(`-=-=-=-=-=-=- readout::`);
        console.log(this);
        console.log(`-=-=-=-=-=-=- readout^^`);
    }

    drawSelf() {

    }





}
