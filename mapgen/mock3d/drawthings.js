//   global declarations
let global = {};
global.scale = 32;
//        global.drawtopgraphy = true;
global.drawtopgraphy = false;
const geography_line_interval = 25;
const incremental = 0.1;
let z = 2;
let xpan = 1 / 10000000;

// octaveLevel is the zoom of the noise::
let octaveLevel = 20;
let xoffset = 0;



function background(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setColor(color) {
    ctx.fillStyle = color;
}

function drawSquare(x, y, scale = global.scale) {
    ctx.fillRect(x, y, scale, scale);
}

function noiseCol(val) {
    if (val < 50) {
        return `rgba(0,0,${val},1)`;
    }

    if (val < 100) {
        return `rgba(0,0,${val},1)`;
    }

    if (val < 200) {
        return `rgba(${val*2},${val},0,1)`;
    }

    if (val < 230) {
        return `rgba(${255-val},${255-val},${255-val},1)`;
    }
    return `rgba(${val},${val},${val},1)`;
}

function noiseColTweaker(val) {
    if (val < 50) { // Ocean bottom
        return `rgba(0,0,${val*0.7},1)`;
    }

    if (val < 100) {
        //        return `rgba(0,0,${val},0.9)`;
        return `rgba(0,0,${val*1.5},1)`;
    }

    if (val > 100 && val < 110) { // BEACH ZONE
        return `rgba(255,255,${val*1.5},1)`;
    }

    if (val < 150) { // GRASSLAND
        //        return `red`;
        //        return `rgba(${val/2},${val*0.9},0,1)`;
        return `rgba(${(val*0.2)},${val*0.9},0,1)`;
    }

    if (val < 180) { // GRASSLA ND2
        //        return `red`;
        //        return `rgba(${val/2},${val*0.9},0,1)`;
        return `rgba(${val+(val*0.2)},${val*0.9},0,1)`;
    }

    if (val > 180 && val < 200) { // MNT ZONE
        //        return 'white';
        return `rgba(${255-val*1.1},${255-val*1.1},${255-val*1.1},1)`;
    }

    if (val < 250) { // MNT PEAK
        //        return 'red';
        //        return `rgba(${255-val},${255-val},${255-val},0.9)`;
        return `rgba(${255-val*0.5},${255-val*0.5},${255-val*0.5},1)`;
    }

    return 'white';

}

function noiseCol2(val) {
    // TUNDRA::
    if (val > 150) {
        return `rgba(0,0,${val*1.5},1)`;
    } else {
        return `rgba(${255-val/2},${255-val/2},${255-val/4},1)`;
    }

}

function drawGeographyLines(val, interval) {
    if (Math.floor(val) % interval == 0) {
        setColor('black');
    }
}

let yoffset = 0;
z = 0.009;
const screenoffset = 170;
function drawHorizonPerspective() {

//    background('blue');
    background('rgba(0,0,200,0.6)');

    const drawPerspectiveBlock = function (x, y, val) {
        if (val > 255) {
            val = 255;
        }
        if (val < 0) {
            val = 0;
        }
//        ctx.fillRect(x* global.scale, (canvas.height / 2) + (y - (val / distanceShrink)), global.scale, (val / distanceShrink));
        ctx.fillRect(x* global.scale, screenoffset + (canvas.height / 2) + (y - val), global.scale, (val+distanceShrink));
    }

    
    let distanceShrink = 1;
    for (let y = 0; y < (canvas.height / 2)+ 55; y++) {
        
        for (let x = 0; x < (canvas.width/global.scale); x++) {
//            let val = _PL.noise(x / 100, y / 1000, 0.05);
//            let val = _PL.percentage(_PL.OctavePerlin((x+xoffset) / 100, (y+yoffset) / 1000, z/1000, 5, 2),255);
            let val = _PL.percentage(_PL.OctavePerlin((x+xoffset) / 100, (y+yoffset) / 100, z/100, 1, 0.5));
            setColor(noiseColTweaker(val));
            drawPerspectiveBlock(x, y, val);

        }
//        distanceShrink += 0.001;
    }


//    xoffset +=1;
    yoffset -=5;


}

function noiseDraw(xb, yb, val) {
    //    console.log(`val:${val}`);
    //    setColor(noiseCol(val));
    setColor(noiseColTweaker(val));
    //        setColor(noiseCol2(val));
    if (global.drawtopgraphy) {
        drawGeographyLines(val, geography_line_interval);
    }
    drawSquare(xb, yb, global.scale);
}

function tileLoop() {
    for (let y = 0; y <= canvas.height / global.scale; y++) {
        for (let x = 0; x <= canvas.width / global.scale; x++) {
            let noiseval = Perl.noise(xoffset + x / octaveLevel, y / octaveLevel, z);
            noiseDraw(x * global.scale, y * global.scale, noiseval);
            //                console.log(Perl.perlin(x/100,y/100,0.1));
            //                console.log(Perl.floorNoise(x/100,y/100,0.1));

        }
    }
}
let permenance = 5;
let zoffset = 1;

function tileLoop2() {
    for (let y = 0; y <= canvas.height / global.scale; y++) {
        for (let x = 0; x <= canvas.width / global.scale; x++) {
            let octavething = Perl.percentage(Perl.OctavePerlin((x + xoffset) / 100, y / 100, (z + zoffset) / 100, 4, permenance), 255);

            noiseDraw(x * global.scale, y * global.scale, octavething);
        }
    }
    //      permenance += 0.1;
    //    zoffset += 0.4;
}
