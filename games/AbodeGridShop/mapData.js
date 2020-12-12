// let spritesheet = loadImage(`/games/tileparty/img/spritesheetAlpha.png`)
// let spritesheet = loadImage(`/games/tileparty/img/bricks.png`)


let mapData = {
    isDebug: false,
    RenderisSolo: false,
    toggleRenderType: function () {
        mapData.RenderisSolo = !mapData.RenderisSolo;
        mapData.redraw();
        let bip = document.getElementById("viewbtn");

        if (mapData.RenderisSolo) {
            bip.innerHTML = `SOLO VIEW`;
            bip.style.border = `3px solid skyblue`;
            bip.style.color = 'red';
        } else {
            bip.innerHTML = `FULL VIEW`;
            bip.style.border = `3px solid gold`;
            bip.style.color = 'white';
        }

    },
    init: function () {
        mapData.map = mapData.createDataMap(4, 10, 10);
        grid.log(mapData.map);
        //        grid.testPattern();
        setTimeout(mapData.redraw, 10);
    },
    createDataMap: function (zm = 2, ym = 10, xm = 10) {
        let tmpMap = [];
        for (z = 0; z < zm; z++) {
            let tmpgrid = [];
            for (y = 0; y < ym; y++) {
                let tmpcolls = [];
                for (x = 0; x < xm; x++) {
                    if (z < 1) {
                        // grass tile data.
                        tmpcolls[x] = {
                            x: 47,
                            y: 0,
                        };
                    } else {
                        // clear tile data.
                        tmpcolls[x] = {
                            x: 47,
                            y: 0,
                        };
                    }
                }
                tmpgrid[y] = tmpcolls;
            }
            tmpMap[z] = tmpgrid;
        }
        return tmpMap;
    },
    getMapData: function (z, y, x) {
        return mapData.map[z][y][x];
    },
    setMapData: function (z = 0, y, x, valobj) {
        mapData.map[z][y][x] = valobj;
        if (mapData.isDebug) {
            //        console.log(`set Tile : [z${z},y${y},x${x}]`);
            grid.log(`set Tile : [z${z},y${y},x${x}]`);
        }
    },
    processLayer: function (layer, l) {
        for (let yp = 0; yp < layer.length; yp++) {
            for (let x = 0; x < layer[yp].length; x++) {
                mapData.drawTile(mapData.map[l][yp][x], {
                    x: x,
                    y: yp,
                });
            }
        }
    },
    drawMapData: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mapData.RenderisSolo) {

            let l = grid.layer;
            let layer = mapData.map[l];
            mapData.processLayer(layer, l);
            grid.log(`[SOLO][layer][${l}]`);




        } else {
            for (let l = 0; l < mapData.map.length; l++) {
                // this will do layers.
                let layer = mapData.map[l];
                mapData.processLayer(layer, l);
                grid.log(`[draw][layer][${l}]`);
            }
        }
    },
    drawTile: function (spos, dpos) {
        ctx.drawImage(spritesheet, spos.x * grid.scale, spos.y * grid.scale, grid.scale, grid.scale, dpos.x * grid.scale, dpos.y * grid.scale, grid.scale, grid.scale);
    },
    redraw: function () {
        mapData.drawMapData();
    }
}

console.log('mapData.js');

mapData.init();
