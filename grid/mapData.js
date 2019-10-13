        function loadImage(path) {
            let image = new Image();
            image.src = path;
            image.onload = function() {
                stx.drawImage(this, 0, 0, this.width, this.height, 0, 0, sanvas.width, sanvas.height, );
            };
            return image;
        }

//        let spritesheet = loadImage(`/games/tileparty/img/Voirol.png`)
        let spritesheet = loadImage(`/games/tileparty/img/spritesheetAlpha2.png`);
//        let spritesheet = loadImage(`/games/tileparty/img/spritesheetAlpha.png`)
//        let spritesheet = loadImage(`/games/tileparty/img/bricks.png`)


let mapData = {
    init: function () {
        mapData.map = mapData.createDataMap(2, 10, 10);
        console.log(mapData.map);
    },
    createDataMap: function (zm = 2, ym = 10, xm = 10) {
        let tmpMap = [];
        for (z = 0; z < zm; z++) {
            let tmpgrid = [];
            for (y = 0; y < ym; y++) {
                let tmpcolls = [];
                for (x = 0; x < xm; x++) {
                    tmpcolls[x] = `<z${z},y${y},x${x}>`;
                }
                tmpgrid[y] = tmpcolls;
            }
            tmpMap[z] = tmpgrid;
        }
        return tmpMap;
    },
    getMapData(z, y, x) {
        return mapData.map[z][y][x];
    },
}

console.log('mapData.js');

mapData.init();

class cellData {
    constructor(gx=0, gy=0, sx=2, sy=2, gs=grid.scale, ss=32) {
        this.sx = sx;
        this.sy = sy;
        this.gx = gx;
        this.gy = gy;
        this.ss = ss;
        this.gs = gs;
    }

    drawSelf() {
        ctx.drawImage(spritesheet, this.sx * this.ss, this.sy * this.ss, this.ss, this.ss,
            this.gx * this.gs, this.gy * this.gs, this.gs, this.gs);
    }
    tick() {
        this.drawSelf();

    }

}


let tester = new cellData(1,1);

tester.tick();


