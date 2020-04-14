const view = new camera();

const gameball = new ball();
gameball.attachGravity();


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
