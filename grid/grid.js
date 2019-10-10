console.log(`grid.js`);

let grid = {
    isdebugging: true,
    log: function(msg){
      if (grid.isdebugging)  {
          console.log(msg);
      }
    },
    scale: 32,
    rows: 10,
    coll: 10,
    testPattern: function (colA='white',colB='grey') {
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
//    tileclickprocess(coordarr){
//        
// 
//        
//    },
    clicked: function(e){
        grid.log(`[tile+1][${Math.floor(e.offsetX / grid.scale)+1},${Math.floor(e.offsetY /grid.scale)+1}]`);
        gridEditor.highlightTile(Math.floor(e.offsetX / grid.scale),Math.floor(e.offsetY /grid.scale));
//        return [Math.floor(e.offsetX / grid.scale),Math.floor(e.offsetY /grid.scale)];
//        grid.tileclickprocess([Math.floor(e.offsetX / grid.scale),Math.floor(e.offsetY /grid.scale)]);
    },
    init: function() {
        canvas.width = grid.scale * grid.coll;
        canvas.height = grid.scale * grid.rows;
        
//        grid.testPattern('red','blue');
        canvas.onclick = grid.clicked;
        return grid;
    }
}

grid.init();
