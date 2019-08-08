//let _verbose = true;

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