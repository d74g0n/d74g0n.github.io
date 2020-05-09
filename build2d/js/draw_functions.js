// bottom half gradient fill::
function ground(gsa = "#010", gsb = "#050", gsc = "#010") {
    bgctx.save();
    hgrad(buffers.bg, bgctx, gsa, gsb, gsc);
    bgctx.fillRect(0, Math.floor(buffers.bg.height / 2), Math.floor(buffers.bg.width), Math.floor(buffers.bg.height / 2));
    bgctx.font = "30px Tiny";
    bgctx.restore();
}

function skyBackground(color) { // TOP HALF ONLY SKYCTX
    bgctx.save();
    bgctx.globalAlpha = 0.5;
    bgctx.fillStyle = color;
    bgctx.fillRect(0, 0, Math.floor(buffers.sky.width), Math.floor(buffers.sky.height / 2));
    bgctx.globalAlpha = 1;
    bgctx.restore();
}

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
            let pv = Perl.OctavePerlin(xx / dial.xd, yy / dial.yd, perllightsframe, dial.o, dial.p) * 155;

 


            //                console.log(pv);
//            bgctx.fillStyle = returnOfRBGA(undefined, undefined, pv);
            bgctx.fillStyle = returnOfRBGA(undefined, pv, undefined);
            //                bgctx.fillStyle = `rgb(55,55,${pv})`;
            //                bgctx.fillStyle = `rgb(55,${pv},${pv/2})`;
            //                bgctx.strokeStyle = `rgb(${pv},${pv},${pv})`;


            //checker stroke::
            if (xx % 4 == 0) {
                //strokebright-highlight::
//                bgctx.strokeStyle = returnOfRBGA(undefined, undefined, pv / 0.9);;
                bgctx.strokeStyle = returnOfRBGA(0, pv, 1 / 0.9);;
            } else {
                //strokedark-highlight::
//                bgctx.strokeStyle = returnOfRBGA(undefined, undefined, pv / 1.1);;
                bgctx.strokeStyle = returnOfRBGA(0, pv, 1 / 1.1);;
            }
            //                bgctx.strokeStyle = `rgb(55,55,${pv})`;
            bgctx.fillRect(Math.floor(pos.start.x + (xx * pos.w)), Math.floor(pos.start.y + accumH), Math.floor(pos.w), Math.floor(pos.w));
            bgctx.strokeRect(Math.floor(pos.start.x + (xx * pos.w)), Math.floor(pos.start.y + accumH), Math.floor(pos.w), Math.floor(pos.w));
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

function mgradientHP(canvas, ctx, colorA = '#100077', colorB = 'skyblue', colorC = 'black') {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(.1, colorA);
    gradient.addColorStop(.5, colorB);
    gradient.addColorStop(.9, colorA);
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

function fieldGrid() {
    bgctx.save();
    bgctx.strokeStyle = 'green';
    bgctx.lineWidth = 1;

    bgctx.beginPath();
    bgctx.moveTo(0, buffers.bg.height / 2);
    bgctx.lineTo(buffers.bg.width, buffers.bg.height / 2);

    let fillfactor = 15;
    let size = 80;
    let midX = (buffers.bg.width / 2);
    let midY = (buffers.bg.height / 2);
    let pY = 0;

    let startX = midX - ((fillfactor / 2) * size);

    for (s = 0; s <= fillfactor; s++) {

        if (s < fillfactor) {
            bgctx.moveTo(startX, midY + pY);
            bgctx.lineTo(startX + size, midY + pY);
        }

        bgctx.moveTo(startX, midY + pY);
        bgctx.lineTo(startX + Math.sin(((s * 0.2) - 0.3) - (fillfactor / 2)) * size, buffers.bg.height);
        bgctx.stroke();
        startX += size;

    }
    bgctx.stroke();
    bgctx.restore();
}


