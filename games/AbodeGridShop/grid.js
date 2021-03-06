console.log(`grid.js`);

let grid = {
    isdebugging: false,
    layer: 0,
    log: function (msg) {
        if (grid.isdebugging) {
            console.log(msg);
        }
    },
    scale: 32,
    rows: 10,
    coll: 10,
    layerUP: function (){
        grid.layer++;
        if (grid.layer > mapData.map.length-1){
            grid.layer  = mapData.map.length -1;
        }
        
        grid.layerReadout();
        mapData.redraw();
    },
    layerDOWN: function (){
        grid.layer--;
        if (grid.layer<0){
            grid.layer = 0;
        }
       grid.layerReadout();
        mapData.redraw();
    },
    layerReadout: function(){
         document.getElementById("layerData").innerHTML = `[${grid.layer}]`;
    },
    testPattern: function (colA = 'white', colB = 'grey') {
        // drawsCheckerboard
        for (let y = 0; y <= canvas.height / grid.scale; y++) {
            for (let x = 0; x <= canvas.width / grid.scale; x++) {
                if (y % 2 == 0) {
                    if (x % 2 == 0) {
                        setColor(colA);
                    } else {
                        setColor(colB);
                    }
                } else {
                    if (x % 2 == 0) {
                        setColor(colB);
                    } else {
                        setColor(colA);
                    }
                }
                drawSquare(x * grid.scale, y * grid.scale, grid.scale);
            }
        }
        return grid;
    },
    clicked: function (e) {

        function getMousePos(evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top,
                scale: rect.width / grid.rows,
            };
        }

        let pos = getMousePos(e);
        grid.log(`[pos+1][${Math.floor(pos.x / pos.scale)+1},${Math.floor(pos.y /pos.scale)+1}]`);
        
//        gridEditor.undoMap = mapData.map;
        
        gridEditor.highlightTile(Math.floor(pos.x / pos.scale), Math.floor(pos.y / pos.scale));

        document.getElementById("cellData").innerHTML = `[${Math.floor(pos.x / pos.scale)},${Math.floor(pos.y /pos.scale)}]`
    },
    init: function () {
        canvas.width = grid.scale * grid.coll;
        canvas.height = grid.scale * grid.rows;

        //        grid.testPattern('red','blue');
        canvas.onclick = grid.clicked;
        return grid;
    }
}

grid.init()/*.testPattern('rgba(0,0,0,0.4)', 'rgba(255,255,255,0.4)');*/
