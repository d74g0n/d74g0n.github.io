let bFillOffSet = 0;

const view = new camera(512, 256);

const gameball = new ball(300, 100, 5);
gameball.attachGravity();

//const dbgrid = new grid(buffers.bg, bgctx);

let perlriverframe = 0;
let perllightsframe = 0;
let lightsOffset = 0;
//scene.add(new character(10, 10));
scene.add(gameball);

//view.target = scene.props[0];
view.target = gameball;
//view.target = {
//    pos: {
//        x: 200,
//        y: 148
//        //        y: 248
//    }
//};
scene.add(new ball(500, 100, -1));


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
    addPerlBuildingFill(3.14, 0.52, 0.10 + perlriverframe / 1000);
    transferSkytoBG();
    main_run_loop();
}

let frame = {
    main: 0,

}

function main_run_loop() {
    frame.main++;

    //update buffers.sky::
    if (frame.main % 35 == 0) {
        addPerlBuildingFill(3.14, 0.52, 0.10 + (perlriverframe / 1000));
    }
    transferSkytoBG();

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

    perlriverframe += 0.0005;
    perllightsframe += 0.0005;
    perl_river();

    //    fieldGrid();


    //    pFill(100);
    //    fieldGrid();

}
