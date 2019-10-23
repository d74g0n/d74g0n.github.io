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
    //    currentSecond: 0,
    //    frameCount: 0,
    //    framesLastSecond: 0,
    lastFrameTime: false,
    fps: undefined,
    delta: undefined,

    frame: 0,
    frameLimit: 1000,
    incrementFrame: function () {
        game.frame++;
        if (game.frame == frameLimit) {
            game.frame = 0;
        }
        return;
    }
}

let Engine = {
    v: `0.000.004`,
    isVerbose: false,
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

    click: {
        isVerbose: true,
        log: function (msg) {
            if (Engine.click.isVerbose) {
                console.log(`[click]${msg}`);
            }
        },
        isClickable: false,
        lastClick: {
            x: undefined,
            y: undefined
        },
        enable: function () {
            Engine.click.isClickable = true;
            window.onclick = Engine.click.clicked;
        },
        disable: function () {
            Engine.click.isClickable = false;
            window.onclick = undefined;
        },
        clicked: function (ev) {
            Engine.click.lastClick.x = Math.floor(ev.clientX / game.tile.w);
            Engine.click.lastClick.y = Math.floor(ev.clientY / game.tile.h);
            Engine.click.HighlightTile(Engine.click.lastClick.x, Engine.click.lastClick.y);
        },
        HighlightTile: function (ev) {
            Engine.click.log(`[VP][click.highlightTile][offset[${Engine.viewport.offsetx},${Engine.viewport.offsety}][x,y[${Engine.viewport.x},${Engine.viewport.y}]][velocity[${Engine.viewport.vx},${Engine.viewport.vy}]`);

            Engine.click.log(`[VP][click.clicked][coord[${Engine.click.lastClick.x},${Engine.click.lastClick.y}]]`);
        }
    },

    control: {
        state: {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
            shift: false,
        },
        isVerbose: false,
        log: function (msg) {
            if (Engine.control.isVerbose) {
                console.log(`[Control]=>[ ${msg} ]`);
            }
        },
        init: function () {
            Engine.control.enable();
        },
        disable: function () {
            window.onkeydown = undefined;
            window.onkeyup = undefined;
        },
        enable: function () {
            window.onkeydown = Engine.control.keydown;
            window.onkeyup = Engine.control.keyup;
        },
        keydown: function (ev) {
            return Engine.control.processKey(ev, true);
        },
        keyup: function (ev) {
            return Engine.control.processKey(ev, false);
        },
        processKey: function (ev, isDown) {

            switch (ev.keyCode) {
                case 65:
                    Engine.control.log(`A Pressed`);
                    Engine.control.state.left = isDown;
                    break;
                case 83:
                    Engine.control.log(`S Pressed`);
                    Engine.control.state.down = isDown;
                    break;
                case 87:
                    Engine.control.log(`W Pressed`);
                    Engine.control.state.up = isDown;
                    break;
                case 68:
                    Engine.control.log(`D Pressed`);
                    Engine.control.state.right = isDown;
                    break;
                case 32:
                    Engine.control.log(`SpaceBar?`);
                    Engine.control.state.space = isDown;
                    break;
            }

        },
        processControlState: function () {
            //apply forces from control state.

            let step = 0.49;

            if (Engine.control.state.left) {
                Engine.viewport.vx += step;
            }

            if (Engine.control.state.right) {
                Engine.viewport.vx -= step;
            }

            if (Engine.control.state.up) {
                Engine.viewport.vy += step;
            }

            if (Engine.control.state.down) {
                Engine.viewport.vy -= step;
            }

            if (Engine.control.state.space) {
                Engine.viewport.vx = 0;
                Engine.viewport.vy = 0;
            }

            //            Engine.viewport.vy = Math.round(Engine.viewport.vy);
            //            Engine.viewport.vx = Math.round(Engine.viewport.vx);

            Engine.viewport.vy = Engine._Math.polish(Engine.viewport.vy);
            Engine.viewport.vx = Engine._Math.polish(Engine.viewport.vx);

        },

    },

    run: {
        isActive: true,
        fps: function () {
            if (!game.lastFrameTime) {
                game.lastFrameTime = performance.now();
                game.fps = 0;
                return;
            }
            game.delta = (performance.now() - game.lastFrameTime) / 1000;
            game.lastFrameTime = performance.now();
            game.fps = 1 / game.delta;
            game.ctx.fillStyle = 'lime';
            game.ctx.fillText(`FPS: ${Math.floor(game.fps)}`, 10, 20);
        },
        speed: {
            factor: function (modu) {
                if (game.frame % modu == 0) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        loop: function (ev) {

            // how I WIP a runloop:
            function Experimental(ev) {

                function processVelocity() {
                    //                    Engine.viewport.vx = Math.round(Engine.viewport.vx);
                    //                    Engine.viewport.vy = Math.round(Engine.viewport.vy);
                    Engine.viewport.vx = Engine._Math.polish(Engine.viewport.vx);
                    Engine.viewport.vy = Engine._Math.polish(Engine.viewport.vy);
                    Engine.viewport.offsetx -= Math.round(Engine.viewport.vx);
                    Engine.viewport.offsety -= Math.round(Engine.viewport.vy);
                }
                processVelocity();

                if (Engine.run.speed.factor(20)) {
                    Engine.control.processControlState();
                }

                Engine.viewport.update();

                Engine.renderer.clear();

                //                Engine.renderer.draw.testPattern(32, `rgba(55,355,55,0.2)`, `rgba(255,155,255,0.5)`);

                Engine.renderer.draw.dmap();

                Engine.renderer.draw.CameraSafeArea();
                //                                Engine.renderer.draw.numGrid();

                if (typeof Engine.click.lastClick.x === undefined || typeof Engine.click.lastClick.y === undefined) {

                } else {
                    Engine.renderer.draw.circle(Engine.click.lastClick.x, Engine.click.lastClick.y);
                }




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
        x: 0,
        y: 0,
        offsetx: 0,
        offsety: 0,

        // move velocity
        vx: 0,
        vy: 0,

        //width of canvas in tiles
        w: null,
        h: null,

        update: function () {
            Engine.viewport.w = Math.floor(game.canvas.width / game.tile.w);
            Engine.viewport.h = Math.floor(game.canvas.height / game.tile.h);


            if (Engine.viewport.offsetx <= (game.scale * -1) || Engine.viewport.offsetx >= game.scale) {
                if (Engine.viewport.offsetx < 0) {
                    Engine.viewport.offsetx -= (game.scale * -1);
                    Engine.viewport.x -= 1;
                } else {
                    Engine.viewport.offsetx -= game.scale;
                    Engine.viewport.x += 1;
                }
            }
            if (Engine.viewport.offsety <= (game.scale * -1) || Engine.viewport.offsety >= game.scale) {
                if (Engine.viewport.offsety < 0) {
                    Engine.viewport.offsety -= (game.scale * -1);
                    Engine.viewport.y -= 1;
                } else {
                    Engine.viewport.offsety -= game.scale;
                    Engine.viewport.y += 1;
                }
            }


            function limitVelocities(maxVel = 2) {
                if (Engine.viewport.vx >= maxVel || Engine.viewport.vx <= (-maxVel)) {
                    Engine.viewport.vx *= 0.9;
                }

                if (Engine.viewport.vy >= maxVel || Engine.viewport.vy <= (-maxVel)) {
                    Engine.viewport.vy *= 0.9;
                }
            }
            limitVelocities();

            function applyFriction() {
                Engine.viewport.vy *= 0.995;
                Engine.viewport.vx *= 0.995;
                Engine.viewport.vy = Engine._Math.polish(Engine.viewport.vy,5);
                Engine.viewport.vx = Engine._Math.polish(Engine.viewport.vx,5);
            }
            applyFriction();

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
                Engine.log(`[preloader][${msg}]`);
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
        stat: {
            tilesDrawn: undefined,
        },

        clear: function () {
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        },
        draw: {
            isVerbose: true,
            log: function (msg) {
                if (Engine.renderer.draw.isVerbose) {
                    Engine.log(`[draw]${msg}`)
                }
            },
            numGrid: function () {
                //draws all the numbers on the grid - DEBUGGER LEVEL
                let maxX = Engine.viewport.getDimensions()
                let DrawCount = 0;
                for (y = 0; y <= maxX.y; y++) {
                    for (x = 0; x <= maxX.x; x++) {
                        DrawCount++;
                        // numbers the mapindex coordinates
                        game.ctx.font = '8px monospace';
                        game.ctx.fillStyle = 'white';
                        game.ctx.fillText(`M`, Engine.s32(x) + 1, Engine.s32(y) + 8);
                        game.ctx.fillText(`${y+Engine.viewport.y},${x+Engine.viewport.x}`, Engine.s32(x) + 8, Engine.s32(y) + 12);
                        // numbers the Grid.  The Immovable DRAWTILES.
                        game.ctx.fillStyle = 'red';
                        game.ctx.fillText(`G`, Engine.s32(x) + 1, Engine.s32(y) + 26);
                        game.ctx.fillText(`${y},${x}`, Engine.s32(x) + 8, Engine.s32(y) + 22);
                    }
                }
                Engine.renderer.stat.tilesDrawn = DrawCount;
                Engine.renderer.draw.log(`[.numGrid][drawn:[${DrawCount}][${x}*${y}]]`);
            },
            numSprite: function () {
                let maxX = Engine.viewport.getDimensions()
                let DrawCount = 0;
                for (y = 0; y <= maxX.y; y++) {
                    for (x = 0; x <= maxX.x; x++) {
                        DrawCount++;
                        Engine.renderer.draw.itile(0, {
                            x: x,
                            y: y
                        }, {
                            x: x - Engine.viewport.x,
                            y: y - Engine.viewport.y
                        }, 1);
                    }
                }
                Engine.renderer.stat.tilesDrawn = DrawCount;
                console.log(`Tiles Numbered: [${DrawCount}][${x}*${y}]`);
            },
            dmap: function () {
                let maxX = Engine.viewport.getDimensions()
                let DrawCount = 0;
                for (y = -2; y <= maxX.y + 2; y++) {
                    for (x = -2; x <= maxX.x + 2; x++) {

                        if (typeof Engine.state.map[y + Engine.viewport.y] === 'undefined') {
                            game.ctx.font = `8px monospace`;
                            game.ctx.fillStyle = 'yellow';
                            //                                                        game.ctx.fillStyle = 'red';
                            game.ctx.fillText(`EMPTY`, Engine.s32(x) + 16 - Engine.viewport.offsetx, Engine.s32(y) + 10 - Engine.viewport.offsety);
                            game.ctx.fillText(`TILE`, Engine.s32(x) + 16 - Engine.viewport.offsetx, Engine.s32(y) + 20 - Engine.viewport.offsety);

                        } else {





                            if (typeof Engine.state.map[y + Engine.viewport.y][x + Engine.viewport.x] === 'undefined') {
                                //draw blank;            
                                game.ctx.font = `8px monospace`;
                                game.ctx.fillStyle = 'yellow';
                                //                                                        game.ctx.fillStyle = 'red';
                                game.ctx.fillText(`EMPTY`, Engine.s32(x) + 16 - Engine.viewport.offsetx, Engine.s32(y) + 10 - Engine.viewport.offsety);
                                game.ctx.fillText(`TILE`, Engine.s32(x) + 16 - Engine.viewport.offsetx, Engine.s32(y) + 20 - Engine.viewport.offsety);


                            } else {
                                DrawCount++;
                                Engine.renderer.draw.itile(0, Engine.state.map[y + Engine.viewport.y][x + Engine.viewport.x], {
                                    x: x,
                                    y: y,
                                }, 1);



                            }
                        }
                    }
                }
                Engine.renderer.stat.tilesDrawn = DrawCount;
                Engine.log(`Tiles Numbered: [${DrawCount}][${x}*${y}]`);
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

            circle: function (x, y, col = 'rgba(200,200,0,0.7)', r = game.scale / 2) {
                game.ctx.fillStyle = col;
                game.ctx.beginPath();
                game.ctx.arc(Engine.s32(x) + game.scale / 2, Engine.s32(y) + game.scale / 2, r, 0, 2 * Math.PI);
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
            CameraSafeArea: function (scale = game.tile.w) {
                game.ctx.fillStyle = 'rgba(0,0,0,0.7)';
                //center::

                if (Engine.viewport.w % 2 == 0) {
                    game.ctx.fillRect(Engine.viewport.getCenterTile().x * scale, Engine.viewport.getCenterTile().y * scale, scale * 2, scale * 2);

                    Engine.renderer.draw.circle(Engine.viewport.getCenterTile().x + 0.5, Engine.viewport.getCenterTile().y + 0.5, 'rgba(255,255,255,0.2)', 32);
                } else {
                    game.ctx.fillRect(Engine.viewport.getCenterTile().x * scale, Engine.viewport.getCenterTile().y * scale, scale * 1, scale * 1);
                    Engine.renderer.draw.circle(Engine.viewport.getCenterTile().x, Engine.viewport.getCenterTile().y, 'rgba(255,255,255,0.2)', 16);
                }
                game.ctx.fillStyle = 'rgba(0,255,155,0.7)';
                game.ctx.fillRect(1 * scale, 1 * scale, scale * 1, scale * 1);

                let pos = Engine.viewport.getDimensions();
                game.ctx.fillRect(1 * scale, (pos.y - 2) * scale, scale * 1, scale * 1);
                game.ctx.fillRect((pos.x - 2) * scale, 1 * scale, scale * 1, scale * 1);
                game.ctx.fillRect((pos.x - 2) * scale, (pos.y - 2) * scale, scale * 1, scale * 1);




                function squares(padding = 10, color = 'white') {
                    game.ctx.beginPath();
                    game.ctx.strokeStyle = color;
                    game.ctx.strokeWidth = 2;
                    //bot-midtile-left
                    game.ctx.moveTo((1 * scale) + (scale / 2) - padding, (((pos.y - 2) * scale) + scale / 2) + padding);
                    //bot-midtile-right
                    game.ctx.lineTo(((pos.x - 1) * scale) - (scale / 2) + padding, (((pos.y - 2) * scale) + scale / 2) + padding);


                    game.ctx.lineTo(((pos.x - 1) * scale) - (scale / 2) + padding, (2 * scale) - (scale / 2) - padding);
                    game.ctx.lineTo(((1) * scale) + (scale / 2) - padding, (2 * scale) - (scale / 2) - padding);
                    game.ctx.closePath();
                    game.ctx.stroke();

                }
                squares(-100, 'blue');
                squares(10, 'red');
                squares(0);


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

    //system fun

    _Math: {
        polish: function (val, len = 3) {
            let temp = val.toFixed(len);
            return Number(temp);
        },
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
    get: {
        frame: function () {
            return game.frame;
        },
        centerTile: function () {
            return Engine.viewport.getCenterTile();
        },
        tilesWide: function () {
            return (game.canvas.width / game.tile.w);
        },
        tilesHigh: function () {
            return (game.canvas.width / game.tile.w);
        },
        mapTileData: function (x, y) {
            // do undefined checks here? probably:
            return Engine.state.map[pos.y][pos.x];
        },
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
        Engine.control.init();
    },
    init: function (settings = Engine.settings) {
        //pass settings into engine init;
        Engine.setup();
        Engine.click.enable();
        Engine.run.loop();
    },
}

function initMap(len = 10) {
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
initMap();
//grassMap(300);
// put these EVENTS somewhere appropriate::
window.onresize = Engine.resizeCanvas;
window.onload = Engine.init;
if (!Engine.run.isActive) {
    document.onclick = Engine.run.loop;
}
//document.body.onclick = Engine.run.loop; // DEBUGGER
