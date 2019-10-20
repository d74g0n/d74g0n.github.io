// Global Settings::
let game = {
    ctx: null,
    canvas: null,
    scale: 32,
    tile: {
        w: 32,
        h: 32
    },
    map: {
        w: 100,
        h: 100,
        s: 32,
    },
    currentSecond: 0,
    frameCount: 0,
    framesLastSecond: 0,
    lastFrameTime: 0,
}
// put these EVENTS somewhere appropriate::
window.onresize = function () {
    Engine.resizeCanvas();
    //    Engine.renderer.draw.testPattern(game.scale, `rgba(55,55,55,0.8)`, `rgba(155,155,155,0.8)`);
}

window.onload = function () {
    Engine.init();
    //    Engine.renderer.draw.testPattern(32, `rgba(55,55,55,0.8)`, `rgba(155,155,155,0.8)`);
}

let Engine = {
    v: `0.000.002`,
    isVerbose: true,
    log: function (msg) {
        if (Engine.isVerbose) {
            console.log(`[E]${msg}`);
        }
    },

    state: {
        players: [],
        mapobjects: [],
        map: [[], []],
        // HUD: [],
    },

    run: {
        fps: function () {
            //            game.ctx.fillStyle = '#ff0000';
            game.ctx.fillStyle = '#ffffff';
            game.ctx.fillText(`FPS: ${game.framesLastSecond}`, 10, 20);
        },
        speed: {
            factor: function (modu) {
                if (Engine.frame % modu == 0) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        loop: function () {
            if (game.ctx == null) {
                return;
            }

            
            
            
            

            if (Engine.run.isActive) {
                Engine.run.fps();
                requestAnimationFrame(Engine.run.loop);
            }
        },


    },

    viewport: {
        //TopLeft
        x: 0,
        y: 0,

        //width of canvas in tiles
        w: null,
        h: null,

        offsetx: 0,
        offsety: 0,

        calcMoves: function () {

//            if (Engine.viewport.offsetx >= game.map.s) {
//                Engine.viewport.offsetx -= game.map.s;
//                Engine.viewport.x += 1;
//            }
//            if (Engine.viewport.offsetx <= (game.map.s) * -1) {
//                Engine.viewport.offsetx += (game.map.s) * -1;
//                Engine.viewport.x -= 1;
//            }
//            if (Engine.viewport.offsety >= game.map.s) {
//                Engine.viewport.offsety += game.map.s;
//                Engine.viewport.y += 1;
//            }
//            if (Engine.viewport.offsety <= (game.map.s) * -1) {
//                Engine.viewport.offsety -= game.map.s;
//                Engine.viewport.y -= 1;
//            }

//                        if (Engine.viewport.x < (game.map[0][0].length* -1)){
//                            Engine.viewport.x = (game.map[0][0].length* -1);
//                        }
//                        
//                        if (Engine.viewport.y<(game.map.length* -1)){
//                            Engine.viewport.y = (game.map.length* -1);
//                        }
                        


        },
        isVerbose: true,
        log: function (msg) {
            if (Engine.viewport.isVerbose) {
                Engine.log(`[viewport]${msg}`);
            }
        },
        update: function () {
            Engine.viewport.w = Math.floor(game.canvas.width / game.tile.w);
            Engine.viewport.h = Math.floor(game.canvas.height / game.tile.h);
        },
        getDimensions: function () {
            Engine.viewport.update();
            return {
                x: Engine.viewport.w,
                y: Engine.viewport.h
            };

        },
        getCenterTile: function () {
            return {
                x: Math.floor(((game.canvas.width / game.tile.w) / 2) - 0.5),
                y: Math.floor(((game.canvas.height / game.tile.h) / 2) - 0.5),
            };
        },

    },

    controller: {

        keysDown: { // -=-=-=-= https://youtu.be/xsNdwyuuSzo?t=90
            37: false,
            38: false,
            39: false,
            40: false,
        },






        //        controls: {},
        //        state: {
        //            up: false,
        //            down: false,
        //            left: false,
        //            right: false,
        //            space: false,
        //            shift: false,
        //        },
        //        keydown: function (ev) {
        //            //router:: this scare?
        //            this.keylogic(ev, false);
        //        },
        //        keyup: function (ev) {
        //            //router  this scare!
        //            this.keylogic(ev, true);
        //        },
        //        keylogic: function (ev, isUP = false) {
        //
        //        },
    },

    preloader: {
        settings: {
            levelid: `undefined`,
            spritesheet: `/games/tileparty/img/spritesheetAlpha.png`, // NOTICE
        },
        init: function (settings = Engine.preloader.settings) {
            //hookinto renderer lists
            Engine.renderer.sprite.push(Engine.preloader.loadSpriteSheet(settings.spritesheet));
        },
        isVerbose: true,
        log: function (msg) {
            if (Engine.preloader.isVerbose) {
                //            if (true) {
                console.log(`[preloader][${msg}]`);
            } else {
                return Engine.preloader.isVerbose;
            }
        },
        loadImage: function (path) {
            let image = new Image();
            image.src = path;
            image.onload = function (verbage = Engine.isVerbose) {
                if (verbage) {
                    Engine.preloader.log(`[preloader.loadimage][${path}][LOADED]`);
                }
            };
            return image;
        },
        loadSpriteSheet: function (path) {
            Engine.renderer.sprite.push(Engine.preloader.loadImage(path));
        },
    },

    renderer: {
        sprite: [],
        canvaslist: [],
        ctxlist: [],

        clear: function () {
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        },
        draw: {
            spritesheet: function (index = 0) {
                let iW = game.canvas.width / game.scale;
                let iH = game.canvas.height / game.scale;
                for (let y = 0; y < iH; y++) {
                    for (let x = 0; x < iW; x++) {
                        Engine.renderer.draw.itile(0, {
                            x: x,
                            y: y,

                        }, {
                            x: x,
                            y: y,

                            offx: Engine.viewport.offsetx,
                            offy: Engine.viewport.offsety,
                        });
                    }
                }

            },
            tile: function (pos={x:0,y:0,offx:Engine.viewport.x,offy:Engine.viewport.y}, size = 1) {
                game.ctx.fillRect((pos.x * game.tile.w * size) + pos.offx, (pos.y * game.tile.h * size) + pos.offy, game.tile.w * size, game.tile.h * size);
            },
            itile: function (spriteindex = 0, Spos, Dpos, size = 1) {
                if (Dpos.offx == undefined) {
                    Dpos.offx = 0;
                    Dpos.offy = 0
                };
                game.ctx.drawImage(Engine.renderer.sprite[spriteindex], Spos.x * game.tile.w, Spos.y * game.tile.h, game.tile.w, game.tile.h, (Dpos.x * game.tile.w) + Dpos.offx, (Dpos.y * game.tile.h) + Dpos.offy, game.tile.w * size, game.tile.h * size);

            },
            view: function (map = Engine.state.map) {

                let xTileIndex = Engine.viewport.x;
                let yTileIndex = Engine.viewport.y;

                let RenderHeight = game.canvas.height / game.scale;
                let RenderWidth = game.canvas.width / game.scale;




                for (y = yTileIndex; y <= RenderHeight + 1; y++) {
                    for (x = xTileIndex; x <= RenderWidth + 1; x++) {
                        Engine.renderer.draw.itile(0, Engine.state.map[y + (yTileIndex * -1)][x + (xTileIndex * -1)], {
                            x: x,
                            y: y,
                            offx: Engine.viewport.offsetx,
                            offy: Engine.viewport.offsety,
                        }, 1);
                    }
                }

            },
            map: function (map = Engine.state.map) {
                let iW = game.canvas.width / game.scale;
                let iH = game.canvas.height / game.scale;

                for (let y = Engine.viewport.y; y < iH + Engine.viewport.h + Engine.s32(Engine.viewport.y); y++) {
                    for (let x = Engine.viewport.x; x < iW + Engine.viewport.w + Engine.s32(Engine.viewport.x); x++) {

                        if (Engine.state.map[y][x] == null) {
                            console.log(`map ran out`);
                            break;
                        } else {
                            Engine.renderer.draw.itile(0, Engine.state.map[y][x], {
                                x: x,
                                y: y,
                                offx: Engine.viewport.offsetx,
                                offy: Engine.viewport.offsety,
                            }, 1);
                        }
                    }
                }

            },
            CameraSafeArea: function (scale = game.tile.w) {
                game.ctx.fillStyle = 'rgba(0,0,255,0.9)';
                //center::
                game.ctx.fillRect(Engine.viewport.getCenterTile().x * scale, Engine.viewport.getCenterTile().y * scale, scale * 2, scale * 2);

                game.ctx.fillStyle = 'rgba(0,255,155,0.7)';
                game.ctx.fillRect(1 * scale, 1 * scale, scale * 1, scale * 1);

                let pos = Engine.viewport.getDimensions();
                game.ctx.fillRect(1 * scale, (pos.y - 2) * scale, scale * 1, scale * 1);
                game.ctx.fillRect((pos.x - 2) * scale, 1 * scale, scale * 1, scale * 1);
                game.ctx.fillRect((pos.x - 2) * scale, (pos.y - 2) * scale, scale * 1, scale * 1);
            },
            testPattern: function (scale = '32', colA = 'red', colB = 'white') {
                let iW = game.canvas.width / scale;
                let iH = game.canvas.height / scale;
                let colourToggle = false;
                for (let y = 0; y < iH; y++) {
                    for (let x = 0; x < iW; x++) {
                        if (colourToggle) {
                            game.ctx.fillStyle = colA;
                        } else {
                            game.ctx.fillStyle = colB;
                        }
                        Engine.renderer.draw.tile({
                            x: x,
                            y: y,
                            offx: Engine.viewport.offsetx,
                            offy: Engine.viewport.offsety,
                        }, 1);
                        colourToggle = !colourToggle;
                    }
                    if (Math.floor(iW) % 2 == 0) {} else {
                        colourToggle = !colourToggle;
                    }
                }

                //DEBUGGING
                Engine.renderer.draw.CameraSafeArea(scale);

            },
        },

        render: function (state = Engine.state) {

        },

    }, //eof renderer

    _M: {
        rnd_bool: function () {
            return Math.random() >= 0.5;
        },
        rnd_range: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        rnd_hex: function () {
            return `#${(0x1000000 | (Math.floor(Math.random()*16777215))).toString(16).substring(1).toUpperCase()}`;
        },
        rnd_rgb: function (min, max) {
            return `rgb(${Engine._M.rnd_range(min,max)},${Engine._M.rnd_range(min,max)},${Engine._M.rnd_range(min,max)})`;
        }
    },

    posObj: function (x, y) {
        return {
            x: x,
            y: y
        };
    },
    s32: function (num) {
        //scales up by 32.
        return num * 32;
    },
    inflate: function (num) {
        return Engine.s32(num);
    },

    getMapTileData: function (pos) {
        return Engine.state.map[pos.y][[pos.x]];
    },
    getTilesWide: function () {
        return (game.canvas.width / game.tile.w);
    },
    getFullTilesWide: function () {
        return Math.floor(game.canvas.width / game.tile.w);
    },
    getTilesHigh: function () {
        return (game.canvas.height / game.tile.h);
    },
    getFullTilesHigh: function () {
        return Math.floor(game.canvas.height / game.tile.h);
    },
    getCenter: function () {
        return Engine.viewport.getCenterTile();
    },

    isOnMobile: function () {
        if (game.canvas.width < game.canvas.height) {
            // console.log('Portrait Detected');
            return true;
        } else {
            // console.log('Horizontal Detected');
            return false;
        }
    },
    //-=-=-=-=    
    resizeCanvas: function () {
        game.canvas.width = (window.innerWidth);
        game.canvas.height = (window.innerHeight);
    },

    setupFullScreenCanvas: function () {
        //make canvas and style it appropriately:
        _el.create('canvas').insertAfter(document.getElementById("anchor"));
        _el.style("width", "100%");
        _el.style("height", "100%");
        _el.style("border", "none");
        _el.style("left", "0px");
        _el.temp_el.id = "maincanvas";
        game.canvas = _el.temp_el;
        game.ctx = _el.temp_el.getContext('2d');

        //DEBUGGING::
        document.body.style.background = 'black';
        document.body.style.color = 'white';
        document.body.style.overflow = 'hidden';

        game.canvas.width = (window.innerWidth);
        game.canvas.height = (window.innerHeight);
        game.ctx = game.canvas.getContext('2d');
        game.ctx.font = "bold 10pt monospace";
        Engine.renderer.canvaslist.push(_el.temp_el);
        Engine.renderer.ctxlist.push(_el.temp_el.getContext('2d'));
    },

    setup: function () {
        Engine.preloader.init();
        Engine.setupFullScreenCanvas();
    },

    init: function (settings = Engine.settings) {
        //pass settings into engine init;
        Engine.setup();
    },
}

function initMap(len = 50) {
    let tempy = [];
    for (let y = 0; y < len; y++) {
        let tempx = [];
        for (let x = 0; x < len; x++) {
            tempx[x] = {
                x: x,
                y: y
            };
        }
        tempy[y] = tempx;
    }
    Engine.state.map = tempy;
    return tempy;
}

function grassMap(len = 50) {
    let tempy = [];
    for (let y = 0; y < len; y++) {
        let tempx = [];
        for (let x = 0; x < len; x++) {
            tempx[x] = {
                x: 1,
                y: 2
            };
        }
        tempy[y] = tempx;
    }
    Engine.state.map = tempy;
    return tempy;
}

initMap();






//grassMap(300);
document.body.onclick = function () {
    console.log(Engine.viewport.offsetx);
    Engine.viewport.offsetx += 10;
    Engine.viewport.offsety += 10;
    Engine.viewport.calcMoves();
    Engine.renderer.clear();
    //    Engine.renderer.draw.view();
    Engine.renderer.draw.spritesheet();
    console.log(`ofset[${Engine.viewport.offsetx},${Engine.viewport.offsety}]`);
//    console.log(`mod[${Engine.viewport.offsetx%32},${Engine.viewport.offsety%32}]`);
}









//NOTES:

//                Engine.renderer.draw.spritesheet(0);
//Engine.renderer.draw.tile({x:0,y:0});
//                Engine.renderer.draw.itile(0, {
//                    x: 4,
//                    y: 3
//                }, {
//                    x: 1,
//                    y: 1
//                }, 1);
