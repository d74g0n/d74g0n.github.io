let msg;
function mainLoop() {
    if (frame == 120||msg == undefined) {
        frame = 0;
        msg = RandoRant();
    }
    frame++;
    //        console.log(`frame: ${frame}`);
    //    background('black');
    clearCanvas();
    drawRoomBase();
    drawPropLayer();
    BlinkComputerLights(frame);
    
    if (RP.tv.isOn){
        //talking TVSTUFF
    Textbubble(`${msg}`);
    }
    requestAnimationFrame(mainLoop);

}


mainLoop();
