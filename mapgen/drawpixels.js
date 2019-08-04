function background(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setColor(color) {
    ctx.fillStyle = color;
}

function drawSquare(x, y, scale = global.scale) {
    //    setColor(color);
    ctx.fillRect(x, y, scale, scale);
}

function noiseCol(val) {
//BASE    
    
    if (val < 50) {
        return `rgba(0,0,${val},1)`;
    }

    if (val < 100) {
        return `rgba(0,0,${val},0.9)`;
    }

    if (val < 200) {
        return `rgba(${val*2},${val},0,1)`;
    }

    if (val < 230) {
        return `rgba(${255-val},${255-val},${255-val},0.9)`;
    }
    return `rgba(${val},${val},${val},1)`;
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
    
    console.log(`mathfloorval:${MATH.floor(val)}`);
    
    if (MATH.floor(val) % interval == 0) {
        
    }
    
    
}


function noiseDraw(xb, yb, val) {
//    console.log(`val:${val}`);
    setColor(noiseCol(val));
//        setColor(noiseCol2(val));
    drawSquare(xb, yb, global.scale);
}

function tileLoop() {
    for (let y = 0; y <= canvas.height / global.scale; y++) {
        for (let x = 0; x <= canvas.width / global.scale; x++) {
            let noiseval = Perl.noise(xoffset+x / octaveLevel, y / octaveLevel, z);
            noiseDraw(x * global.scale, y * global.scale, noiseval);
            //                console.log(Perl.perlin(x/100,y/100,0.1));
            //                console.log(Perl.floorNoise(x/100,y/100,0.1));

        }
    }
}









/*
let flipcolaid = 0;
function flipColours (x) {
    const cccc = ["white","green","brown","gold","blue","red","orange","black"];
    flipcolaid++;
    if (flipcolaid >= cccc.length) {
        flipcolaid = 0;
    }
    setColor(cccc[flipcolaid]);
    
}*/
