class player {
    constructor(id){
        this.id = id;
        this.points = 0;
        this.color = 'lime';
        this.pieces = [];
    }
    
    addPiece(msg) {
        this.pieces.push(msg);
    }
    
    readout() {
        console.log('i worked');
        console.log(`id: ${this.id}`);
        console.log(`points: ${this.points}`);
        console.log(`pieces: ${this.pieces}`);
    }
}

let me = new player('bob');

me.addPiece('BOOF HELLO!');

me.readout();