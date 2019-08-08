// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CALCULATIONS SECTION ]
// scales the x values to pixel coordinates.
function Dx(x) {
    // Translates x to pixels
    return (x + (x * CanvasDefault.scale) + CanvasDefault._left);
}
// scales the y values to pixel coordinates.
function Dy(y) {
    // Translates y to pixels
    return (y + (y * CanvasDefault.scale) + CanvasDefault._top);
}
// Random boolean:
function RndBool() {
    return Math.random() >= 0.5;
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CALCULATIONS SECTION ]

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ GAME PIECES SECTION ]
// move players according to velocity:
function movepieces() {
    for (player in players) {
        if (players[player].isAlive == true) {
            players[player].move();
        }
    }
}
// check for living pieces?
function _alivecount() {
    let leftalive = players.length - 1;
    for (player in players) {
        
        if (players[player].isAlive == false) {
            leftalive--;
        }
    }
    clog('[SNAKES AlIVE][' + (leftalive + 1) +']');
    return leftalive;
}
// check if grid square is filled / taken:
function isFilled(x = 1,y = 1) {
    
    if ( x < 1 || x > CanvasDefault.dx || y < 1 || y > CanvasDefault.dy ) {
        console.log('[isFilled] TRUE returned');
        return true;
    }
    
    let filled = get_all_filled_locations();
    for (fili = 0; fili < filled.length; fili++) {
        if (filled[fili][0] == x && filled[fili][1] == y) {
            // when match is found:
            return true;
        } 
    }
    // when no match is reached:
    return false;
}  // ENTIRE COLLISION COULD BE HERE
// quasi collision helper:
function get_all_filled_locations(){
// THIS IS WORKING JUST FINE IT SEEMS.
// have to consider WALLS.   
    var tmparr = [];
    
    for (player in players) {
        var tmploc = players[player].loc;
        for (iloc in tmploc) { 
            tmparr.push(tmploc[iloc]);
        }
    }
    
//    for (wall in walls) {
//        var tmploc = walls[wall].loc;
//        for (iloc in tmploc) { 
//            tmparr.push(tmploc(iloc));
//        }        
//    }
    
    return tmparr;
    
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ GAME PIECES SECTION ]

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ COLLISION SECTION ] // DEPRECIATED?!?!
// REFACTOR INTO PLAYER OBJECT isFILLED process:
function collide_isEdge(playernum = 0) {
    // USED: FINAL v3    
    function check_Edge(x, y) {
        if (x > CanvasDefault.dx || y > CanvasDefault.dy || x < 1 || y < 1 ) {
            console.log('EDGE COLLISION:' + players[playernum].loc[0] );
            setPlayersStuff(players[playernum].loc[0][2]);
            return true;
        } else {
            return false;
        }
    }
    return check_Edge(players[playernum].loc[0][0],players[playernum].loc[0][1]);
}

function collide_isSelf(playernum = 0) {
    // FINISHED v3
    // this works for checking the players head to his tail.
    let myhead = players[playernum].loc[0].slice();
    let mybody = players[playernum].loc.slice(1);
        for (coords in mybody) {
            if (mybody[coords][0] == myhead[0] && mybody[coords][1] == myhead[1]) {
                clog('SELF COLLISION:' );
                setPlayersStuff(myhead[2]);
                return true;
            }
        }
    return false;
}

function collide_isOther(playernum = 0) {
    
    function get_theirbodies(playernum = 0) {
    // FINISHED v3
        let myhead = players[playernum].loc[0].slice();
        let theirbodies = [];
        for (player in players) {
            if (player == playernum) {
                clog('[get_bodies()]-[skipping my body]');
            } else {
                let tmpbod = players[player].loc.slice();
                for (index in tmpbod) {
                    theirbodies.push(tmpbod[index]);
                }
            }
        }
        return theirbodies;
    }
    // FINISHED v3    
    let myhead = players[playernum].loc[0].slice();
    let allbodies = get_theirbodies(playernum);
            for (coords in allbodies) {
                if (allbodies[coords][0] == myhead[0] && allbodies[coords][1] == myhead[1]) {
                    clog('OTHER COLLISION:'); // bodyindex:' + coords + '' );
                    console.log('Player:' + myhead[2]);
                    setPlayersStuff(myhead[2]);
                    console.log('Player Hit:' + allbodies[coords][2]);
                    return true;
//                    console.log(allbodies[coords]);
                }
    
            }
    return false;
}
 
function setPlayersStuff(col = "yellow") {
    // probaly should be called 'SETPLAYERS STUFF DO DEAD NOW' as this
    // essentially is only related to the death of a player operation.
    // target player by color (allows rgb etc.)
    const result = players.find( playtmp => playtmp.color === col );
    result.isAlive = false;
    // remove square that would be beyond wall/ ontop of other snake
    result.loc.shift();
    clog('SETTER:' + col );
}

function collisions () {
    for (player in players) {
        if (players[player].isAlive) {
            if (collide_isEdge(player) || collide_isSelf(player) || collide_isOther(player)) {
                // this appears to be doing nothing; 
                // but the condition check itself does all the work.
                //                players[player].loc.shift();
                
                // this can be refactored into an isFilled() check but i will lose the edge/self/other data.
            }
        }
    }
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ COLLISION SECTION ]

// -=-=-=-=-=-=-=-=-=-=-=-=-=--= [ LIFE BEGINS: ]
function LEVEL_splashscreen() {
    // NOTES:
    //  Add something like a snake drawing a box around splashwords.
    background();
    Shadow();
    writeText(); // default settings do splashscreen 'SNAFU' text  
    //    writeText('ZnAeVuS'); // default settings do splashscreen 'SNAFU' text  
    Shadow(1, 'gold');
    clrShadow();
    GlobalAlpha(0.4);
    writeText("d74g0n's", undefined, 180, '24px serif', 'black', 'black', 'bottom');
    GlobalAlpha(1);
    Shadow(3, 'red');
    writeText("BATTLE-ROYALE!", undefined, 260, '34px serif', 'gold', 'gold', 'top');
    clrShadow();
    // REFACTOR TO ... Be on TIMER and gameoption controlled:
//    fadeTitle();
}

function fadeTitle() {
    // lerp the bg away.
 GlobalAlpha(0.2);
    c.fillStyle = game_defaults.bg;
    c.fillRect(240, 100,canvas.width/2.2, canvas.height/2.2);
 GlobalAlpha(1);
}

function LEVEL_reset() {
    background();
}
//  dirty framecount for dirty game loot.

var currentframecount = 0;

function dirty_Gameloop() {
//        fadeTitle();
    currentframecount++;
    console.log('-=-=- [ FRAME ]-=-=-');
//    players_look();
//    background();

    movepieces();
//    players_look();
    // playerone looks turns into ai process.

    collisions();
    if (_alivecount() == -1 && timers[0]) {
        console.log('EVERYBODY DEAD!');
        console.log('DO NEXT ROUND SHIT');
        console.log('FRAME: ' + currentframecount);
        
        console.log('TIMER REMOVED');
        clearInterval(timers[0]);
    }
    drawPlayers();
    
//    find_direction(players[0].loc[0],players[0].loc[1]);
    
    
    GlobalAlpha(0.2);
    background();
    GlobalAlpha(1);
    
//    draw_linebox(1,1);
//drawbox(3,1);

    
//    fadeTitle();
//    players_look();
}
// -=-=-=-=-=-=-=-=-=-=-=-=- [ LIFE ENDS ]

// -=-=-=-=-=-=-=-=-=-=-=-=-=--= [ GATHERING AI DATA (SENSE) BEGINS: ]
function players_look() {
    for (player in players) {
        players[player].setLRUD(indexofmax(player_look(player)));
    }
}

function player_look(playerindex) {
    return qcheck(players[playerindex].loc[0][0],players[playerindex].loc[0][1]);
}

function isValid(arrofvals = [0]) {
    // making my own manual filter
    let newarr = [];
    for (i = 0; i < arrofvals.length ; i++ ){
        if (arrofvals[i] > 0) {
            newarr.push(true);
        } else {
            newarr.push(false);
        }
    } // end of for
    console.log(newarr);
    return newarr;

}
// -=-=-=-=-=-=-=-=-=-=-=-=-=--= [ AI RELATED LOGIC: ]
function qcheck(x = 1,y = 1) {
    // function is used a wrapper for check_directions()
    return check_directions([[x,y]]);
}

function check_directions(xy_target_arr) {
    // REFACTOR REFACTOR: Can be embedded in qcheck.
    // USE QCHECK FOR EASE:
    // builds dataobject // array of available tile count surrounding the player.

    // get 'occupied tile' data
    let locationlist = get_all_filled_locations();
    // prepare the data to be collected:
    // left and right of location available:
    let xleft = 0;  
    let xright = 0;
    let xbase = xy_target_arr[0][0]; // grab X value
//    console.log('xy_target_arr[0][0] = ' + xy_target_arr[0][0]); //DB
    let yup = 0; // 
    let ydown = 0;
    let ybase = xy_target_arr[0][1]; // grab Y vaule
//    console.log('xy_target_arr[0][1] = ' + xy_target_arr[0][1]); //DB
    // these are the dimension used to find right and bottom walls.
    const rowlen = CanvasDefault.dx;
    const collen = CanvasDefault.dy;

    
    // THIS IS A LITTLE BROKEN:
    
    // do left of X available:
    for (var x = 1; x < xbase; x++ ) {
        if (isFilled(xbase - x,ybase)) {
           // function says filled is true then don't track it as available.
           // can actually break out of loop because no more room exists
            x = xbase;
        
        } else {
             xleft++;
        }
    }
    // do right of X available:
    for (var x = xbase + 1; x < rowlen+1; x++) {
         if (isFilled(x,ybase)) {
           // function says filled is true then don't track it as available.
           // can actually break out of loop because no more room exists
             x = rowlen;
        } else {
            xright++;
        }       
    }
    // do up of Y available:
    for (var y = 1; y < ybase; y++) {
         if (isFilled(xbase,ybase - y)) {
           // function says filled is true then don't track it as available.
           // can actually break out of loop because no more room exists
            y = ybase;
                         
        } else {
             yup++;
        }       
    }
     // do down of Y available:
    for (var y = ybase + 1; y < collen+1; y++) {
         if (isFilled(xbase,y)) {
           // function says filled is true then don't track it as available.
           // can actually break out of loop because no more room exists
            y = collen;
                         
        } else {
             ydown++;
        }       
    }   

    // PURE DEBUGGING:
/*    var AIDATA = {
        l: xleft,
        r: xright,
        u: yup,
        d: ydown
    }*/
    // REFACTORED**  -  an array 
//    console.log('Available Squares Around Head:');
//    console.log(AIDATA);
    
    return [xleft,xright,yup,ydown];
 
}

function indexofmax(arr = [0]) {
    // used to find best choice of qcheck(x,y)
    // usage: indexofmax(qcheck(x,y));

    // START OF REAL FUNCTION:
    let thisval = arr.indexOf(Math.max.apply(null,arr));
//    console.log('max:');
//    console.log(Math.max.apply(null,arr)); // 4
//    console.log('index:');
//    console.log(arr.indexOf(Math.max.apply(null,arr)));

    return thisval;
    
}
// -=-=-=-=-=-=-=-=-=-=--= [ AI RELATED LOGIC: ]

