



class line {
    
    constructor(pointA,pointB){
        this.pointA = pointA;
        this.pointB = pointB;
    }
    
    deduceLine(){
        let x1 = this.pointA;
        let x2 = this.pointB;
        
        this.dAB = x1 - x2;
        this.dBA = x2 - x1;
        
    }
    
}


class point {
    constructor(uid){
        this.uid = uid;
    }
    
    addData(key, data){
        this[key] = data;
    }
    
    readout(){
        console.log(this);
    }
    
}
/*

I AM    
I Wasnt? (Always because timestart = nothing)
2-how did it come to be?
3-where is it going (0->now->future)
accident


*/
