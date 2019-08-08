let _verbose = true;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CANVAS SECTION ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=- [ GAME OPTIONS SECTION ]
// USED: FPS. BG. 
var game_defaults = {
    //    cols: ['blue', 'red', 'yellow', 'white'],
    //    players: 0,
    bg: 'rgb(15,100,15)',
    fps: 8
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=- [ GAME OPTIONS SECTION ]
var CanvasDefault = {
    // this is the main canvas - if scoreboard canvas is added perhaps naming refactor.
    dx: 49,
    dy: 33,
    scale: 16,
    //  canvas dimensions:
    cdx: function () {
        return ((CanvasDefault.dx * CanvasDefault.scale) + CanvasDefault.dx) + 0;
    },
    cdy: function () {
        return ((CanvasDefault.dy * CanvasDefault.scale) + CanvasDefault.dy) + 0;
    },
    _left: 0,
    _top: 0,
    _gapX: 0.5,
    _gapY: 0.5,
}
// -=-=-=- [PURECLIENT]:
var canvas = document.querySelector('canvas');
// commonly known as ctx.
var c = (function initCanvas() {
    canvas.width = CanvasDefault.cdx();
    canvas.height = CanvasDefault.cdy();
    canvas.style.border = '2px solid green';
    if (_verbose) {
        console.log('[LOAD][canvas.js]|[Dimensions:(W:' + canvas.width + ' H:' + canvas.height + ')]');
    }
    return canvas.getContext('2d');
})();
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CANVAS SECTION ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ DRAWING SECTION ]
// set globalalpha
function GlobalAlpha(num = 1) {
    c.globalAlpha = num;
}
// set shadows:
function Shadow(shadowBlur = 2, shadowColor = 'white', shadowOffsetX = 1, shadowOffsetY = 1) {
    c.shadowBlur = shadowBlur;
    c.shadowColor = shadowColor;
    c.shadowOffsetX = shadowOffsetX;
    c.shadowOffsetY = shadowOffsetY;
}
// clear shadows:
function clrShadow(color = 'rgb(255,0,255)') {
    // 'greenscreen-pink' used as debugging detector; 
    // finalize perhaps we go green or transparent.
    Shadow(0, color, 0, 0);
}
// set table colour:
function background(color = game_defaults.bg) {
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height)
}
// stroke_outline_Square:
function sSq(x, y, color = 'rgba(255,255,255,1)') {
    // draws a unfilled square (stroke) (sSq)
    if (x > 0) {
        x--;
    }
    if (y > 0) {
        y--;
    }
    c.beginPath();
    c.strokeStyle = color;
    //    c.strokeStyle = 'black';
    var s = CanvasDefault.scale;
    x = Dx(x);
    y = Dy(y);
    c.strokeRect(x + 0.5, y + 0.5, s, s);
    c.stroke();
}
// filled_Square:
function fSq(x, y, color = 'rgba(255,255,255,1)') {
    // draws a filled square (fSq)
    if (x > 0) {
        x--;
    }
    if (y > 0) {
        y--;
    }
    var s = CanvasDefault.scale;
    //    x = x + (x * s) + CanvasDefault._left;
    //    y = y + (y * s) + CanvasDefault._top;
    x = Dx(x);
    y = Dy(y);

    c.beginPath();
    c.fillStyle = color;
    c.fillRect(x, y, s, s);
    c.stroke();
}
// stroke and filled square (common):
function dSq(x, y, color = 'rgba(255,255,255,1)') {
    //    sSq(x, y, color);
    fSq(x, y, color);
}
// draw text:
function writeText(string = 'SNAFU', scaleX = canvas.width / 2, scaleY = 170, font = '98px serif', fillStyle = 'red', strokeStyle = 'gold', textBaseline = 'top', textAlign = 'center') {
    c.fillStyle = fillStyle;
    c.strokeStyle = strokeStyle;
    c.font = font;
    c.textAlign = textAlign;
    c.textBaseline = textBaseline;
    c.fillText(string, scaleX, scaleY);
    c.strokeText(string, scaleX, scaleY);
    // REMEMBER SHADOWING?
}


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CALCULATIONS SECTION ]
// scales the x values to pixel coordinates.
function Dx(x) {
    // Translates x to pixels
    return (x + (x * CanvasDefault.scale) + CanvasDefault._left);
}
// scales the y values to pixel coordinates.
function Dy(y) {
    // Translates y to pixels
    return (y + (y * CanvasDefault.scale) + CanvasDefault._top);
}
// Random boolean:
function RndBool() {
    return Math.random() >= 0.5;
}

let _I = {
    citation: 'http://paulbourke.net/miscellaneous/interpolation/',
    LinearInterpolate: function (y1, y2, amt) {
        //        console.log('lerpcal:' + (y1 * (1 - amt) + y2 * amt))
        return (y1 * (1 - amt) + y2 * amt);
        //        return (y1 * (1 - amt) + y2 * amt).toFixed(2);
    },
    CosineInterpolate: function (y1, y2, amt) {
        let mu2 = (1 - Math.cos(amt * Math.PI)) / 2;
        //        return (y1 * (1 - mu2) + y2 * mu2);
        return (y1 * (1 - mu2) + y2 * mu2).toFixed(2);;
    },
    CubicInterpolate: function (y0, y1, y2, y3, mu) {
        let mu2 = mu * mu;
        let a0 = y3 - y2 - y0 + y1;
        let a1 = y0 - y1 - a0;
        let a2 = y2 - y0;
        let a3 = y1;

        //        return (a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3);
        return (a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3).toFixed(2);;
    }


}

let _H = {
    v: 'ranged beteen 0-1 (percentages)',
    octaveA: undefined,
    octaveB: undefined,
    rnd100: function () {
        //        let seed = Math.round(Math.random() * 100);
        let seed = Math.round(Math.random() * CanvasDefault.dy);
        //        console.log(seed/100);
        //        return seed / 100;
        return seed;
    },
    rndArr: function (len = CanvasDefault.dx) {
        let arr = [];
        for (i = 0; i < len; i++) {
            arr.push(_H.rnd100());
        }
        if (_H.octaveA == undefined) {
            _H.octaveA = arr;
        }
        return arr;
    },
    percent: function (percentFor, percentOf = 100) {
        return Math.floor(percentFor / percentOf * 100);
    },
    noise: function (x, y) {

    },
    lerp: function (start, end, percent) {
        return (start + percent * (end - start));
        //        return Math.round((start + percent*(end - start)));
    },
    rnd: function (min, max) {

    },
    lerpFillArray: function (arr, num) {

    },
    logic: function (amount) {
        console.log(_I.LinearInterpolate(_H.octaveA[0], _H.octaveA[1], amount));
        console.log(_I.CosineInterpolate(_H.octaveA[0], _H.octaveA[1], amount));
        console.log(_I.CubicInterpolate(_H.octaveA[9], _H.octaveA[0], _H.octaveA[1], _H.octaveA[2], amount));


    },
    dgraph: function (color = 'rgba(255,255,255,.5)') {
        console.log(_H.octaveA);
        let graph = [];
        for (val in _H.octaveA) {
            let divs = 4;
            graph.push(_H.octaveA[val]);
            for (let i = 1; i <= divs; i++) {
                let step = (100 / divs) / (100 * i);

                if (_H.octaveA[val - 1] !== undefined) {
                    graph.push(Math.round(_I.LinearInterpolate(_H.octaveA[val - 1], _H.octaveA[val], step)));
                } else {
                    graph.push(Math.round(_I.LinearInterpolate(_H.octaveA[0], _H.octaveA[_H.octaveA.length - 1], step)));

                }

            } // lerps loops
            //            graph.push(_H.octaveA[val]);
        } // octave keys

        console.log(graph);


        for (bop in graph) {
            dSq(bop, graph[bop], 'rgba(255,0,255,1)');
        }


        //         dSq(_H.octaveA[0], 1, color);
    },
    initthis: function () {
        //        console.log(_H.rndArr(5));
        _H.rndArr(10);
    }
}

let amount = 0.5;
//_loins.rnd100();
//console.log(_H.percent(255));
_H.initthis();
//_H.logic(amount);
_H.dgraph('rgba(255,255,255,.5)');

//console.log(_H.percent(47, CanvasDefault.dx));
//console.log(_H.lerp(_H.octaveA[0], _H.octaveA[1], amount));

//console.log(_H.lerp(_H.octaveA[0],_H.octaveA[1],.5));
