//let cameran = {
//    x: 10,
//    y: 10,
//    z: 10,
//}

let global = {
    scale: 10,


}
global.loopX = canvas.width / global.scale;
let ViewingOptions = {
    expansionfactor: 2,
    scalefactor: 4,
}
const VO = ViewingOptions;

let isAlternating = true;

let isGrid = false;

function drawRow(rowcount = 8, rowbaseY = canvas.height * 0.6, Px = 0.2, Py = 0.2, Pz = 0.2, m = 25, ) {
    //z is up down not to be used aside from tripping out.



    let PERLNOISE = Perl.noise(Px, Py, Pz) / 255;
    PERLNOISE *= 80;
    let scalefactor = canvas.width / rowcount;



    for (let x = 0; x <= rowcount; x++) {
        setColor('red');

        setColor(`rgba(0,${PERLNOISE},0,1)`);
        
        if (isGrid) {
            if (isAlternating) {
                setColor(`rgba(0,${PERLNOISE},0,1)`);

            } else {
                setColor(`rgba(0,${PERLNOISE*2},0,1)`);
            }

        }

                
        //HAX
        isAlternating = !isAlternating;

        ctx.fillRect((x * scalefactor), rowbaseY - PERLNOISE, canvas.width / rowcount, PERLNOISE);

        PERLNOISE = Perl.noise(Px + (x / 10), Py, Pz) / 255;
        PERLNOISE *= 80;

        //        PERLNOISE*=1.1;
        //        console.log(PERLNOISE);
    }




}




setColor('white');
setStrokeColor('white');

let Px = 0.01;

function run() {
    background(gradientV());
    setColor('rgb(0,25,0)');
    drawGround(canvas.height * 0.7);
    Px += 0.01;
    let rowwidth = 30;
    let horizonAdjust = 3;


    for (let y = 0; y < 14; y++) {

        //        
        drawRow(rowwidth, (canvas.height * 0.6) + horizonAdjust, 0.2, Px * 2);
        rowwidth -= 2;
        horizonAdjust *= 1.35;
        //    drawRow(28, (canvas.height * 0.6) + 4);
    }

    //    dlog(`rowwidth:${rowwidth}`);
    //horizontalLine(150);
    //ctx.stroke();
}

//run();

setInterval(run, 1000 / 30);
