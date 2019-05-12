class level {
    constructor (id = 'default') {
        this.id = id;
        this.tilemap = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
    }
}



class scene {
    constructor (tilescale = 8, ctx) {
        //use buffer here?
        this.tilescale = tilescale;
        this.ctx = ctx;
        
        
    }
    
    drawmap (x,y) {
        
    }
    
    
}