let tdh = new tdhero();


tdh.drawself();


let isShink = false;
let speed = 1;
let accell = 0.1;
//let scalemax = 200;
let scalemax = canvas.height;
let scalemin = 16;
function animationLoop(){
    
    function logic(){
        
        if (isShink){
                tdh.s -= speed;
        }else{
                tdh.s += speed;
        }
        
        if (tdh.s < scalemin) {
            isShink = false;
            speed+= accell;
        }
        
        if (tdh.s > scalemax){
            isShink = true;

        }
        
        
    }
    
    
    
    background(`black`);
    
    tdh.drawself();
    logic()

    
    
    
    requestAnimationFrame(animationLoop);
}

animationLoop();