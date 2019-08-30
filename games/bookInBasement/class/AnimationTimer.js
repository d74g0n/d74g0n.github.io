class AnimationTimer {
    constructor() {
        this.longcount = 0;
        this.sixtycount = 0;
        this.isAdding = true;
        this.weight = 1;
        this.height = 32000000;
        this.is1000 = false;
        this.is500 = false;
        this.isDoor = false;
    }

    tick() {
        this.mathLogic();
        this.confineBounds();
    }

    mathLogic() {
        if (this.isAdding) {
            this.increment(this.weight);
        } else {
            this.decrement(this.weight);
        }
        
        if (this.check1kModolo()){
            this.is1000 = !this.is1000;
        }
        
        if(this.checkModolo(500)){
            this.is500 = !this.is500;
        }
        
        
        if(this.checkModolo(75)){
            this.isDoor = !this.isDoor;
        }
        
    }

    confineBounds() {

        if (this.longcount > this.height) {
            this.longcount = 0;
        }

        if (this.longcount < 0) {
            this.longcount = this.height;
        }
        
        if (this.sixtycount > 60){
            this.sixtycount = 60;
        }
        
        if (this.sixtycount < 0) {
            this.sixtycount = 0;
        }

    }


    checkModolo(val = 1) {
        if (this.longcount % val == 0) {
            return true;
        } else {
            return false;
        }
    }
    check1kModolo() {
        if (this.longcount % 1000 == 0) {
            return true;
        } else {
            return false;
        }
    }
    
    setSixty(val = 0){
        this.sixtycount = val;
    }

    setLongcount(val = 0) {
        this.longcount = val;
    }

    increment(val = 1) {
        this.longcount += val;
        this.sixtycount += val;
    }

    decrement(val = 1) {
        this.longcount -= val;
        this.sixtycount -= val;

    }


}


