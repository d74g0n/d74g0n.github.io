const view = new camera(512, 256);

const gameball = new ball(300, 100, 5);
//gameball.attachGravity();

const dbgrid = new grid(buffers.bg, bgctx);

scene.add(new character(10, 10));
scene.add(gameball);

view.target = scene.props[0];
//view.target = gameball;
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
    view.tick();

    main_run_loop();
}

function main_run_loop() {

    view.tick(); // camera render.

    requestAnimationFrame(main_run_loop);
}

main_setup();
clog('[main_loop.js]');
