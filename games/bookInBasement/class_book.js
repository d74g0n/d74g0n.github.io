class Book {
    constructor(id = 'book'){
        this.id = id,
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
    }
    
    readout() {
        console.log(`id ${this.id}`);
        console.log(`vx ${this.vx}`);
        console.log(`vy ${this.vy}`);
        console.log(`isJumping ${this.isJumping}`);

    }
    
    tick(frame) {
        console.log(`Book<-frame: ${frame}`);
        
        
    }
    
    checkControllerState(){
        
    }
    
    jumpTimer() {
        
    }
}