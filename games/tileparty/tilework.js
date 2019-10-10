console.log(`tilework.js`);

let repeater = {
    interval: 1000,
    timer: undefined,
    setInterval: function (val = 1000) {
        repeater.interval = val;
        return repeater;
    },
    isON: false,
    toggleState: function () {
        repeater.isON = !repeater.isON;
        return repeater;
    },
    start: function () {
        repeater.isON = true;
        //        if (repeater.timer == !undefined) {
        clearInterval(repeater.timer);
        //        }
        repeater.timer = setInterval(repeater.loop, repeater.interval);
        return repeater;
    },
    stop: function () {
        repeater.isON = false;
        clearInterval(repeater.timer);
        return repeater;
    },
    logic: function () {
        //        repeater.isON == !repeater.isON;
        if (repeater.isON) {
            console.log(`repeater on`);

            if (repeater.timer == undefined) {
                repeater.start();
            }


        } else {

            console.log(`repeater off`);
            repeater.stop();
        }
    },
    loop: undefined,
}

let tiler = {
    map: [[0]],
    s: 32,
    init: function () {
        tiler.map[0] = [];
        tiler.CreateMap();
    },
    addTile: function (x, y, val) {

        tiler.map[y][x] = val;

        return [];
    },
    CreateMap: function () {
        for (y = 0; y < (canvas.height / tiler.s); y++) {
            let tmparr = [];
            for (x = 0; x < (canvas.width / tiler.s); x++) {
                tmparr[x] = x;
            }
            tiler.map[y] = (tmparr);
        }
    },
    DrawSpriteTiles: function () {
        for (y = 0; y < (canvas.height / tiler.s); y++) {
            for (x = 0; x < (canvas.width / tiler.s); x++) {
                ctx.drawImage(spritesheet, x * tiler.s, y * tiler.s, tiler.s, tiler.s, x * tiler.s, y * tiler.s, tiler.s, tiler.s);
            }
        }
    },
}

let camera = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    drawView: function () {
        // camera is a buffer offset of 2 canvas's.
    },
    rasterMap: function () {
        //only render whats on screen to buffer;
        //        then cut appropriately.
    },
}

let tilePicker = {
    tX: 0,
    tY: 22,
    wrapIndex: function () {

//        tilePicker.tX++;

        if (tilePicker.tX < 0){
            tilePicker.tX = 47;
        }
        
            
            
            if (tilePicker.tY < 0){
                tilePicker.tY = 22;
            }
        
        
        if (tilePicker.tX == 48) {
            tilePicker.tX = 0;
            tilePicker.tY++;
        }



        if (tilePicker.tY == 23) {
            tilePicker.tY = 1;
        }

    },
    toggleTile: function () {

    },
    calcTile: function (e) {
        //take mouse find tile coordinate. return it.
    },
    reDrawTile: function () {
        let tilescale = tiler.s;
        //          let drawScale = 256;
        let drawScale = 512;
        let tileLeft = (canvas.width / 2 - drawScale / 2);
        let tileTop = (canvas.height / 2 - drawScale / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(spritesheet, tilePicker.tX * tiler.s, tilePicker.tY * tiler.s, tiler.s, tiler.s, tileLeft, tileTop, drawScale, drawScale);
        //        console.log(tilePicker.tX);
        //        console.log(`tile[${tilePicker.tX},${tilePicker.tY}]`);
    },

}



function loadImage(path) {
    let image = new Image();
    image.src = path;
    return image;
}

let spritesheet = loadImage(`img/Voirol.png`);

function DrawMap() {
    for (y = 0; y < (canvas.height / tiler.s); y++) {
        for (x = 0; x < (canvas.width / tiler.s); x++) {
            //1:1
            //          ctx.drawImage(spritesheet, xman*tiler.s, 1*tiler.s, tiler.s, tiler.s, x*tiler.s, y*tiler.s, tiler.s, tiler.s);
            background('black');
            //            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(spritesheet, x * tiler.s, y * tiler.s, tiler.s, tiler.s, x * tiler.s, y * tiler.s, tiler.s, tiler.s);
            //          ctx.drawImage(spritesheet, xman*tiler.s, yman*tiler.s, tiler.s, tiler.s, x*(tiler.s*2), y*(tiler.s*2), (tiler.s*2), (tiler.s*2));
        }
    }
    //    ctx.drawImage(spritesheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}




//setTimeout(tilePicker.reDrawTile, 1000);

   
//       readout.textContent = `[${tilePicker.tX},${tilePicker.tY}]`;
function toggleIndex() {
    
 const readout = document.getElementById("coord");
    readout.innerHTML = `[${tilePicker.tX},${tilePicker.tY}]`;
    
    
    tilePicker.wrapIndex();
    tilePicker.reDrawTile();
//    writeText(`[${tilePicker.tX},${tilePicker.tY}]`, 1, 1, font = `12px monospace`, fillStyle = 'red', strokeStyle = 'gold', textBaseline = 'top', textAlign = 'left')


//    repeater.logic();

}

//repeater.loop = toggleIndex;
//repeater.start();

//document.onclick = toggleIndex;

//document.onclick = function () {repeater.toggleState(); tilePicker.reDrawTile();};

//setInterval(toggleIndex, 500);

//
//
//document.onclick = function () {
//    background(_M.rnd.hex());
//    tiler.DrawSpriteTiles();
//}


//tiler.init();
//setTimeout(tiler.DrawSpriteTiles, 500);
