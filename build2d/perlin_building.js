function addPerlBuildingFill(px = 3.14, py = 0.52, pz = 0.10) {

    skyctx.fillStyle = skyBackground(skyGradientV());
    skyctx.fillRect(0, 0, buffers.sky.width, buffers.sky.height / 2)

    let bgrise = 2;
    let increment = 100;
    let newOff = 0;
    skyctx.globalAlpha = 0.5;
    bFillOffSet = newOff;
    for (y = 0; y < 2; y++) {
        py * 0.2;
        for (x = 0; bFillOffSet <= buffers.sky.width; x++) {
            newOff = perlbuilding(px + (bFillOffSet / increment), py + y, pz, bFillOffSet);
            bFillOffSet += newOff + 2;
            px += 7;
            py += x + 0.002;
        }
        skyctx.globalAlpha += 0.4;
        //        increment += 0.007;
        bFillOffSet = -10;

    }
}

function perlbuilding(x = Math.random(), y = Math.random(), z = 1, xleft = 2, bnum = 1) {
    bgctx.save();
    let ctx = skyctx;
    //        let ctx = bgctx;
    let base = buffers.bg.height / 2;
    let scalew = 64;
    let scaleh = scalew * 3.5;
    let zdata = {
        w: Perl.OctavePerlin(x, y, 1, 4, 3),
        h: Perl.OctavePerlin(x, y, 1.8, 4, 3),
    }
    let cols = {
        base: '#000',
    }
    let window = {
        w: 4,
        h: 2,
        padding: 2,
    }
    let floor = {
        h: 4,
    }
    let building = {
        l: xleft,
        w: zdata.w * scalew,
        h: zdata.h * scaleh,
        floors: undefined,
        winx: undefined,

    }
    building.floors = Math.floor(building.h / floor.h);
    const b = building;
    //        console.log(`floors:${building.floors}`);
    let bottop = base - (floor.h);

    //stroke debugshit
    function b_outline() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(xleft, base - (zdata.h * scaleh), zdata.w * scalew, zdata.h * scaleh);
    }
    //    b_outline();

    function b_basics() {
        //silloutte::
        ctx.fillStyle = cols.base;
        ctx.fillRect(xleft, base - (zdata.h * scaleh), zdata.w * scalew, zdata.h * scaleh);
        //entrance floor::
        ctx.fillStyle = 'black';
        ctx.fillRect(xleft - window.padding, bottop, building.w + window.padding * 2, floor.h);
    }
    b_basics();

    let windowcanvaswidth = Math.floor(building.w - (window.padding * 4));
    let winbuildorder = Math.floor(windowcanvaswidth / (window.w + window.padding));
    let sidepadding = (building.w - windowcanvaswidth) / winbuildorder + 2;

    function getNums(x, y, z = 5.5) {

        let dials = {
            o: 1,
            p: 2,
        }

        let pval = Perl.OctavePerlin(x, y, z, dials.o, dials.p);

        if (pval.toFixed(2) == 0.50) {
            return `rgba(225,255,255,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)*2})`;
        }

        if (pval.toFixed(2) > 0.40) {
            return `rgba(255,255,55,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)})`;
        } else {
            return `rgba(0,0,0,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)})`;
        }

    }


    //draw perlin lights::
    for (iy = 2; iy <= building.floors - 2; iy++) {
        for (i = 0; i <= winbuildorder; i++) {
            ctx.fillStyle = getNums(i + lightsOffset, iy);
            ctx.fillRect(building.l + sidepadding / 2 + (window.padding + window.w) * i, base - (floor.h * iy) - 2, window.w, window.h);
            ctx.fill();
        }
    }

    bgctx.restore();

    lightsOffset += 0.5;
    return building.w;

}




function perl_river() {
    let ctx = bgctx;
    ctx.save();

    ctx.globalAlpha = 0.8;

    let design = {
        bgline: '#985',
        bglinewidth: 3,
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

    //perlwater
    function rndintense(x = 0, y = 0, z = 0) {
        let speed = 30;
        let pv = Perl.OctavePerlin(x, y, z + perlriverframe * speed, 3, 3);

        if (pv > 0.7) {
            return `#779`;
        }
        if (pv > 0.5) {
            return `#447`;
        }
        return `rgba(0,${pv*155},${pv*255},1)`;
    }



    function xSteps() {
        ctx.save();
        let xcols = 100;
        blocksize = buffers.bg.width / xcols;

        accuH = blocksize;

        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 3);
            ctx.fill();
        }

        xcols -= 4;
        Ypos += blocksize / 3;
        accuH += Ypos;
        blocksize = buffers.bg.width / xcols;
        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 2);
            ctx.fill();
        }
        xcols -= 4;
        Ypos += blocksize / 2;
        accuH += Ypos * 2;
        blocksize = buffers.bg.width / xcols;
        for (x = 0; x <= xcols; x++) {
            ctx.fillStyle = rndintense(x / 10);
            ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 4);
            ctx.fill();
        }
        ctx.restore();
    }
    let blocksize = 0;
    let accuH = 0;
    xSteps();
    ctx.save();

    Ypos += 2;

    // last line:
    //    Ypos += 8; //line2 like printer::
    ctx.lineWidth++;
    ctx.beginPath();
    ctx.moveTo(0, Ypos + blocksize / 4);
    //    ctx.moveTo(0, accuH);
    ctx.strokeStyle = design.bgline;
    ctx.lineTo(buffers.bg.width, Ypos);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();

}
