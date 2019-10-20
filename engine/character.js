//function Character(){
//    this.tileFrom = [1,1];
//    this.tileTo = [1,1];
//    this.timeMoved = 0;
//    this.dimensions = [30,30];
//    this.position = [45,45];
//    this.delayMove = 700;
//}
//Character.prototype.placeAt = function (x,y){
//    this.tileFrom = [x,y];
//    this.tileTo = [x,y];
//    this.position = [((game.tile.w*x)+(game.tile.w-this.dimensions[0])/2)),((game.tile.h*y)+(game.tile.h-this.dimensions[1])/2))];
//}
//Character.prototype.processMovement = function(t){
//    if(this.tileFrom[0]==this.tileTo[0]&&this.tileFrom[1]==this.tileTo[1]){
//        return false;
//    }
//    
//    if((t - this.timeMoved)>=this.delayMove){
//        this.placeAt(this.tileTo[0],this.tileTo[1]);
//    }else{
//        
//    }
//}