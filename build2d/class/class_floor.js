class Floor {
    constructor(x=0,y=300,w=400,h=180,col='#961'){
    
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.scol = '#999';
        this.ctx = buffers.bg.getContext('2d');
    //perspective factor::
        this.p = 1;
    
        this.centerX = buffers.bg.width/2;
    }
    
    tick(){
        this.drawSelf();
    }
    
    drawSelf(){
        this.ctx.save();
        this.ctx.fillStyle = this.col;
//        this.ctx.fillRect(this.x,this.y,this.w,this.h)
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x-Math.floor((this.h/this.p)),this.y+this.h);
        this.ctx.lineTo(this.x,this.y+this.h);
        
        this.ctx.lineTo(Math.floor(this.x+(this.h/this.p)+this.w),Math.ceil(this.y+this.h));
        this.ctx.lineTo(Math.floor(this.x+this.w),this.y);
        this.ctx.closePath();
        
        
        this.ctx.strokeStyle = this.scol;
        this.ctx.lineWidth = 8;
        this.ctx.stroke();
        this.ctx.fill();
//        
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#400';
        this.ctx.moveTo(this.centerX, this.y);
        this.ctx.lineTo(this.centerX,this.y+this.h);
        this.ctx.lineTo(this.centerX+1,this.y+this.h);
        this.ctx.lineTo(this.centerX+1, this.y);
        this.ctx.closePath();
//        
        this.ctx.stroke();
        
        
        
    
        this.ctx.restore();
    }
    
    
    
    
    
    
    
}