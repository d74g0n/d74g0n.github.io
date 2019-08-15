let global = {
    scale: 4,
    tiles: {
        water: 0,
        grass: 0,
    },
};

let gamestate = {
    phase: 'start',
    players: undefined,
    round: 0,
//    mag: 25,
    mag: 100,
    seed: undefined,
}








// RENDER FUNCTION IN A NUTSHELL
function drawBoard() {
    // somewhat equivellant to clearscreen.
    for (let y = 0; y <= canvas.height / global.scale; y++) {
        for (let x = 0; x <= canvas.width / global.scale; x++) {

            fillCheckerboard(x, y);
            fillGrass(x, y, gamestate.mag);

            drawSquare(x * global.scale, y * global.scale, global.scale);

        }
    }
    
    //DEBUG
    
    console.log(global.tiles);
    let total = global.tiles.grass + global.tiles.water;
    let percentagew = global.tiles.water/total;
    let percentageg = global.tiles.grass/total;
    
    console.log(`grass% ${percentageg* 100}`);
    console.log(`water% ${percentagew* 100}`);
    
    let debugmsg = `SEED(${rndSeed})<br>${(percentageg* 100).toFixed(2)}% grass</br>${(percentagew* 100).toFixed(2)}% water`;
    dlog(debugmsg);
    
    
//    if (global.tiles.water > 300){
//        global.tiles.water = 0;
//        global.tiles.grass = 0;
//        rndSeed = RNDNum(0.1,9000);
//        drawBoard();
//    }
    
    if ((percentagew *100)> 17) {
        reRollMap();
        setTimeout(drawBoard,500);
    }
    
    
}

function reRollMap() {
        global.tiles.water = 0;
        global.tiles.grass = 0;
        rndSeed = RNDNum(0,9000); 
}


canvas.onmousedown = function (ev) {

    let x = Math.floor(ev.offsetX / global.scale); 
    let y = Math.floor(ev.offsetY / global.scale); 

    highlightTile(x, y, 'grey');

}

drawBoard();
