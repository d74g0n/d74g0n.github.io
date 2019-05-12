// THIS IS ESSENTIALLY THE INDEX.JS The LAUNCH POINT.  

/*
 NOTES:
create buffer let buffer = create (unppended?) canvas
draw everything to buffer before drawing to draw canvas.

https://stackoverflow.com/questions/2688961/how-do-i-tint-an-image-with-html5-canvas

*/

// 'global' object for managing everything.
let global = {
    raw_scale: 32,
    draw_scale: 512 / 2,
    ctx: undefined,
    canvas: undefined,
    spritesheet: undefined,
    skelement: undefined,
};

let height = document.documentElement.clientHeight - 16;
let width = document.documentElement.clientWidth - 16;
var min_size = height < width ? height : width;

// this centering data is just for inhouse use.
let centerSCR = {};
centerSCR.x = min_size / 2.5;
//centerSCR.y = min_size / 2.5;
centerSCR.y = min_size / 1.5;
//console.log(centerSCR);

global.skelement = new skelement();
global.ctx.imageSmoothingEnabled = false;
// load the images:
loadSpriteSheet();
// draw the initial background:
draw_gradient_top2bot('skyblue', 'white', 'green');

// push characters to a dudes array.
let dudes = [];
dudes.push(new Prisoner(centerSCR.x, centerSCR.y, 'bob'));
global.controller = new web_controls(dudes[0]);
//dudes.push(new Prisoner(1, centerSCR.y, 'dale'));
//global.controllerB = new web_controls(dudes[1]);
//dudes.push(new Prisoner(256, centerSCR.y+64, 'jeff'));
//dudes.push(new Prisoner(662, centerSCR.y+50, 'hammy', true));
//NOTES: greatest Y value (inverted remember) = drawn last = infront.


//check control states etc then apply velocities


setTimeout(function () {
    //pause/timeout for load::
    dudes.forEach(function (baddude) {
        baddude.ctx = global.ctx;
    });

    global.framecount = 1;

    let animationLoop = setInterval(function () {
        if (global.framecount > 60) {
            global.framecount = 1;
        }
        draw_gradient_top2bot('skyblue', 'white', 'green');




        if (global.framecount % 2 == 0) {
            dudes.forEach(function (baddude) {
                baddude.tick();
            });
        } else {
            dudes.forEach(function (baddude) {
                baddude.move();
                baddude.draw_body();

            });
        }
        global.framecount++;

    }, 1000 / 30);

}, 500);
