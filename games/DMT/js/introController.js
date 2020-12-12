// Script is very simple menu controller 'portch book' - basic start screen.
// =-=- simple debugging Toggle:
let iC = {
    dbugOutput: true,
};

function dbugLog(msg) {
    if (iC.dbugOutput) {
        console.log(`[dbO]<${msg}>`);
        return true;
    } else {
        return false;
    }
}
// =-=- 
let controlState = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    shift: false,
    On: function () {
        turnOnControlState();
    },
    DoorAni: false,
}
const cS = controlState;
// simpleConstruct to control book.  gravity and jumps are sad:(
let portchBook = {
    x: 0,
    y: 0,
    s: 4,
    opendoorcounter: 0,
    tick: function () {
        
        
        if (cS.DoorAni){
              portchBook.opendoorcounter++;
        }
        

        if (cS.space && portchBook.x > -4 && portchBook.x < 25 && cS.DoorAni && portchBook.opendoorcounter > 30) {
            // Enter Door.    
            console.log(`doorentered`);
            IntroSequence.hasStarted = true;
        
        }



        if (cS.space && portchBook.x > -4 && portchBook.x < 25 && !cS.DoorAni) {
            // open door
            controlState.DoorAni = true;
          
            
        }


        if (cS.left && portchBook.x > -4) {
            portchBook.x -= portchBook.s;
            EMIT.x -= portchBook.s;
        }
        if (cS.right && portchBook.x < 64) {
            portchBook.x += portchBook.s;
            EMIT.x += portchBook.s;
        }
        if (cS.space && portchBook.y > -1) {
            portchBook.y -= portchBook.s * 7;
            EMIT.y -= portchBook.s * 7;
        }

        function gravity() {
            if (portchBook.y < -1) {
                portchBook.y += portchBook.s * 0.6;
                EMIT.y += portchBook.s * 0.6;
            }
        }
        gravity();

    }
}

function setControlState(e, isDown = true) {
    // both events keyup/keydown routed through here to set Controller State::
    if (e.key == 'ArrowDown' || e.key.toLowerCase() == 's') {
        cS.down = isDown;
    }
    if (e.key == 'ArrowUp' || e.key.toLowerCase() == 'w') {
        cS.up = isDown;
    }
    if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
        cS.left = isDown;
    }
    if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
        cS.right = isDown;
    }
    if (e.key == ' ') {
        dbugLog('space Triggered');
        cS.space = isDown;
    }
    if (e.shiftKey == true) {
        EMIT.emitRate = 1;
        //        console.log(cS);
    }

}

function keydown(e) {
    dbugLog(`[keydown][${e.key}]`);
    setControlState(e, true);
}

function keyup(e) {
    setControlState(e, false);
}

function turnOnControlState() {
    dbugLog(`[introController.js][loaded]`);
    document.onkeydown = keydown;
    document.onkeyup = keyup;
}
