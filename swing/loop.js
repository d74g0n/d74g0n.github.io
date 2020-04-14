let frame = 0;
let swingforce = 90; // 180
let swingspeed = 0.05;

let roplen = 100;

function loop() {
    frame += swingspeed;
    if (true) {
        //update background
        drawBG()
    }

    let swingdist = Math.sin(frame);
    let swing = (swingdist * swingforce);

    //        roplen -= 0.1;
    //
    //        if (roplen < 50) {
    //            roplen = 50;
    //        }

    linerope(swing, roplen);
    requestAnimationFrame(loop);
}


loop();
//setTimeout(loop, 1000);
