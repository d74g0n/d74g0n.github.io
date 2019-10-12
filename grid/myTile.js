let myTile = {
    x: 0,
    y: 1,
    s: 32,
    scale: 256,
    draw: function(){
        ttx.drawImage(spritesheet, myTile.x * 32, myTile.y * 32, 32, 32, 0, 0, tanvas.width, tanvas.height);
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
    backSprite(){
        
    },
    
}

tanvas.onclick = myTile.nextSprite;
setTimeout(myTile.draw,500);