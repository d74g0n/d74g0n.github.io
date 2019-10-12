let gridEditor = {
    map: [[0], [0]],
    selectedTile: [],
    highlightTile: function (x = 0, y = 0, color = 'red') {
        // these functions are essentially the draw functions interpreted into board coordinates.
        //        setColor(color);
        //        drawSquare(x * grid.scale, y * grid.scale, grid.scale);
//        ctx.drawImage(spritesheet, myTile.x * 32, myTile.y * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
          ctx.drawImage(spritesheet, myTile.x * 32, myTile.y * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
//        gridEditor.OutlineTile(x,y,'rgba(55,55,55,0.5)');
        

    },
    OutlineTile: function(x,y,color = 'blue') {
             sSq(x * grid.scale, y * grid.scale, grid.scale, color);    
    },
    
    currentPaint: [0, 1],
    init: function () {

        gridEditor.Create2dMap();

        return gridEditor;
    },
    Create2dMap: function () {
        for (y = 0; y < (canvas.height / grid.scale); y++) {
            let tmparr = [];
            for (x = 0; x < (canvas.width / grid.scale); x++) {
                tmparr[x] = undefined;
            }
            gridEditor.map[y] = (tmparr);
        }
        grid.log(gridEditor.map);
    },
    makeChange: function (xyarr = [0, 0]) {
        //grab map data, then change it then set it.

    },
    DrawSpriteTiles: function () {
        for (y = 0; y < (canvas.height / grid.scale); y++) {
            for (x = 0; x < (canvas.width / grid.scale); x++) {
                ctx.drawImage(spritesheet, x * 32, y * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
            }
        }
    },
    grassFill: function () {
        for (y = 0; y < (canvas.height / grid.scale); y++) {
            for (x = 0; x < (canvas.width / grid.scale); x++) {
                ctx.drawImage(spritesheet, 1 * 32, 2 * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
            }
        }
    }
}

//gridEditor.init().highlightTile(2, 2);
//gridEditor.DrawSpriteTiles();

//gridEditor.grassFill();
setTimeout(gridEditor.grassFill,1000);

setTimeout(gridEditor.OutlineTile,2000);
