//class viewport = {
//    constructor(){
//        this.screen = 
//    }
//}

//https://youtu.be/KL4unLXkxCs?t=624

let viewport = {
    screen: [0,0], //canvas.width,height
    startTile: [0,0],
    endTile: [0,0],
    offset: [0,0],
    update: function(px,py){
        this.offset[0] = Math.floor((this.screen[0]/2)-px);
        this.offset[1] = Math.floor((this.screen[1]/2)-py);
        
        let tile = [
            Math.floor(px/tileW),
            Math.floor(py/tileH),
        ];
        
        this.startTile[0]= tile[0] - 1 -             Math.ceil((this.screen[0]/2)/tileW);
        
        this.startTile[0]= tile[1] - 1 -             Math.ceil((this.screen[1]/2)/tileH);
        
        if(this.startTile[0]<0){ this.startTile[0]=0;}
        if(this.startTile[1]<0){ this.startTile[1]=0;}
        
        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2)/tileW);
        
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2)/tileH);
        
        if(this.endTile[0] >= mapW){ this.endTile[0] = mapW - 1;}
        if(this.endTile[1] >= mapH){ this.endTile[1] = mapH - 1;}
        
    }
}