let controlState = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    shift: false,
    On: function () {
        turnOnControlState();
    }
}
const cS = controlState;
// simpleConstruct.
let portchBook = {
    x: 0,
    y: 0,
    s: 4,
    tick: function () {
        
        if (cS.right && portchBook.x > 62){
            
        }
        
        //        console.log(`bounds`);
        if (cS.left && portchBook.x > -4) {
            portchBook.x -= portchBook.s;
            EMIT.x -= portchBook.s;
        }
        if (cS.right && portchBook.x < 64) {
            portchBook.x += portchBook.s;
            EMIT.x += portchBook.s;
        }
        if (cS.space && portchBook.y > -1) {
            portchBook.y -= portchBook.s*7;
            EMIT.x -= portchBook.s*7;
        }
        
        function gravity(){
            if (portchBook.y<-1){
                portchBook.y += portchBook.s*0.6;
                EMIT.y+= portchBook.s*0.6;
            }
        }
        gravity();
        
       
//        TB.tick();
        
    }
}

function setControlState(e, isDown = true) {

    if (e.key == 'ArrowDown' || e.key == 's') {
        cS.down = isDown;
    }
    if (e.key == 'ArrowUp' || e.key == 'w') {
        cS.up = isDown;
    }
    if (e.key == 'ArrowLeft' || e.key == 'a') {
        cS.left = isDown;
    }
    if (e.key == 'ArrowRight' || e.key == 'd') {
        cS.right = isDown;
    }
    if (e.key == ' ') {
        console.log('space Triggered');
        cS.space = isDown;
    }

    if (e.shiftKey == true) {
//        console.log(cS);
    }

}

function keydown(e) {
//    console.log(`[keydown][${e.key}]`);
    setControlState(e, true);
//    console.log(portchBook.x);
}

function keyup(e) {
    //    console.log(`[keyup][${e.key}]`);
    setControlState(e, false);
}

function turnOnControlState() {
    console.log(`[introController.js][loaded]`);
    document.onkeydown = keydown;
    document.onkeyup = keyup;
}
