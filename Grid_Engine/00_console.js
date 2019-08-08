// -=-=-=-=-=- [ DEBUG CREATOR ] =-=-=-=-=-=-=-
var _verbose = false;


var players = [];
// overlays console.log onto screen.
var _overlaydata = false;

function overlay() {
    // refactor into score board.
    writeText('keychecker', 10, 10, '12px monospace', 'black', 'transparent', 'top', 'left');
} // DEBUGGING RELATED: / CREATOR MODE

if (_verbose) {
    console.log('[VERBOSE][CREATOR_MODE]');
}

var clog = function (x) {
    // fn is here to shorten and limit console.log 
    // add write to canvas text lvl debugger INCREASE POWER++
    if (_verbose) {
        return console.log(x);
    }
}; clog('[note][clog() replaces console.log]');
// -=-=-=-=-=- [ DEBUG CREATOR ]
