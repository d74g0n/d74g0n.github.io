let MainMap = {
    leftX: 32,
    CouchWidth: 100,
    isOnCouch: false,
}
const Map = MainMap;

function checkFloor(x, y) {


    return true;

}


function drawFloor() {
    // DEBUGGER TOOL.
    setStrokeColor('red');
    ctx.lineWidth = 4;
    //couch:

    drawLine(32, 332, 68, 332);
    drawLine(68, 332, 80, 340);
    //flooe:

    drawLine(80, 390, canvas.width - 80, 390);
}

// MOST BASIC COLLISION.  KEEPING PLAYER ON SCREEN.
function isFloor(x, y, obj) {

    //sort by x to isolate math.


    if (x < 32) {
        //LEFT = 32 - anything under 32 is set to 32.
        // zero to edge
        //        x = 32;
        obj.x = 32;
        obj.vx = 0;
        if (y > 332) {
            obj.y = 333;
            obj.hitFloor();
            return true;
        }
        if (debugging){
        console.log(`LEFT edge hit`);
            }
    }

    if (x >= 31 && x <= 69) {
        //on couch
        if (y > 332) {
            obj.y = 333;
            obj.hitFloor();
            return true;
        }
                if (debugging){
        console.log(`on couch`);}
    }

    if (x >= 69.01 && x <= 80) {

        let deltaS = (80 - 69); //11steps - 332-340 8
        let deltaX = 80 - x;

        if (y > 332) {
            obj.hitFloor();
            obj.y = 340 - deltaX;
            return true;
        }
                if (debugging){
        console.log(`getting off couch`);}


    }


    if (x >= 81) {
        if (y > 390) {
            //bottom floor general.
            obj.y = 390;
            return true;
        }
                if (debugging){
        console.log(`carpet`);}
    }

return false;

}
