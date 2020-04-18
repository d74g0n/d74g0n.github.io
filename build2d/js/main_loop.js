
//let view = scene.initCamera(1024,512);
let view = scene.initCamera(512,256);
let gameball = new ball(300, 200, 5);
//const dbgrid = new grid(buffers.bg, bgctx);

//view.target = {pos: {x: 450,y: 180}};


buffers.bg.onclick = function () {
    isDebugging = !isDebugging;
}

buffers.output.onclick = function () {
    if (gameball.vel.y > 0) {
        gameball.vel.y += 5;
    } else {
        gameball.vel.y -= 5;
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
    addPerlBuildingFill(3.14, 0.52, 0.10 + river.frame);
    transferSkytoBG(); 
    main_run_loop();
}

let frame = {main: 0};

function main_run_loop() {
    frame.main++;
    //update buffers.sky::
    if (frame.main % 3 == 0) {
        addPerlBuildingFill(3.14, 0.52, 0.10 + (river.frame),);
//        lowerOffThreshold(0.005);
    }
    transferSkytoBG(); 
    view.tick();
    // camera render.
    requestAnimationFrame(main_run_loop);
}

main_setup();


function mockupZone() { //<=scene.tick()::
//preRender::
//    perllightsframe += 0.0005;
    perllightsframe += 0.00009;
    river.tick();
    
// fieldGrid();
 pFill(100);

}

