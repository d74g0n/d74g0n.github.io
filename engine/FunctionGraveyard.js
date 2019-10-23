
                function HighlightByEvent(ev) {
                    //                let Hx = Math.floor(ev.clientX / game.scale);
                    //                let Hy = Math.floor(ev.clientY / game.scale);
                    //                console.log(`[VP][offset${Engine.viewport.offsetx}][${Engine.viewport.x},${Engine.viewport.y}]`);               
                    //                Engine.renderer.draw.circle(Hx, Hy);


                }



        highlightTile: function (x, y) {
            drawSquare(x * game.scale, y * game.scale, game.scale);
        },

            if (game.ctx == null) {
                return;
    
//        
//        
//
////NOTES:
//
////                Engine.renderer.draw.spritesheet(0);
////Engine.renderer.draw.tile({x:0,y:0});
////                Engine.renderer.draw.itile(0, {
////                    x: 4,
////                    y: 3
////                }, {
////                    x: 1,
////                    y: 1
////                }, 1);
//
//        
//        
//               itright: function () {
//
//                let firstTile = {
//                    x: Engine.viewport.x,
//                    y: Engine.viewport.y
//                };
//                let screenWidthInTiles = game.canvas.width / game.tile.w + 1;
//                let screenHeightInTiles = game.canvas.height / game.tile.h + 1;
//
//                let TilesDrawn = 0;
//
//                let griddraw = {
//                    x: 0,
//                    y: 0
//                };
//                for (let y = firstTile.y; y < (firstTile.y + screenHeightInTiles); y++) {
//                    griddraw.x = 0;
//                    for (let x = firstTile.x; x < (firstTile.x + screenWidthInTiles); x++) {
//
//                        if (x < 0 || y < 0 || x > game.map.length - 1 || y > game.map.length - 1) {
//
//                        } else {
//
//
//                            Engine.renderer.draw.itile(0, Engine.state.map[y][x], {
//                                x: griddraw.x,
//                                y: griddraw.y,
//                                offx: Engine.viewport.offsetx,
//                                offy: Engine.viewport.offsety,
//                            }, 1);
//                            TilesDrawn++;
//                        }
//                        griddraw.x++;
//                    }
//                    griddraw.y++;
//                }
//
//                console.log(`TilesDrawn: ${TilesDrawn}`);
//            },
//                
//                
//                
//                
//                
//                
//                
//                
//                
//                
//        
//        
//        
//        
//        
//        
//        

//
//
//           displacement: function () {
//
//                let TilesWide = Engine.getFullTilesWide();
//                let TilesHigh = Engine.getFullTilesHigh();
//
//                let tilesDrawn = 0;
//
//
//                for (let y = 0; y <= TilesHigh; y++) {
//
//
//                    for (let x = 0; x <= TilesWide; x++) {
//
//                        if (Engine.state.map[y - Engine.viewport.y] == undefined) {
//
//                        } else {
//
//                            if (Engine.state.map[y - Engine.viewport.y][x - Engine.viewport.x] == undefined) {
//
//                            } else {
//                                game.ctx.fillStyle = '#ffffff';
//                                //                                game.ctx.fillText(`${y - Engine.viewport.y},${x - Engine.viewport.x}`, Engine.s32(x), Engine.s32(y));
//                                game.ctx.font = '8px monospace';
//                                game.ctx.fillText(`${y},${x}`, Engine.s32(x), Engine.s32(y));
//                                tilesDrawn++;
//                                Engine.renderer.draw.itile(0, Engine.state.map[y - Engine.viewport.y][x - Engine.viewport.x], {
//                                    x: x,
//                                    y: y,
//                                    //                                    offx: Engine.viewport.offsetx,
//                                    //                                    offy: Engine.viewport.offsety,
//                                    offx: 0,
//                                    offy: 0,
//                                }, 1);
//
//                            }
//
//                        }
//
//                    }
//                }
//
//                console.log(`TilesDrawn:${tilesDrawn}`);
//
//
//
//
//            },

//
//
//            view: function (map = Engine.state.map) {
//
//                let xTileIndex = Engine.viewport.x;
//                let yTileIndex = Engine.viewport.y;
//
//                let RenderHeight = game.canvas.height / game.scale;
//                let RenderWidth = game.canvas.width / game.scale;
//
//
//
//
//                for (y = yTileIndex; y <= RenderHeight + 1; y++) {
//                    for (x = xTileIndex; x <= RenderWidth + 1; x++) {
//                        Engine.renderer.draw.itile(0, Engine.state.map[y + (yTileIndex * -1)][x + (xTileIndex * -1)], {
//                            x: x,
//                            y: y,
//                            offx: Engine.viewport.offsetx,
//                            offy: Engine.viewport.offsety,
//                        }, 1);
//                    }
//                }
//
//            },



//BOUNDS


            // tick over position index, as offset reaches tile alignment:
            // aka increment 32:1 pixel:tile
            //            if (Engine.viewport.offsetx >= game.scale) {
            //                Engine.viewport.offsetx += game.scale;
            //                Engine.viewport.x++;
            //            }
            //            if (Engine.viewport.offsetx <= (game.scale * -1)) {
            //                Engine.viewport.offsetx -= game.scale;
            //                Engine.viewport.x--;
            //            }
            //            //y   
            //            if (Engine.viewport.offsety >= game.scale) {
            //                Engine.viewport.offsety -= game.scale;
            //                Engine.viewport.y++;
            //            }
            //            if (Engine.viewport.offsety <= (game.scale * -1)) {
            //                Engine.viewport.offsety += game.scale;
            //                Engine.viewport.y--;
            //            }



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
        
        
        
        
        
            isOnMobile: function () {
        if (game.canvas.width < game.canvas.height) {
            // console.log('Portrait Detected');
            return true;
        } else {
            // console.log('Horizontal Detected');
            return false;
        }
    },
        
        
        
        //    getMapTileData: function (pos) {
//        return Engine.state.map[pos.y][[pos.x]];
//    },
//    getTilesWide: function () {
//        return (game.canvas.width / game.tile.w);
//    },
//    getFullTilesWide: function () {
//        return Math.floor(game.canvas.width / game.tile.w);
//    },
//    getTilesHigh: function () {
//        return (game.canvas.height / game.tile.h);
//    },
//    getFullTilesHigh: function () {
//        return Math.floor(game.canvas.height / game.tile.h);
//    },