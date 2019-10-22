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


let Engine = {
    v: `0.000.003`,
    isVerbose: true,
    log: function (msg) {
        if (Engine.isVerbose) {
            console.log(`[E]${msg}`);
        }
    },

    state: {
        //        players: [],
        //        mapobjects: [],
        map: [[], []],
    },

    run: {
        isActive: false,
        fps: function () {
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
        loop: function (ev) {
            if (game.ctx == null) {
                return;
            }

            function Experimental(ev) {
                let Hx = Math.floor(ev.offsetX / game.scale);
                let Hy = Math.floor(ev.offsetY / game.scale);

                console.log(`[VP][offset${Engine.viewport.offsetx}][${Engine.viewport.x},${Engine.viewport.y}]`);

                function lookRight(vel = 5) {

                    Engine.viewport.offsetx += vel;

                    if (Engine.viewport.offsetx >= game.scale) {
                        Engine.viewport.offsetx -= game.scale;
                        Engine.viewport.x += 1;
                    }


                }

                function lookLeft(vel = 5) {
                    Engine.viewport.offsetx -= 5;
                    if (Engine.viewport.offsetx <= (game.scale * -1)) {
                        Engine.viewport.offsetx += game.scale;
                        Engine.viewport.x -= 1;
                    }

                }
                lookLeft(5);

                Engine.viewport.update();
                Engine.renderer.clear();
                Engine.renderer.draw.testPattern(32, `rgba(55,55,55,0.5)`, `rgba(255,55,255,0.5)`);
                Engine.renderer.draw.numSprite();

                Engine.renderer.draw.CameraSafeArea();
                Engine.renderer.draw.numGrid();
                Engine.renderer.draw.circle(Hx, Hy);

            }

            Experimental(ev);

            if (Engine.run.isActive) {
                Engine.run.fps();
                requestAnimationFrame(Engine.run.loop);
            }
        },
    },

    viewport: {
        isVerbose: true,
        log: function (msg) {
            if (Engine.viewport.isVerbose) {
                Engine.log(`[viewport]${msg}`);
            }
        },
        //TopLeft
        x: -1,
        y: -1,

        //width of canvas in tiles
        w: null,
        h: null,

        offsetx: 0,
        offsety: 0,

        update: function () {
            Engine.viewport.w = Math.floor(game.canvas.width / game.tile.w);
            Engine.viewport.h = Math.floor(game.canvas.height / game.tile.h);

            //            if (Engine.viewport.offsetx >= game.scale) {
            //                Engine.viewport.offsetx -= game.scale;
            //                Engine.viewport.x += 1;
            //            }

            //            console.log(`ox${Engine.viewport.offsetx}-x${Engine.viewport.x}`);

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
        highlightTile: function (x, y) {
            drawSquare(x * game.scale, y * game.scale, game.scale);
        },
        clear: function () {
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        },
        draw: {
            numGrid: function () {
                let maxX = Engine.viewport.getDimensions()
                let DrawCount = 0;
                for (y = 0; y <= maxX.y; y++) {
                    for (x = 0; x <= maxX.x; x++) {
                        DrawCount++;
                        game.ctx.font = '8px monospace';
//                        game.ctx.strokeStyle = 'lime';
                        game.ctx.fillStyle = 'white';
                        game.ctx.fillText(`M`, Engine.s32(x) + 1, Engine.s32(y) + 8);
                        game.ctx.fillText(`${y+Engine.viewport.y},${x+Engine.viewport.x}`, Engine.s32(x) + 8, Engine.s32(y) + 12);
                    }
                }
                console.log(`Tiles Numbered: [${DrawCount}][${x}*${y}]`);
            },
            numSprite: function () {
                let maxX = Engine.viewport.getDimensions()
                let DrawCount = 0;
                for (y = 0; y <= maxX.y; y++) {
                    for (x = 0; x <= maxX.x; x++) {
                        //                        game.ctx.fillStyle = 'rgba(255,55,66,0.8)';
                        DrawCount++;
                        //                        
                        Engine.renderer.draw.itile(0, {
                                x: x,
                                y: y
                            },
                            //                            x: x,
                            //                            y: y                        }, {
                            {
                                x: x - Engine.viewport.x,
                                y: y - Engine.viewport.y
                            }, 1);

                        game.ctx.font = '8px monospace';
                        game.ctx.fillStyle = 'red';
                        game.ctx.fillText(`G`, Engine.s32(x) + 1, Engine.s32(y) + 26);
                        game.ctx.fillText(`${y},${x}`, Engine.s32(x) + 8, Engine.s32(y) + 22);

                        //                        game.ctx.fillText(`${y+Engine.viewport.y},${x+Engine.viewport.x}`, Engine.s32(x) + 6, Engine.s32(y) + 12);

                    }
                }
                console.log(`Tiles Numbered: [${DrawCount}][${x}*${y}]`);
            },


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



            fillSquare: function (x, y, scale) {
                game.ctx.fillRect(x, y, scale, scale);
            },

            strokeSquare: function (x, y, scale) {
                game.ctx.Rect(x, y, scale, scale);
            },

            Fillrect: function (x, y, w, h) {
                game.ctx.fillRect(x, y, w, h);
            },

            circle: function (x, y) {
                game.ctx.fillStyle = 'rgba(200,200,0,0.7)';
                game.ctx.beginPath();
                game.ctx.arc(Engine.s32(x) + game.scale / 2, Engine.s32(y) + game.scale / 2, game.scale / 2, 0, 2 * Math.PI);
                //                game.ctx.stroke();
                game.ctx.fill();
                game.ctx.closePath();
            },


            tile: function (pos = {
                x: 0,
                y: 0,
                offx: Engine.viewport.x,
                offy: Engine.viewport.y
            }, size = 1) {
                game.ctx.fillRect((pos.x * game.tile.w * size) + pos.offx, (pos.y * game.tile.h * size) + pos.offy, game.tile.w * size, game.tile.h * size);
            },
            itile: function (spriteindex = 0, Spos = {
                y: 2,
                x: 1
            }, Dpos = {
                x: 0,
                y: 0,
                offx: 0,
                offy: 0,
            }, size = 1) {
                if (Dpos.offx == undefined) {
                    Dpos.offx = 0;
                    Dpos.offy = 0;
                };
                game.ctx.drawImage(Engine.renderer.sprite[spriteindex], Spos.x * game.tile.w, Spos.y * game.tile.h, game.tile.w, game.tile.h, (Dpos.x * game.tile.w) - Dpos.offx - Engine.viewport.offsetx, (Dpos.y * game.tile.h) - Dpos.offy - Engine.viewport.offsety, game.tile.w * size, game.tile.h * size);

            },

            map: function (map = Engine.state.map) {
                let iW = game.canvas.width / game.scale;
                let iH = game.canvas.height / game.scale;

                for (let y = Engine.viewport.y; y < iH + Engine.viewport.h + Engine.s32(Engine.viewport.y); y++) {
                    if (Engine.state.map[y] == undefined) {
                        console.log(`Y map ran out`);
                        return false;
                    }
                    for (let x = Engine.viewport.x; x < iW + Engine.viewport.w + Engine.s32(Engine.viewport.x); x++) {

                        if (Engine.state.map[y][x] == undefined) {
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
                            offx: 0,
                            offy: 0,
                        }, 1);
                        colourToggle = !colourToggle;
                    }
                    if (Math.floor(iW) % 2 == 0) {} else {
                        colourToggle = !colourToggle;
                    }
                }
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
        game.ctx.font = '24px monospace';
        game.ctx.fillStyle = 'white';
        game.ctx.fillText(`CLICKME`, (game.canvas.width / 2)-45, game.canvas.height / 2);
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


// Make map to view::
//initMap();
grassMap(30);


// put these EVENTS somewhere appropriate::
window.onresize = Engine.resizeCanvas;
window.onload = Engine.init;

document.body.onclick = Engine.run.loop; // DEBUGGER