// -=-=-=-=-=- [ DEBUG CREATOR ] =-=-=-=-=-=-=-
// -=-=-=-=- [CREATOR MODE MADNESS]
// building a page/stage flipper:
var Completed_Stages = [];

function creator_mode() {
    Completed_Stages.push(LEVEL_splashscreen);
    Completed_Stages.push(drawPlayers);
    Completed_Stages.push(dirty_Gameloop);
//    Completed_Stages.push(draw_snakeoutline);
    
//    Completed_Stages.push(LEVEL_reset);
    Completed_Stages[0]();    
} creator_mode();


function quickstart() {
    console.log('quickstarted');
    for (var i = 0; i < 3; i++) {
        Completed_Stages[i]();
    }
    debugginData.pageindex = 3;
}quickstart();  // NOTICE ME CREATOR DUDE SENPAI
// -=-=-=-=-=- [ DEBUG CREATOR ] =-=-=-=-=-=-=-


var timers = [];
function toggle_gametimer(){
    

    
    
    
    
    
    
}
