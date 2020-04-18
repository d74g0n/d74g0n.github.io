const view = new camera(512, 256);

const gameball = new ball(300, 100, 5);
//gameball.attachGravity();

//const dbgrid = new grid(buffers.bg, bgctx);

let perlriverframe = 0;
let perllightsframe = 0;

//scene.add(new character(10, 10));
scene.add(gameball);

//view.target = scene.props[0];
view.target = gameball;
//view.target = {
//pos: {
//    x: 200,
//    //        y: 148
//    y: 248
//}
//};
//scene.add(new ball(500, 100));


// EVENTS:: -=-=-=-=-=
buffers.bg.onclick = function () {
    console.log('clicked');
    isDebugging = !isDebugging;
}

buffers.output.onclick = function () {
    console.log('main canvas clicked');
    if (gameball.vel.y > 0) {
        gameball.vel.y += 15;
    } else {
        gameball.vel.y -= 15;
    }


}

function main_setup() {
    console.log(`main_setup`);
    //    view.tick();

    main_run_loop();
}

function main_run_loop() {

    view.tick(); // camera render.

    requestAnimationFrame(main_run_loop);
}

main_setup();
clog('[main_loop.js]');


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

function mockupZone() {


    function waterBG() {
        let ctx = bgctx;
        ctx.save();

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
            //rewire for perlin noise::
            let pv = Perl.OctavePerlin(x, y, z + perlriverframe, 3, 3);


            if (pv > 0.7) {
                return `#779`;
            }
            if (pv > 0.5) {
                return `#447`;
            }
            //            return `rgba(0,0,${pv*255},1)`;
            return `rgba(0,${pv*155},${pv*255},1)`;
        }

        Ypos += 1;

        function xSteps() {
            ctx.save();
            let xcols = 100;
            let blocksize = buffers.bg.width / xcols;

            for (x = 0; x <= xcols; x++) {
                ctx.fillStyle = rndintense(x / 10);
                ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 3);
                ctx.fill();
            }

            xcols -= 4;
            Ypos += blocksize / 3;
            blocksize = buffers.bg.width / xcols;
            for (x = 0; x <= xcols; x++) {
                ctx.fillStyle = rndintense(x / 10);
                ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 2);
                ctx.fill();
            }
            xcols -= 4;
            Ypos += blocksize / 2;
            blocksize = buffers.bg.width / xcols;
            for (x = 0; x <= xcols; x++) {
                ctx.fillStyle = rndintense(x / 10);
                ctx.fillRect(blocksize * x, Ypos, blocksize, blocksize / 3);
                ctx.fill();
            }
            ctx.restore();
        }
        xSteps();
        ctx.save();


        // last line:
        Ypos += 6; //line2 like printer::
        ctx.lineWidth++;
        ctx.beginPath();
        ctx.moveTo(0, Ypos);
        ctx.strokeStyle = design.bgline;
        ctx.lineTo(buffers.bg.width, Ypos);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    }


    function perlbuilding(x = Math.random(), y = Math.random(), z = 1, xleft = 2, bnum = 1) {
        bgctx.save();
        let ctx = bgctx;
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
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'white';
            ctx.strokeRect(xleft, base - (zdata.h * scaleh), zdata.w * scalew, zdata.h * scaleh);
        }
        //        b_outline();

        function b_basics() {
            //silloutte::
            ctx.fillStyle = cols.base;
            ctx.fillRect(xleft, base - (zdata.h * scaleh), zdata.w * scalew, zdata.h * scaleh);
            //        ctx.fill();

            //entrance floor::
            ctx.fillStyle = 'black';
            ctx.fillRect(xleft - window.padding, bottop, building.w + window.padding * 2, floor.h);
        }
        b_basics();

        let windowcanvaswidth = Math.floor(building.w - (window.padding * 4));

        //        console.log(windowcanvaswidth);

        let winbuildorder = Math.floor(windowcanvaswidth / (window.w + window.padding));

        let sidepadding = (building.w - windowcanvaswidth) / winbuildorder + 2;

        //        console.log(`build->${winbuildorder}`);


        function getNums(x, y, z = 5.5) {

            if (Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3) < 0.5) {
                return `rgba(5,5,${Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3)},1)`;
            } else {

                if (x % 3 == 0 && y % 2 == 0) {
                    return `rgba(255,215,0,${Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3)})`;
                } else {

                    return `rgba(${255*Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3)},${255*Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3)},${255*Perl.OctavePerlin(x, y, z + perllightsframe, 2, 3)},1)`;
                }

            }

            return `rgba(255,215,0,${Perl.OctavePerlin(x, y, z + perlriverframe, 1, 3)})`;
        }


        //draw perlin lights::
        for (iy = 2; iy <= building.floors - 2; iy++) {
            for (i = 0; i <= winbuildorder; i++) {
                bgctx.fillStyle = getNums(i, iy);
                bgctx.fillRect(building.l + sidepadding / 2 + (window.padding + window.w) * i, base - (floor.h * iy) - 2, window.w, window.h);
                bgctx.fill();
            }
        }

        bgctx.restore();

    }
    //    perlbuilding(3.24, 0.42, 1, 0);
    //    perlbuilding(3.14, 0.52, 0.10, 300);
    //    perlbuilding();

    perlriverframe += 0.0005;
    perllightsframe += 0.0005;

    waterBG();


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

    pFill(80);








}
