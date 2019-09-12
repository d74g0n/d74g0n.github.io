
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ DRAWING SECTION ]
// set globalalpha
function GlobalAlpha(num = 1) {
    c.globalAlpha = num;
}
// set shadows:
function Shadow(shadowBlur = 2, shadowColor = 'white', shadowOffsetX = 1, shadowOffsetY = 1) {
    c.shadowBlur = shadowBlur;
    c.shadowColor = shadowColor;
    c.shadowOffsetX = shadowOffsetX;
    c.shadowOffsetY = shadowOffsetY;
}
// clear shadows:
function clrShadow(color = 'rgb(255,0,255)') {
    // 'greenscreen-pink' used as debugging detector; 
    // finalize perhaps we go green or transparent.
    Shadow(0, color, 0, 0);
}
// set table colour:
function background(color = game_defaults.bg) {
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height)
}
// stroke_outline_Square:
function sSq(x, y, color = 'rgba(255,255,255,1)') {
    // draws a unfilled square (stroke) (sSq)
    if (x > 0) {
        x--;
    }
    if (y > 0) {
        y--;
    }
    c.beginPath();
    c.strokeStyle = color;
    //    c.strokeStyle = 'black';
    var s = CanvasDefault.scale;
    x = Dx(x);
    y = Dy(y);
    c.strokeRect(x + 0.5, y + 0.5, s, s);
    c.stroke();
}
// filled_Square:
function fSq(x, y, color = 'rgba(255,255,255,1)') {
    // draws a filled square (fSq)
    if (x > 0) {
        x--;
    }
    if (y > 0) {
        y--;
    }
    var s = CanvasDefault.scale;
    //    x = x + (x * s) + CanvasDefault._left;
    //    y = y + (y * s) + CanvasDefault._top;
    x = Dx(x);
    y = Dy(y);

    c.beginPath();
    c.fillStyle = color;
    c.fillRect(x, y, s, s);
    c.stroke();
}
// stroke and filled square (common):
function dSq(x, y, color = 'rgba(255,255,255,1)') {
//    sSq(x, y, color);
    fSq(x, y, color);
}
// draw text:
function writeText(string = 'SNAFU', scaleX = canvas.width / 2, scaleY = 170, font = '98px serif', fillStyle = 'red', strokeStyle = 'gold', textBaseline = 'top', textAlign = 'center') {
    c.fillStyle = fillStyle;
    c.strokeStyle = strokeStyle;
    c.font = font;
    c.textAlign = textAlign;
    c.textBaseline = textBaseline;
    c.fillText(string, scaleX, scaleY);
    c.strokeText(string, scaleX, scaleY);
    // REMEMBER SHADOWING?
}
// draws all the players to screen:
function drawPlayers() {
    // send each players location array to draw_array 1 by 1
    for (player in players) {
        draw_array(players[player].loc);
    }
}
// draw the list of squares:
function draw_array(arr_of_arrs) {
    // This is the RENDER process for all snakes - need to lerp a head in here.
    
    
    // probably leave head for a lerping by rasing removing =0 or changing to =1:
    for (i = arr_of_arrs.length - 1; i >= 0; i--) {
        var x = arr_of_arrs[i][0];
        var y = arr_of_arrs[i][1];
        var col = arr_of_arrs[i][2];
        dSq(x, y, col);
        //        drawbox(x,y); // GOOFIN AROUND !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
}

function lerp_it(headO, headN) {
    
    
    
    
}



function draw_linebox(x, y) { // ACTIVE - THOSE AROUND IT ARE NOT - outlining snake works.
    // need more logic for direction factor etc.
    c.beginPath();
    // start.
    c.moveTo(x, y);
    c.lineTo(x + CanvasDefault.scale, y); // over right
    c.lineTo(x + CanvasDefault.scale, y + CanvasDefault.scale); // down
    c.lineTo(x, y + CanvasDefault.scale); // back left.
    c.strokeStyle = "#ff0";
    c.stroke();

}
// -=-=-==-=-=-=-=-=-=-=-=-[ OUTLINE DRAW SYSTEM ]
function dT(x, y) { // draw_topline
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + CanvasDefault.scale, y); // over right
    c.strokeStyle = "#ff0"; // TESTING ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    c.stroke();
}

function dB(x, y) { // draw_bottomline
    y = y + CanvasDefault.scale;
    dT(x, y); // over right
    //    c.beginPath();
    //    c.moveTo(x, y);
    //    c.lineTo(x + CanvasDefault.scale, y); // over right
    //    c.strokeStyle = "#ff0"; // TESTING ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    c.stroke();
}

function dL(x, y) { // draw_leftline
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x, y + CanvasDefault.scale); // down left
    c.strokeStyle = "#ff0"; // TESTING ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    c.stroke();
}

function dR(x, y) { // draw_rightline
    x = x + CanvasDefault.scale;
    dL(x, y);
}

function drawbox(x, y) {
    x--;
    y--;
    x = Dx(x);
    y = Dy(y);
    dT(x, y);
    dB(x, y);
    dL(x, y);
    dR(x, y);
}
// -=-=-==-=-=-=-=-=-=-=-=-[ OUTLINE DRAW SYSTEM ]
// unused ref:
function draw_endcap(x, y, direction) {

    if (direction == 'd') {
        c.beginPath();
        // start.
        c.moveTo(x, y); // TL
        c.lineTo(x + CanvasDefault.scale, y); // over right  TR
        c.lineTo(x + CanvasDefault.scale, y + CanvasDefault.scale); // down BR
        c.lineTo(x, y + CanvasDefault.scale); // back left. BL
        c.strokeStyle = "#ff0";
        c.stroke();
    }


    const _BoxLine = {
        topleft: [x, y],
        topright: [x + CanvasDefault.scale, y],
        bottomright: [x + CanvasDefault.scale, y + CanvasDefault.scale],
        bottomleft: [x, y + CanvasDefault.scale],
        top: y,
        left: x,
        right: x + CanvasDefault.scale,
        bottom: y + CanvasDefault.scale
    }

}
// unused ref:
function draw_snakeoutline(playerloc) {

    playerloc = players[0].loc;


    let myendindex = playerloc.length - 1;

    // first we draw a cap.  let's start at the head.
    for (i = 0; i < myendindex; i++) {

        var xa = playerloc[i][0];
        var ya = playerloc[i][1];



        var xb = playerloc[i + 1][0];
        var yb = playerloc[i + 1][1];

        var xd = xb - xa;
        var yd = yb - ya;

//        console.log('delta_x: ' + xd + ' deltay_: ' + yd);

        if (xd == -1 && yd == 0) {
            // moved right (no right wall [i] no left [i+1] )
            xa--;
            xa--;
            ya--;
            xb--;
            yb--;

            xa = Dx(xa);
            ya = Dy(ya);
            xb = Dx(xb);
            yb = Dy(yb);

            c.beginPath();
            // topleft to topright 2 squares.
            c.moveTo(xa, ya);
            c.lineTo(xb + CanvasDefault.scale * 2.1, ya); // over right
            // topstroke ^^

            c.strokeStyle = "#fff"; // TESTING ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            c.moveTo(xa, ya + CanvasDefault.scale);
            c.lineTo(xb + CanvasDefault.scale * 2.1, yb + CanvasDefault.scale); // over right
            c.stroke();

        }






    } // master loop.







}
// orientation:
function find_direction(arrA,arrB) {
    // WIP GETTING SOMEWHERE:
    // this function helps the drawing logic understand the outline of the shape.
    // inputs are a players location index , index+1
    // eg:( players[player].loc[i],  players[player].loc[i+1] )
    
    // get difference / delta of X and Y values of neighbour.
    let dx = arrB[0] - arrA[0];
    let dy = arrB[1] - arrA[1];
    
    switch(dx) {
        // these are all opposite because we are drawing in reverse:
        case -1:
            console.log('left');
            dT(Dx(--arrA[0]), Dy(--arrA[1]));
            dB(Dx(arrA[0]), Dy(arrA[1]));
        // code block
            break;
        case 1:
            console.log('right');
        // code block
            break;
    }
    
     switch(dy) {
        case -1:
            console.log('up');
        // code block
            break;
        case 1:
            console.log('down');
        // code block
            break;
    }   
    
    
}



// -=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ DRAWING SECTION ]

// Needs:

//    - lerp systems.
//    - stroke draw snake system.
//    - background animatey (post lerp)
