// bottom half gradient fill::
function ground(gsa = "#010", gsb = "#050", gsc = "#010") {
    bgctx.save();
    hgrad(buffers.bg, bgctx, gsa, gsb, gsc);
    bgctx.fillRect(0, buffers.bg.height / 2, buffers.bg.width, buffers.bg.height / 2);
    bgctx.font = "30px Tiny";
    bgctx.restore();
}

function skyBackground(color) { // TOP HALF ONLY SKYCTX
    bgctx.save();
    bgctx.globalAlpha = 0.5;
    bgctx.fillStyle = color;
    bgctx.fillRect(0, 0, buffers.sky.width, buffers.sky.height / 2);
    bgctx.globalAlpha = 1;
    bgctx.restore();
}
//
function skyGradientV(colorA = '#100077', colorB = 'skyblue', colorC = 'black') {
    let gradient = skyctx.createLinearGradient(0, 0, 0, buffers.sky.height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.7, colorB);
    gradient.addColorStop(1, colorC);
    skyctx.fillStyle = gradient;
    return gradient;
}




function pFill(tilesfirstrow = 100) {
    //problem here is that is aligns LEFT::
    let pos = {
        start: {
            x: 0,
            y: (buffers.bg.height / 2) + 8,

        },
        end: {
            x: buffers.bg.width,
            y: buffers.bg.height,

        },
        w: buffers.bg.width / tilesfirstrow,
        reduction: 3,
    }
    let row = tilesfirstrow;
    let rowy = Math.floor(pos.start.y / pos.w) - 10;
    let accumH = 0;
    let dial = {
        o: 1,
        p: 8,
        xd: 2 - perllightsframe * 2,
        yd: 2 - perllightsframe / 2,
    }
    //        let dial = { //orig
    //            o: 1,
    //            p: 2,
    //            xd: 20,
    //            yd: 40,
    //        }
    for (yy = 0;
        (pos.start.y + accumH) <= buffers.bg.height; yy++) {
        accumH += pos.w;
        for (xx = 0; xx <= row; xx++) {
            let pv = Perl.OctavePerlin(xx / dial.xd, yy / dial.yd, perllightsframe, dial.o, dial.p) * 255;

            function returnOfRBGA(r = 0, g = 0, b = 0, a = 1) {
                return `rgba(${r},${g},${b},${a})`;
            }


            //                console.log(pv);
            bgctx.fillStyle = returnOfRBGA(undefined, undefined, pv);
            //                bgctx.fillStyle = `rgb(55,55,${pv})`;
            //                bgctx.fillStyle = `rgb(55,${pv},${pv/2})`;
            //                bgctx.strokeStyle = `rgb(${pv},${pv},${pv})`;


            //checker stroke::
            if (xx % 4 == 0) {
                //strokebright-highlight::
                bgctx.strokeStyle = returnOfRBGA(undefined, undefined, pv / 0.9);;
            } else {
                //strokedark-highlight::
                bgctx.strokeStyle = returnOfRBGA(undefined, undefined, pv / 1.1);;
            }
            //                bgctx.strokeStyle = `rgb(55,55,${pv})`;
            bgctx.fillRect(pos.start.x + (xx * pos.w), pos.start.y + accumH, pos.w, pos.w);
            bgctx.strokeRect(pos.start.x + (xx * pos.w), pos.start.y + accumH, pos.w, pos.w);
        }
        row -= pos.reduction;
        pos.w = buffers.bg.width / row;
    }
}

function hgrad(canvas, ctx, colA, colB, colC) {
    ctx.fillStyle = mgradientH(canvas, ctx, colA, colB, colC);
}

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

clog('draw_functions.js');
