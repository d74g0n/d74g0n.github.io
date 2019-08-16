console.log('[2dfunctions.js Loaded]=>[draw at will]');
//    considerations::    
//    c.translate(0.5, 0.5);
//    c.imageSmoothingEnabled = false;

function resettransform(a) {
    let c = a.getctx();
    return c.transform(1, 0, 0, 1, 0, 0);
}
// PLAYING AROUND::
function trannz(a, val) {
    let c = a.getctx();
    return c.transform(1, 0, 0 + val, 1, 0, 0);
}
// PLAYING AROUND::
function tranny(a, val) {
    let c = a.getctx();

    // go up: Y-
    //    c.transform(1, 0, 0, 1, 0, 0 - val);
    // go down Y+
    //    c.transform(1, 0, 0, 1, 0, 0 + val);
    // go right X+
    //    c.transform(1, 0, 0, 1, 0+ val, 0 );
    // go left X-
//    c.transform(1, 0, 0, 1, 0 - val, 0);
    
    val = val/100;
    // skew x: X+
//    c.transform(1,0, 0+val, 1, 0 , 0);
// key x: X-
//    c.transform(1,0, 0-val, 1, 0 , 0);
    
//    skew Y+:
    c.transform(1,0+val, 0, 1, 0 , 0);
    // skew Y-:
//    c.transform(1,0-val, 0, 1, 0 , 0);
    
    //    return c.transform(1+val/100, 0+val/100, 0, 0, 0+val/1000, 0-val/1000);
}

function background(a, color = 'red') {
    //[u][background(a, 'green');]
    let c = a.getctx();
    let canvas = a.getcanvas();
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function clear(a) {
    let c = a.getctx();
    let canvas = a.getcanvas();
    c.fillStyle = a.bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.transform(1, 0, 0, 1, 0, 0);
}

function writeText(a, string = 'd74g0n_draws.js', scaleX = a.width / 2, scaleY = a.height / 2, font = '98px serif', fillStyle = 'red', strokeStyle = 'black', textBaseline = 'bottom', textAlign = 'center') {
    let c = a.getctx();
    c.fillStyle = fillStyle;
    c.strokeStyle = strokeStyle;
    c.font = font;
    c.textAlign = textAlign;
    c.textBaseline = textBaseline;
    c.fillText(string, scaleX, scaleY);
    c.strokeText(string, scaleX, scaleY);
    // consider shadowing
}

function setAlpha(a, num = 1) {
    let c = a.getctx();
    c.globalAlpha = num;
}
// set shadows:
function setShadow(a, shadowBlur = 2, shadowColor = 'white', shadowOffsetX = 1, shadowOffsetY = 1) {
    let c = a.getctx();
    c.shadowBlur = shadowBlur;
    c.shadowColor = shadowColor;
    c.shadowOffsetX = shadowOffsetX;
    c.shadowOffsetY = shadowOffsetY;
}
// clear shadows:
function clrShadow(a, color = 'rgb(255,0,255)') {
    // 'greenscreen-pink' used as debugging detector; 
    // finalize perhaps we go green or transparent.
    setShadow(a, 0, color, 0, 0);
}
