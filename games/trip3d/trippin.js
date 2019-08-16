//let cameran = {
//    x: 10,
//    y: 10,
//    z: 10,
//}

// REDO ALL MATH TO BE CENTERED DOH!!!
// 2 for loops x of canvas.width/2 one + one - from center of every loop fill... 

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
        //        setColor(`rgba(0,${PERLNOISE},0,1)`);
        setColor(`rgba(0,${PERLNOISE*1.5},${PERLNOISE*2},1)`);
        if (isGrid) {
            if (isAlternating) {
                setColor(`rgba(0,${PERLNOISE},0,1)`);
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
    }
}

setColor('white');
setStrokeColor('white');
let Px = 0.01;

function run() {
    background(gradientV('black', 'blue', 'skyblue'));
    //    setColor('rgb(0,25,0)');
    //    setColor('rgba(0,70,140,0.6)');
    setColor('rgba(0,17,34,1)');
    drawGround(canvas.height * 0.7);
    Px += 0.01;
    //    let rowwidth = 30;
    let rowwidth = 80;
    let horizonAdjust = 2;
    for (let y = 0; y < 18; y++) {
        drawRow(rowwidth, (canvas.height * 0.6) + horizonAdjust, 0.2, Px * 2);
        rowwidth -= 2;
        horizonAdjust *= 1.35;
    }
}

//run();
//setInterval(run, 1000 / 30);
//    let rowwidth = 80;

function drawCenteredRows(rowwidth = 40) {
    let horizonAdjust = 2;
    for (let y = 0; y < 18; y++) {
        drawCenteredRow(rowwidth, (canvas.height * 0.6) + horizonAdjust, 0.2, Px * 2);
        rowwidth -= 2;
        horizonAdjust *= 1.2;

    }

}

function drawCenteredRow(rowcount = 12, rowbaseY = canvas.height * 0.6, Px = 0.2, Py = 0.2, Pz = 0.2, m = 25, ) {
    //z is up down not to be used aside from tripping out.
    let PERLNOISE = Perl.noise(Px, Py, Pz) / 255;
    PERLNOISE *= 80;
    let scalefactor = canvas.width / rowcount;


    let CenterX = canvas.width / 2;
    let centerBlockTop = CenterX - scalefactor / 2;


    // Do right side::
    for (let x = 0; x <= rowcount / 2; x++) {
        PERLNOISE = Perl.noise(Px + (x / 10), Py, Pz) / 255;
        PERLNOISE *= 80;
        setColor(`rgba(0,${PERLNOISE*1.5},${PERLNOISE*2},1)`);
        
        if (PERLNOISE > 40 && PERLNOISE < 48){
            setColor(`white`);
        }
        
        ctx.fillRect((x * scalefactor) + centerBlockTop, rowbaseY - PERLNOISE, canvas.width / rowcount, PERLNOISE);

    }
    // re-init for leftside::
//    console.log(PERLNOISE);
    PERLNOISE = Perl.noise(Px, Py, Pz) / 255;
    PERLNOISE *= 80;


    //    scalefactor = canvas.width / rowcount;
    // Do left side::    
    for (let x = 0; x >= (-1 * scalefactor); x--) {
        setColor(`rgba(0,${PERLNOISE*1.5},${PERLNOISE*2},1)`);

        if (PERLNOISE > 40 && PERLNOISE < 48){
            setColor(`white`);
        }

        ctx.fillRect((x * scalefactor) + centerBlockTop, rowbaseY - PERLNOISE, canvas.width / rowcount, PERLNOISE);
        PERLNOISE = Perl.noise(Px + (x / 10), Py, Pz) / 255;
        PERLNOISE *= 80;


    }


}

let tX = 1.1;
let tY = 1.1;

function Step(rowW = 20) {

    background(gradientH());

    //    let rowW = 20;
    let increment = 0.002;
    //drawCenteredRows();
    drawCenteredRow(rowW, canvas.height * 0.62, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.68, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.72, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.78, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.84, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.90, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 0.96, tX, tY);
    //    tX += increment;
    tY += increment;
    rowW -= 2;
    drawCenteredRow(rowW, canvas.height * 1.02, tX, tY);
//    tX += increment;
    tY += increment;
    rowW -= 2;

}

//Step();

//setInterval(Step, 1000 / 30);

function drawFeetOut(rowcount=10, rowbaseY,Px=0.02,Py=0.02,Pz=0.02){
    // how much do we amp up the perlnoise - colour purposes mostly:
    let perlMagnifier = 40;
    // get our Perlin Noise for Coordinate:
    let PERLNOISE = Perl.noise(Px, Py, Pz) / 255;
    // Scale up the noise to our needs:
    PERLNOISE *= perlMagnifier;
    // set BlockSize:
    let blockSize = canvas.width / rowcount;
    // set CenterScreen:
    let centerScreen = canvas.width / 2;
    // set difference from center:
    let deltaXofCenter = centerScreen - (blockSize / 2);
    // set deltaX:
    let deltaX = (canvas.width/2 - deltaXofCenter);

    
    for (x = 0; x <= Math.floor(rowcount/2); x++){
        
        PERLNOISE = Perl.noise(Px + (x * .059), Py, Pz) / 255;
        PERLNOISE *= perlMagnifier;
//        setColor(`rgba(${PERLNOISE*4.5},${PERLNOISE*4.5},${PERLNOISE*2},1)`);
//        setColor(`rgba(${PERLNOISE*4.5},${PERLNOISE*4.5},${PERLNOISE*2},1)`);
           setColor(`rgba(0,0,${PERLNOISE*4},0.6)`);
//           setColor(`rgba(0,0,${PERLNOISE*4},1)`);
        
//        setColor(`rgba(0,,${rowbaseY/2},${PERLNOISE*4},0.8)`);
//        ctx.fillRect(deltaXofCenter+(x*blockSize),rowbaseY - PERLNOISE,blockSize+0.5,PERLNOISE+0.5);
        ctx.fillRect(deltaXofCenter+(x*blockSize),rowbaseY - PERLNOISE,blockSize,PERLNOISE);
        
    }
    
    let steps = (rowcount/2);
    
        //LEFT SIDE
    for (x = 0; x < Math.floor(rowcount/2)+0.25; x++){
        
        PERLNOISE = Perl.noise(Px - ((steps-x) * .059), Py, Pz) / 255;
        PERLNOISE *= perlMagnifier;
//        setColor(`rgba(0,${PERLNOISE*4.5},${PERLNOISE*2},1)`);
        setColor(`rgba(0,0,${PERLNOISE*4},0.6)`);
//        setColor(`rgba(0,0,${PERLNOISE*4},1)`);
        
//        ctx.fillRect(deltaXofCenter-(x*blockSize),rowbaseY - PERLNOISE,blockSize,PERLNOISE);
//        ctx.fillRect((x*blockSize)-(deltaX*2),rowbaseY - PERLNOISE,blockSize+0.5,PERLNOISE+0.5);
        ctx.fillRect((x*blockSize)-(deltaX*2),rowbaseY - PERLNOISE,blockSize,PERLNOISE);
        
    }
}

function boop(xx=0.01){

    background(gradientV('black','purple','blue'));
    
let ystep = 2;
let rowincreaser = 0;
let rows = 5;

for (y = canvas.height; y > canvas.height/2; y-=10){
//for (y = canvas.height; y > 200; y-=2){

//    drawFeetOut(rows + rowincreaser, canvas.height-ystep, ystep*10, 0.2+xx);
    drawFeetOut(rows + rowincreaser, y-ystep, ystep, 0.02+xx);
//    drawFeetOut(rows + rowincreaser, canvas.height-ystep, 3.02, 0.2+xx);
//    drawFeetOut(rows + rowincreaser, canvas.height-ystep, 3.02, 0.2+MPy,0.2+xx);
    rowincreaser+=2;
    ystep+=0.025;
    MPy += 0.1;
}
    
}

let MPy = 0.1;
let rrun = 0.01;
function booptheboop(){
    
    boop(rrun+=0.01);
    
}


setInterval(booptheboop, 1000/30);



//booptheboop();





canvas.onclick = function (ev) {
    background('black');
    Step();
}
