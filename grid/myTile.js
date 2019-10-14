let myTile = {
    x: 1,
    y: 2,
    s: 32,
    scale: 256,
    draw: function(){
        ttx.drawImage(spritesheet, myTile.x * 32, myTile.y * 32, 32, 32, 0, 0, tanvas.width, tanvas.height);
    },
    redraw: function(){
      myTile.draw();  
    },
    nextSprite(){
        
        myTile.x++;
        
        if (myTile.x > 48){
            myTile.x = 0;
            myTile.y++;
        }
        
        ttx.clearRect(0,0,tanvas.width,tanvas.height);
        ttx.drawImage(spritesheet, myTile.x * 32, myTile.y * 32, 32, 32, 0, 0, tanvas.width, tanvas.height);
    },
}

setTimeout(myTile.redraw,500);