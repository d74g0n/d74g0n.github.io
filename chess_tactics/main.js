const canvas = document.getElementById('gridview');
const ctx = canvas.getContext('2d');

let global = {};
global.scale = 30;

canvas.height = 300;
canvas.width = 300;


function drawBoard() {
    // somewhat equivellant to clearscreen.
    for (let y = 0; y <= canvas.height / global.scale; y++) {
        for (let x = 0; x <= canvas.width / global.scale; x++) {

            if (y % 2 == 0) {
                if (x % 2 == 0) {
                    setColor('white');
                } else {
                    setColor('black');
                }
            } else {
                if (x % 2 == 0) {
                    setColor('black');
                } else {
                    setColor('white');
                }
            }

            drawSquare(x * global.scale, y * global.scale, global.scale);

        }
    }
}

canvas.onmousedown = function (ev) {

//    console.log(ev);
//    console.log(`offset: ${ev.offsetX},${ev.offsetY}`);
//    console.log(`/30: ${Math.floor(ev.offsetX/30)},${Math.floor(ev.offsetY/30)}`);

    let x = Math.floor(ev.offsetX / 30); //30 represents global.scale but it seems wonk so hardcoded.
    let y = Math.floor(ev.offsetY / 30); //30 represents global.scale but it seems wonk so hardcoded.

    drawBoard();
    highlightTile(x, y, 'rgba(255,0,156,0.9)');
//    highlightTile(x, y, 'red');
    outlineTile(x, y, 'black');
    
circleFillTile(x, y, 'blue');
    circleTile(x, y, 'cyan');
}

function highlightTile(x, y, color) {
// these functions are essentially the draw functions interpreted into board coordinates.
    setColor(color);
    drawSquare(x * global.scale, y * global.scale, global.scale);
}

function outlineTile(x, y, color) {
// these functions are essentially the draw functions interpreted into board coordinates.
    sSq(x * global.scale, y * global.scale, color);
}

function circleTile(x, y, color) {
// these functions are essentially the draw functions interpreted into board coordinates.
    setStrokeColor(color);
    drawCircle((x * global.scale) + (global.scale / 2), (y * global.scale) + (global.scale / 2), 13);
}

function circleFillTile(x, y, color) {
// these functions are essentially the draw functions interpreted into board coordinates.
    fillCicle((x * global.scale) + (global.scale / 2), (y * global.scale) + (global.scale / 2), 13, color);
}



drawBoard();
//setColor('rgba(156,156,0,0.5)');
//let x = 9;
//let y = 0;
//drawSquare(x * global.scale, y * global.scale, global.scale);
//
//sSq(x * global.scale, y * global.scale, 'blue');

//setColor('red');
//            drawSquare(0 * global.scale, 0 * global.scale, 100);
