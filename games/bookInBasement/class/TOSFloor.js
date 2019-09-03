class TOSfloor {
    constructor ( y = 50) {
        this.y = y;
        this.color = {
            light: TOS.color.floor.light,
            dark: TOS.color.floor.dark,
        }
        this.gradient = undefined;
    }
    
    tick(){
        this.drawSelf();
    }
    
    drawSelf () {
        if (this.gradient == undefined){
            this.gradientFloor();
        }
        setColor(this.gradient);
        //ratios used end up with 7 being ruff-but-close estimate (strokes etc)
        drawRect(0,this.y*7,canvas.width,canvas.height - this.y*7);
    }
    
    isFloor(yval){
        if(yval > (this.y*7)+4){
            return true;
        }else {
            return false;
        }
    }
    
    
    gradientFloor() {
        let gradient = ctx.createLinearGradient(0, this.y*7.2, 0,canvas.height);
        gradient.addColorStop(1, this.color.dark);
//        gradient.addColorStop(0.05, this.color.dark);
        gradient.addColorStop(0.05, this.color.light);
        gradient.addColorStop(0, this.color.light);
        this.gradient = gradient;
    }
    
    
}