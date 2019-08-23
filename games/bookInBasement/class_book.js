class Book {
    constructor(id = 'book', x, y) {
        this.x = x;
        this.y = y;
        this.scale = 64;
        this.id = id;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
//        this.image = Global.images.book;
        this.friction = 0.9;
        this.gravity = 9;
        //cycles before isJumping times out.
        this.accumulatedGravity = 0;
    }

    readout() {
        console.log(`id ${this.id}`);
        console.log(`vx ${this.vx}`);
        console.log(`vy ${this.vy}`);
        console.log(`isJumping ${this.isJumping}`);

    }
    
    floorSelf(){
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.vx = Math.floor(this.vx);
        this.vy = Math.floor(this.vy);
    }
    
//    fixSelf(num=2){
//        this.x = (this.x).toFixed(2);
//        this.y = (this.y).toFixed(2);
//        this.vx = (this.vx).toFixed(2);
//        this.vy = (this.vy).toFixed(2);
//    }
//    

    drawself() {
        superdrawImage(Global.images.book, 0, 0, 128, 128, this.x, this.y, this.scale, this.scale);
    }


    applyForces() {

        
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= this.friction;
        this.vy 
        
        
    }
    
    processControllerState() {

//             this.fixSelf();
        
        if (CS.r) {
            console.log(`move right ${this.vx}`);
            this.vx++;
        }
        if (CS.l) {
            console.log(`move left ${this.vx}`);
            this.vx--;
        }
        if (CS.u) {
            console.log(`move up ${this.vy}`);
//            this.vy--;
        }
        if (CS.d) {
            console.log(`move down ${this.vy}`);
//            this.vy++;
        }
        
        if (CS.isJumping){
            this.vy = -15;
            this.accumulatedGravity++;
            console.log(`jump ${this.vy}`);
        }else{
            this.accumulatedGravity = 0;
        }

        
   


    }



    tick() {
//        console.log(`Book<-frame: ${frame}`);
        this.processControllerState();
        this.applyForces();
        this.drawself();



    }



    jumpTimer() {

    }
}

let book = new Book('bob', 5, 455 - RP.floor.height);

book.tick();
book.readout();
