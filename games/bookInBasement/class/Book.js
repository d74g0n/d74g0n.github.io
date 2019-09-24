function oldisFloor(x, y, obj) {

    //sort by x to isolate math.


    if (x < 32) {
        //LEFT = 32 - anything under 32 is set to 32.
        // zero to edge
        //        x = 32;
        obj.x = 32;
        obj.vx = 0;
        if (y > 332) {
            obj.y = 333;
            obj.hitFloor();
            return true;
        }
        if (debugging){
        console.log(`LEFT edge hit`);
            }
    }

    if (x >= 31 && x <= 69) {
        //on couch
        if (y > 332) {
            obj.y = 333;
            obj.hitFloor();
            return true;
        }
                if (debugging){
        console.log(`on couch`);}
    }

    if (x >= 69.01 && x <= 80) {

        let deltaS = (80 - 69); //11steps - 332-340 8
        let deltaX = 80 - x;

        if (y > 332) {
            obj.hitFloor();
            obj.y = 340 - deltaX;
            return true;
        }
                if (debugging){
        console.log(`getting off couch`);}


    }


    if (x >= 81) {
        if (y > 390) {
            //bottom floor general.
            obj.y = 390;
            return true;
        }
                if (debugging){
        console.log(`carpet`);}
    }

return false;

}

class Book {
    constructor(id = 'book', x, y,z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = 64;
        this.id = id;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.isJumping = false;
        this.friction = 0.9;
        this.gravity = 9;
        this.accumulatedGravity = 1;
        this.jumppower = -2;
    }

    readout() {
        console.log(`id ${this.id}`);
        console.log(`vx ${this.vx}`);
        console.log(`vy ${this.vy}`);
        console.log(`isJumping ${this.isJumping}`);
    }

    drawSelf() {
        superdrawImage(Global.images.book, 0, 0, 128, 128, this.x - (this.scale / 3), this.y - this.scale + 4, this.scale, this.scale);
    }

    hitFloor() {
        this.isJumping = false;
        this.accumulatedGravity = 1;
        this.vy = 0;
    }

    applyForces() {
        // Look at this gravity Spaget Ooph::

//        if (this.isJumping || !SET.leveldoors[0].isFloor(this.x, this.y + 2, this)) {
        if (this.isJumping && !SET.level[0].isFloor(this.y +2)) {
            this.accumulatedGravity++;
            this.vy += (this.gravity * this.accumulatedGravity) / 10;
        } else {
            this.accumulatedGravity = 1;

//            if ( !SET.level[0].isFloor(this.y + 2)) {
//                this.vy += this.gravity / 100;
//            }
            
            console.log(`applyForces Collision - ${this.y}`);
        }

        this.vx *= this.friction;

//        if ( !SET.level[0].isFloor(this.y + 2)) {
//            this.y += this.vy;
//        } else {
//            //if ON floor then calc only -neg vy.
//            if (this.vy < 0) {
//                this.y += this.vy;
//            }
//        }
        this.x += this.vx;
//        console.log(this.accumulatedGravity);
    }

    processControllerState() {
        if (CS.r) {
                    if (debugging){
            console.log(`move right ${this.vx}`);}
            this.vx++;
        }
        if (CS.l) {
                    if (debugging){
            console.log(`move left ${this.vx}`);}
            this.vx--;
        }
        if (CS.u) {
                    if (debugging){
            console.log(`move up ${this.vy}`);}

        }
        if (CS.d) {
                    if (debugging){
            console.log(`move down ${this.vy}`);}

        }
        if (CS.isJumping) {
            this.vy = this.jumppower;
            this.accumulatedGravity++;
                    if (debugging){
            console.log(`jump ${this.vy}`);}
        } else {
            this.accumulatedGravity = 1;
        }
    }

    tick() {
        this.processControllerState();
        this.applyForces();
        this.drawSelf();
    }

    jumpTimer() {

    }
}

//let book = new Book('bob', 5, 455);
//console.log(`quickboot - book = newbook`);
