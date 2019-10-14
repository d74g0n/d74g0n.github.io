let gridEditor = {
    //    map: [[0], [0]],
    highlightTile: function (x = 0, y = 0, color = 'red') {

        mapData.setMapData(grid.layer, y, x, {
            x: myTile.x,
            y: myTile.y
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mapData.redraw();

    },
    OutlineTile: function (x, y, color = 'blue') {
        sSq(x * grid.scale, y * grid.scale, grid.scale, color);
    },
    undoTile: function () {
        console.log(`undo Tile attempted`);
        //        mapData.map = gridEditor.undoMap;
        //        mapData.redraw();

//        function drawUndoMapData() {
//            ctx.clearRect(0, 0, canvas.width, canvas.height);
//            for (let l = 0; l < gridEditor.undoMap.length; l++) {
//                // this will do layers.
//                let layer = gridEditor.undoMap[l];
//                mapData.processLayer(layer, l);
//                console.log(`[draw][layer][${l}]`);
//
//            }
//        
//        }
//        
//       drawUndoMapData();

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
    },
    clear: function () {

    },
    fillLayer: function (spos = {
        x: myTile.x,
        y: myTile.y
    }) {
//        gridEditor.undoMap = mapData.map;
        for (y = 0; y < (canvas.height / grid.scale); y++) {
            for (x = 0; x < (canvas.width / grid.scale); x++) {
                mapData.map[grid.layer][y][x] = spos;
                ctx.drawImage(spritesheet, spos.x * 32, spos.y * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
            }
        }
        mapData.redraw();
    },
    waterFill: function () {
        for (y = 0; y < (canvas.height / grid.scale); y++) {
            for (x = 0; x < (canvas.width / grid.scale); x++) {
                mapData.map[grid.layer][y][x] = {
                    x: 19,
                    y: 4
                };
                ctx.drawImage(spritesheet, 19 * 32, 4 * 32, 32, 32, x * grid.scale, y * grid.scale, grid.scale, grid.scale);
            }
        }
    },
    exportMap: function () {
        console.log(mapData.map);
        console.log(JSON.stringify(mapData.map));
    },
    importMap: function (jsonmap) {
        mapData.map = JSON.parse(jsonmap);
    }
}
