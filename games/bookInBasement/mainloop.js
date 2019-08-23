let ver = `0.001a`;
let verName = `fakenoose`;

let players = [];


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
    
    
        book.tick();
        tip.tick();
    
    
        function knodewey(scale){
        //DEWEY
//    superdrawImage(Global.images.dewey, 0,0,64,48,canvas.width/2, canvas.height/2-8, 64, 48);
    
        ctx.save();
        ctx.translate(.5,0);
//        ctx.rotate(frame/360*2);
        ctx.rotate(-tip.endlesscount/100);
        
        superdrawImage(Global.images.dewey, 0,0,64,48,canvas.width/2, canvas.height/2-8, 64*scale, 48*scale);

        ctx.restore();
     }knodewey(-tip.endlesscount/100);

    
    
    
    // NON WIP STUFF:
    requestAnimationFrame(mainLoop);

}

//window.onload = function () {
//    setTimeout(mainLoop,3000);
//};


mainLoop();

console.log(`v ${ver} - ${verName}`);
