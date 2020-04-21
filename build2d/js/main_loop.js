
//let view = scene.initCamera(1024,512);
let view = scene.initCamera(512,256);
let gameball = new ball(300, 200, 0);
//const dbgrid = new grid(buffers.bg, bgctx);

//view.target = {pos: {x: 450,y: 180}};


buffers.bg.onclick = function () {
    isDebugging = !isDebugging;
}

buffers.output.onclick = function () {
    if (gameball.vel.x > 0) {
        gameball.vel.x += 5;
    } else {
        gameball.vel.x -= 5;
    }
    
    
}

function main_setup() {
    console.log(`main_setup`);
    gameball.attachGravity();
    //    gameball.isDebugging = true;
    scene.add(gameball);
    //    scene.add(new character(10, 10));
    //    scene.add(new ball(500, 100, -1));
        view.target = gameball;
    //    view.target = scene.props[0];

    //    view.tick();
    addPerlBuildingFill(0, 0, 0 + river.frame);
    transferSkytoBG(); 
    main_run_loop();
}

let frame = {main: 0};

function main_run_loop() {
    frame.main++;
    //update buffers.sky::
    if (frame.main % 10 == 0) {
        addPerlBuildingFill(0, 0, 0 + (river.frame));
//        lowerOffThreshold(0.005);
    }
    transferSkytoBG(); 
    view.tick();
    // camera render.
    requestAnimationFrame(main_run_loop);
}

main_setup();


function mockupZone() { //<=scene.tick()sent::
//preRender::
//    perllightsframe += 0.0005;
    perllightsframe += 0.00009;
    river.tick();
    
// fieldGrid();
// pFill(100); // cull to screen visible.

}

