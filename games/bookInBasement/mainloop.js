

function mainLoop () {
    if (frame == 120){
        frame = 0;
    }
     frame++;
//        console.log(`frame: ${frame}`);
//    background('black');
    clearCanvas();
    drawRoomBase();
    drawPropLayer();
     BlinkComputerLights(frame);
    requestAnimationFrame(mainLoop);
    
}


mainLoop();
