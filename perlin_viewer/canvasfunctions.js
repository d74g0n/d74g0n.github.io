const canvas = document.getElementById('mapdisplay');
const ctx = canvas.getContext('2d');
//canvas.width = 360;
canvas.width = 1200;
//canvas.height = 560;
canvas.height = 1080;

function background(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawRect(x, y, w, h) {
    ctx.fillRect(x, y, w, h);
}

function drawSquare(x, y, s) {
    ctx.fillRect(x, y, s, s);
}

function setColor(str) {
    ctx.fillStyle = str;
}

function noiseDraw(xb, yb, val) {
    //    setColor(Monotone(val));
    //    setColor(stepHue(val));


    if (DS.colormode == 1) {
        setColor(colorValue(val));
    }

    if (DS.colormode == 2) {

        setColor(Monotone(val));
    }

    if (DS.colormode == 3) {
        setColor(stepHue(val));
    }

    if (DS.colormode == 4) {
        setColor(contourLines(val));
    }

    if (DS.colormode == 5) {
        setColor(rainbowLines(val));
    }

    drawSquare(xb, yb, NoiseObj.scale);
}

function tileLoop() {
    let z = 0.1;
    for (let y = 0; y <= canvas.height / NoiseObj.scale; y++) {
        for (let x = 0; x <= canvas.width / NoiseObj.scale; x++) {
            //            let noiseval = _PL.percentage(_PL.OctavePerlin((x + DS.offset.x / 10) / 10, (y + DS.offset.y / 10) / 10, (DS.offset.z / 10) / 10, NoiseObj.octaves, NoiseObj.permenance));
            let noiseval = _PL.percentage(_PL.OctavePerlin((x + DS.offset.x / NoiseObj.magxyz) / NoiseObj.magxyz, (y + DS.offset.y / NoiseObj.magxyz) / NoiseObj.magxyz, (DS.offset.z / NoiseObj.magxyz) / NoiseObj.magxyz, NoiseObj.octaves, NoiseObj.permenance));
            noiseDraw(x * NoiseObj.scale, y * NoiseObj.scale, noiseval);
        }
    }
}
