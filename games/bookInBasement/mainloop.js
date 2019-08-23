let ver = 0.001;
let verName = `fakenoods`;


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
    
    
    
    
    
    // WIP STUFF:
    if (RP.tv.isOn){
        //talking TVSTUFF
    Textbubble(`${msg}`);
    }
    
    
    // NON WIP STUFF:
    requestAnimationFrame(mainLoop);

}

//window.onload = function () {
//    setTimeout(mainLoop,3000);
//};


mainLoop();

console.log(`v ${ver} - ${verName}`);
