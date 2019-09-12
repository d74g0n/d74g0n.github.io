// THIS HAS TO TIE INTO SOCKET EMITS OF CONTROL DATA.

//var timers = [];
// exp endo

var debugginData = {
    //  perhaps we move _verbose into here.
    pageindex: 0,
    KeysOutputToConsole: false
    //    isPaging: true
}

document.onkeydown = keychecker;

function keychecker(e) {

    players[0].isAI = false;
    
    if (debugginData.KeysOutputToConsole) {
        console.log('e.altKey:' + e.altKey);
        console.log('e.ctrlKey:' + e.ctrlKey);
        console.log('e.shiftKey:' + e.shiftKey);
        console.log('e.key:' + e.key);
    }

    if (e.key == 'ArrowDown') {
        console.log('ArrowDown Triggered');
    }
    if (e.key == 'ArrowUp') {
        console.log('ArrowUp Triggered');
    }
    if (e.key == 'ArrowLeft') {
        players[0].turnLeft();
        console.log('ArrowLeft Triggered');
    }
    if (e.key == 'ArrowRight') {
        players[0].turnRight();
        console.log('ArrowRight Triggered');
    }


    if (e.key == ' ') {
        console.log('space Triggered');
        if (timers[0]) {
            clearInterval(timers[0]);
            timers = [];
//            console.log('[TIMER ALREADY ACTIVE]');
        } else {
           timers.unshift(setInterval(dirty_Gameloop, 1000 / game_defaults.fps));
        }
        
     
    }
    if (e.key == 'w') {
        if (players[0].direction != 's') {
            players[0].smW();
            players[0].direction = e.key;
        }
        console.log('w Triggered');
    }
    if (e.key == 'a') {
        if (players[0].direction != 'd') {
            players[0].smA();
            players[0].direction = e.key;
        }
        console.log('a Triggered');
    }
    if (e.key == 's') {
        if (players[0].direction != 'w') {
            players[0].smS();
            players[0].direction = e.key;
        }
        console.log('s Triggered');
    }
    if (e.key == 'd') {
        if (players[0].direction != 'a') {
            players[0].smD();
            players[0].direction = e.key;
        }
        console.log('d Triggered');
    }

    if (e.key == ',') {

        players[0].turnLeft();

    }

    if (e.key == '.') {

        players[0].turnRight();

    }

    if (e.key == '2') {
        if (timers[0]) {
            clearInterval(timers[0]);
            timers.pop();
        }


    }

    if (e.key == '-') {
        if (debugginData.pageindex > 0) {
            debugginData.pageindex--;
        }
        console.log('- pageindex--');
    }
    if (e.key == '+') {
        if (debugginData.pageindex < Completed_Stages.length - 1) {
            debugginData.pageindex++;
        }
        console.log('+ - pageindex++');
    }

    if (e.key == ' ') {
        //        console.log('legend' + Completed_Stages);
        //        console.log('[_dD.pageindex: ' + debugginData.pageindex + ']');
        Completed_Stages[debugginData.pageindex]();

        if (e.shiftKey == true) {
            //            console.log(Completed_Stages[debugginData.pageindex]);
        }
    }

    //    console.log(e);

}
