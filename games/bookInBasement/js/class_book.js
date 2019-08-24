class Book {
    constructor(id = 'book', x, y) {
        this.x = x;
        this.y = y;
        this.scale = 64;
        this.id = id;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
        this.friction = 0.9;
        this.gravity = 4;
        this.accumulatedGravity = 1;
        this.jumppower = -10;
    }

    readout() {
        console.log(`id ${this.id}`);
        console.log(`vx ${this.vx}`);
        console.log(`vy ${this.vy}`);
        console.log(`isJumping ${this.isJumping}`);
    }

    drawself() {
        superdrawImage(Global.images.book, 0, 0, 128, 128, this.x - (this.scale / 3), this.y - this.scale + 4, this.scale, this.scale);
    }

    hitFloor() {
        this.isJumping = false;
        this.accumulatedGravity = 1;
        this.vy = 0;
    }

    applyForces() {
        // Look at this gravity Spaget Ooph::

        if (this.isJumping || !isFloor(this.x, this.y + 2, this)) {
            this.accumulatedGravity++;
            this.vy += (this.gravity * this.accumulatedGravity) / 10;
        } else {
            this.accumulatedGravity = 1;

            if (!isFloor(this.x, this.y + 2, this)) {
                this.vy += this.gravity / 100;
            }
        }

        this.vx *= this.friction;

        if (!isFloor(this.x, this.y + 2, this)) {
            this.y += this.vy;
        } else {
            //if ON floor then calc only -neg vy.
            if (this.vy < 0) {
                this.y += this.vy;
            }
        }
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
        this.drawself();
    }

    jumpTimer() {

    }
}

let book = new Book('bob', 5, 455);
console.log(`quickboot - book = newbook`);
