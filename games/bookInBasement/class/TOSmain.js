// ALL EXECUTION LEVEL CODE BEGINS HERE: (OR SHOULD!)
let AT = new AnimationTimer();
let player = new Book(`bucht`,canvas.width/2,canvas.height/2);

function renderImage() {
    background('darkred'); //tmp clear
    drawSet(SET.level);
    player.tick();
//    SET.leveldoors[0].tick(AT.sixtycount); // lazy first door target.
}

function setup() {
    // move Animation timer stuff here
    setInitialization();

}

function mainTOSloop() {
    AT.tick(); // make timer go.
    if (AT.checkModolo(75)) {
        AT.isAdding = !AT.isAdding;
    }
    renderImage();
    requestAnimationFrame(mainTOSloop);
}

function start() {
    mainTOSloop();
}

setup();
start();

/*TADO
build turbo lift.


*/