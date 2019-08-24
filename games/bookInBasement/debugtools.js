function outputMousedown(event){
            if (debugging){
    event.preventDefault();
    console.log(event);
    console.log(`ev.layerX ${event.layerX}`);
    console.log(`ev.layerY ${event.layerY}`);
            }
    checkTvClick(event.layerX,event.layerY);
}


canvas.onmousedown = outputMousedown;


function checkTvClick(x,y){
    
    if (x >= 414 && x <=442 && y >=362 && y <= 414 ){
        console.log('tv YUP');
        RP.tv.isOn = !RP.tv.isOn;
        return true;
    }
    
    return false;
    
}