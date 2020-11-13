console.log(`noise viewer init`);

let EngineState = {
    z: 0.05,
    zinc: 0.025,
    nw: 50,

    hueUlimit: 900,
    hueLlimit: 90,
    huerange: 360,
    hueinc: 1,
    hueIncrement: function () {
        let r = EngineState.huerange;

        if (r > EngineState.hueUlimit) {
            EngineState.hueinc = EngineState.hueinc * -1;
        }


        if (r < EngineState.hueLlimit) {
            EngineState.hueinc = EngineState.hueinc * -1;
        }

        r += EngineState.hueinc;
        EngineState.huerange = r;
        return EngineState.huerange;
    }
}
const E = EngineState;


function createGridArray(num = 64) {
    let grid = [];
    for (let y = 0; y < num; y++) {
        grid[y] = new Array(num);
    }
    return grid;
}

function fillGridRGB(grid) {
    let gx = grid.length;
    let gy = grid[0].length;

    let p = 1;
    let o = 2;
    //    let E.nw = 15;

    let noiseR = 0;
    let noiseG = 0;
    let noiseB = 0;

    for (let x = 0; x < gx; x++) {
        for (let y = 0; y < gy; y++) {
            noiseR = _PL.perlin((x) / E.nw, y / E.nw, E.z) * 255;
            noiseG = _PL.perlin((x + 1.5) / E.nw, y / E.nw, E.z) * 255;
            noiseB = _PL.perlin((x + 2.75) / E.nw, y / E.nw, E.z) * 255;
            //            grid[x][y] = `rgba(${noiseR},${noiseG},${noiseB},${1})`;
            //            grid[x][y] = RGBtoHEX(noiseR, noiseG, noiseB);
            grid[x][y] = stepHue(RGBtoHEX(noiseR, 255 - noiseG, 55 - noiseB), _PL.perlin(x / E.nw, y / E.nw, E.z) * E.huerange);
        }
    }
    return grid;
}

//let mygrid = fillGridRGB(createGridObject(64, 1));
//let mygrid = fillGridRGB(createGridArray(64));

function drawNoiseGrid(grid) {
    let gx = grid.length;
    let gy = grid[0].length;

    let scale = 8;

    for (let xa = 0; xa < gx; xa++) {
        for (let ya = 0; ya < gy; ya++) {
            ctx.fillStyle = grid[xa][ya];
            ctx.fillRect(xa * scale, ya * scale, scale, scale);
            ctx.fillStyle = 'red';
        }
    }
    return grid;
}

//let gridstate = drawNoiseGrid(fillGridRGB(createGridArray(64)));
let gridstate = drawNoiseGrid(fillGridRGB(createGridArray(80)));


setInterval(function () {

    //    E.z += 0.01;
    E.z += E.zinc;
    E.hueIncrement();



    gridstate = drawNoiseGrid(fillGridRGB(gridstate));

    console.log(stepHue('0xff0000', E.z));

}, 1000 / 60)
