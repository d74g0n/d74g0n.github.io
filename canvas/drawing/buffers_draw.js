const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d',{alpha:false});

ctx.imageSmoothingEnabled= false;
ctx.globalAlpha = 1;
ctx.width = 512;
ctx.height = 256;





function fFillRect(ctx = ctx, x = 0, y = 0, sx = 10, sy = 10, col = 'red') {
    ctx.save();
    ctx.fillStyle = col;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(sx), Math.floor(sy));
    ctx.restore();
}

function fStrokeRect(ctx = ctx, x = 0, y = 0, sx = 10, sy = 10, col = 'red', lw=2) {
    
    lw = Math.floor(lw);
    if (lw % 2 == 0){
    }else{
        console.log(`adding 1 to linewidth to avoid subpixel aliasing`);
        lw+=1;
    }
    
    ctx.save();
    ctx.lineWidth = lw;
    ctx.strokeStyle = col;
    ctx.strokeRect(Math.floor(x+(lw/2)), Math.floor(y+(lw/2)), Math.floor(sx-(lw)), Math.floor(sy-(lw)));
    ctx.restore();
}



let tmp = {
    x: 100,
    y: 20,
    sx: 10,
    sy: 10,
}

function loop() {
    
    
fFillRect(ctx, tmp.x, tmp.y,tmp.sx,tmp.sy,'#711');
fStrokeRect(ctx, tmp.x, tmp.y,tmp.sx,tmp.sy,'#171',tmp.sx/10);
    
    tmp.sx += 0.1;
    tmp.sy += 0.2;
    
requestAnimationFrame(loop);    
}




//loop();






