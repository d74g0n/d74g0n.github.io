let river = {
    frame: 0,
    framescale: 0.1,
    style: 1,
    o:3,
    p:3,
    speed: 0.1,
    banks: `#985`,
//    banks: `#000`,
    alpha: 0.9,
    tick: function(){
        river.incrementframe();
        perlin_river();
    },
    incrementframe: function(){
//      river.frame+= 0.0005;
      river.frame+= 0.05;
    },
}

function rndintense(x = 0, y = 0, z = 0) {
    let pv = Perl.OctavePerlin(x, y, z + river.frame * river.speed, river.o, river.p);
    if (pv > 0.7 && river.style>0) {
        return `#779`;
    }
    if (pv > 0.5 && river.style>1) {
        return `#447`;
    }
    return `rgba(0,${pv*155},${pv*255},1)`;
}

function perlin_river() {
    let ctx = bgctx;
    ctx.save();
    ctx.globalAlpha = river.alpha;
    let design = {
        //        bgline: '#985',
        bgline: river.banks,
        bglinewidth: 1,
    }

    let Ypos = buffers.bg.height / 2;
    // first line:
    ctx.beginPath();
    ctx.moveTo(0, Ypos);
    ctx.lineTo(buffers.bg.width, Ypos);
    ctx.strokeStyle = design.bgline;
    ctx.lineWidth = design.bglinewidth;
    ctx.closePath();
    ctx.stroke();

    function xSteps() {
        ctx.save();
        let xcols = 100;
        blocksize = buffers.bg.width / xcols;

        accuH = blocksize;

        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, (blocksize / 3)+2);
            ctx.fill();
        }

        xcols -= 4;
        Ypos += blocksize / 3;
        accuH += Ypos;
        blocksize = buffers.bg.width / xcols;
        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, (blocksize / 2)+2);
            ctx.fill();
        }
        xcols -= 4;
        Ypos += blocksize / 2;
        accuH += Ypos * 2;
        blocksize = buffers.bg.width / xcols;
        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, (blocksize / 4)+2);
            ctx.fill();
        }
        ctx.restore();
    }
    let blocksize = 0;
    let accuH = 0;
    xSteps();
    ctx.save();

    Ypos += 2;

    // last-bottom line:
    ctx.lineWidth++;
    ctx.beginPath();
    ctx.moveTo(0, Ypos + blocksize / 4);
    ctx.strokeStyle = design.bgline;
    ctx.lineTo(buffers.bg.width, Ypos);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();

}
