
let MapEditor = {
    init: function () {
        return MapEditor;
    },
    paint: {
        sx: 14,
        sy: 2,
        tile: function (x = MapEditor.tile.x, y = MapEditor.tile.y, sx = MapEditor.paint.sx, sy = MapEditor.paint.sy) {
            _MAP[y][x].x = sx;
            _MAP[y][x].y = sy;
            return MapEditor;
        },
    },
    set: {
        paint: function (x, y) {
            MapEditor.paint.sx = x;
            MapEditor.paint.sy = y;
        },
        tile: function (x, y) {
            MapEditor.tile.x = x;
            MapEditor.tile.y = y;
        },

    },
    get: {
        tile: function () {
            return MapEditor.tile;
        },
        paint: function () {
            return {
                x: MapEditor.paint.sx,
                y: MapEditor.paint.sy
            };
        },
    },
    tile: {
        x: 0,
        y: 0,
    },
    quickSprite: {
        water: {
            x: 19,
            y: 5,
        },
        waterdeep: {
            x: 19,
            y: 4,
        },
        beach: {
            center: {
              x:17,
              y:6,
            },
            top:{
                x:17,
                y:5,
            },
            left:{
                x:16,
                y:6,
            },
            right:{
                x:18,
                y:6,
            },
            bottom:{
                x:17,
                y:7,
            },
        },
    },
    makeEdge(ax, bx, ay, by, Spos) {
        //        let deltax = ax - bx;
        //        let deltay = ay - by;

        for (y = ay; y <= by; y++) {
            for (x = ax; x <= bx; x++) {
                
                if (Engine.state.map[y][x] == undefined ){
                    //maybe add map later
                }else{
                
                Engine.state.map[y][x].x = Spos.x;
                Engine.state.map[y][x].y = Spos.y;
                }
                
            }
        }
        //draw line of tiles.
    },
    topEdge: function () {
        let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(1,bot-1,0,0,MapEditor.quickSprite.beach.top);
    },
    botEdge: function () {
        let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(1,bot-1,bot,bot,MapEditor.quickSprite.beach.bottom);
    },
    leftEdge: function () {
        let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(0,0,1,bot-1,MapEditor.quickSprite.beach.left);
    },
    rightEdge: function () {
        let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(bot,bot,1,bot-1,MapEditor.quickSprite.beach.right);
    },
    beachEdge: function () {
        MapEditor.topEdge();
        MapEditor.botEdge();
        MapEditor.leftEdge();
        MapEditor.rightEdge();
        MapEditor.corners();
    },
    corners: function () {
         let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(0,0,0,0,{x:(MapEditor.quickSprite.beach.top.x-1),y:MapEditor.quickSprite.beach.top.y});
        MapEditor.makeEdge(bot,bot,0,0,{x:(MapEditor.quickSprite.beach.top.x+1),y:MapEditor.quickSprite.beach.top.y});
        MapEditor.makeEdge(0,0,bot,bot,{x:(MapEditor.quickSprite.beach.bottom.x-1),y:MapEditor.quickSprite.beach.bottom.y});
        MapEditor.makeEdge(bot,bot,bot,bot,{x:(MapEditor.quickSprite.beach.bottom.x+1),y:MapEditor.quickSprite.beach.bottom.y});
    },
    beachFill: function (){
        let bot = Engine.state.map.length-1;
        MapEditor.makeEdge(1,bot-1,1,bot-1,{x:(MapEditor.quickSprite.beach.top.x),y:MapEditor.quickSprite.beach.top.y-1});
        
    },
    beachALL: function () {
        MapEditor.beachFill();
        MapEditor.beachEdge();
        
    },


}
