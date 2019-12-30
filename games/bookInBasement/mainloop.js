let ver = `0.001b`;
let verName = `fakenoose`;

let players = [];
let book = new Book('bob',125,310);

let msg;

function mainLoop() {
    if (frame == 120) {
        frame = 0;

    }
    frame++;

    if (tip.modoloTruth(512) || msg == undefined) {
        msg = RandoRant();
    }


    firstRenderLayer();

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-WIP LINE::

    // global time pieces;


    function knodewey(scale) {
        if (scale > 1000) {
            scale *= 0.9;
        }

        ctx.save();
        ctx.translate(.5, 0);
        ctx.rotate(-tip.endlesscount / 100);
        superdrawImage(Global.images.dewey, 0, 0, 64, 48, canvas.width / 2, canvas.height / 2 - 8, 64 * scale, 48 * scale);
        ctx.restore();
    }
    //    knodewdey(-tip.endlesscount/100);


    isFloor(book.x, book.y, book);
    book.tick();
    tip.tick();

    if (debugging) {
        //show collision MAP
        drawFloor();
    }


    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-NON-WIP LINE::
    // NON WIP STUFF:
    requestAnimationFrame(mainLoop);

}

function firstRenderLayer() {
//    clearCanvas();
    drawRoomBase();
    drawPropLayer();
    BlinkComputerLights(frame);

    // WIP STUFF:
    if (RP.tv.isOn) {
        //talking TVSTUFF
        Textbubble(`${msg}`);
    }

    
}



//window.onload = function () {
//    setTimeout(mainLoop,3000);
//};

ctx.imageSmoothingEnabled = false;
ctx.antialias = false;
mainLoop();

console.log(`v ${ver} - ${verName}`);
