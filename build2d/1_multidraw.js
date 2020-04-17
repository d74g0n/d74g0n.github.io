/*SO FAR JUST GRADIENT CRAP*/

function mgradientV(colorA = '#100077', colorB = 'skyblue', colorC = 'black') {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.5, colorB);
    gradient.addColorStop(1, colorC);
    return gradient;
}

function mgradientH(canvas = canvas, ctx = ctx, colorA = 'black', colorB = 'blue', colorC = 'skyblue') {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.5, colorB);
    gradient.addColorStop(1, colorC);
    return gradient;
}

function vgrad(canvas, ctx, colA, colB, colC) {
    ctx.fillStyle = mgradientV(canvas, ctx, colA, colB, colC);
}

function hgrad(canvas, ctx, colA, colB, colC) {
    ctx.fillStyle = mgradientH(canvas, ctx, colA, colB, colC);
}




clog('multidraw.js');
