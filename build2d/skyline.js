function skyBackgroundOrig(color) { // TOP HALF ONLY SKYCTX
    skyctx.save();
    skyctx.globalAlpha = 0.5;
    skyctx.fillStyle = color;
    skyctx.fillRect(0, 0, buffers.sky.width, buffers.sky.height / 2);
    skyctx.globalAlpha = 1;
    skyctx.restore();
}

function skyBackground(color) { // TOP HALF ONLY SKYCTX
    bgctx.save();
    bgctx.globalAlpha = 0.5;
    bgctx.fillStyle = color;
    bgctx.fillRect(0, 0, buffers.sky.width, buffers.sky.height / 2);
    bgctx.globalAlpha = 1;
    bgctx.restore();
}

function skyGradientV(colorA = '#100077', colorB = 'skyblue', colorC = 'black') {
    let gradient = skyctx.createLinearGradient(0, 0, 0, buffers.sky.height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.7, colorB);
    gradient.addColorStop(1, colorC);
    skyctx.fillStyle = gradient;
    return gradient;
}

function skyGradientH(colorA = 'black', colorB = 'blue', colorC = 'skyblue') {
    let gradient = skyctx.createLinearGradient(0, 0, buffers.sky.width, 0);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.7, colorB);
    gradient.addColorStop(1, colorC);
    skyctx.fillStyle = gradient;
    return gradient;
}

function setColor(color) {
    return skyctx.fillStyle = color;
}

function drawRect(x, y, w, h) {
    return skyctx.fillRect(x, y, w, h);
}

function RNDBool() {
    let random_boolean = Math.random() >= 0.5;
    return random_boolean;
}

function RNDNum(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}

ctx.imageSmoothingEnabled = false;
let colorscheme = {
    steel: 'grey',
    metal: 'lightgrey',
}

let GeoData = {
    horizonY: (buffers.sky.height / 2) - 6,
    top: 1024,
    yoffset: 0,
};
const GD = GeoData;

function buildingABasic(x, w, h) {

    let Building = {
        id: 'tallboy',
        windowpad: 2,
        Top: GD.horizonY - h - GD.yoffset,
    }
    const B = Building;

    if (h > GD.top) {
        h = GD.top;
    }
    let bTop = GD.horizonY - h;

    //base
    setColor('black');
    drawRect(x, B.Top, w, h);

    //windows
    let windowY = B.top + 4;
    let floorHeight = 4;
    let doorHeight = 4;
    let lightcolor = 'rgba(156,156,156,1)';

    for (let floors = (h / 4); floors > doorHeight; floors--) {
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
        } else {
            setColor('black');
        }
        drawRect(x + 2, B.Top + 4 + floorHeight, w / 3 - 4, 2);
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
        } else {
            setColor('black');
        }
        drawRect(x + 2 + (w * .2), B.Top + 4 + floorHeight, w / 3 - 4, 2);
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
            //             setColor(lightcolor);
        } else {
            setColor('black');
        }
        drawRect(x + 2 + (w * .4), B.Top + 4 + floorHeight, w / 3 - 4, 2);
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
            //              setColor(lightcolor);
        } else {
            setColor('black');
        }
        drawRect(x + 2 + (w * .6), B.Top + 4 + floorHeight, w / 3 - 4, 2);

        floorHeight += 4;

        if (B.top + 4 + floorHeight >= GD.horizonY - 100) {
            floors = -100;
        }

    }

    //console.log(`BTOP-${(GD.horizonY - h)}`);
    if (GD.horizonY - h <= 50) {

        // un-hardcode color for twinkle:
        // airplane saftey lights:
        fillCircle(x + (w * .1), bTop, w / 15, 'red');
        fillCircle(x + (w * .5), bTop, w / 15, 'red');
        fillCircle(x + (w * .9), bTop, w / 15, 'red');

        fillCircle(x + (w * .1), bTop, w / 25, 'white');
        fillCircle(x + (w * .5), bTop, w / 25, 'white');
        fillCircle(x + (w * .9), bTop, w / 25, 'white');
    }
}

function windowLight(val = '50') {
    return `rgba(255,255,${val},1)`;
}

function RNDBool() {
    let random_boolean = Math.random() >= 0.5;
    return random_boolean;
}

function RNDNum(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}

function drawcity() {

    function WIP(x = -10, w = 20) {
        let h = 180; //REFACTOR - FUTURE: PEARL height
        let minBheight = 30; // isn't this handled by doorheight?
        buildingABasic(x, w, h - RNDNum(0, h - minBheight));
    }
    //drawbasesky:
    skyBackground(skyGradientV());
    let w = 10 + RNDNum(5, 15); // PERLIN WIDTH
    // ALL RND CONVERTS TO PERLIN INPUTS:
    for (let x = (RNDNum(-25, -5)); x < buffers.sky.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
    }
    ctx.globalAlpha = 0.5;
    skyBackground(skyGradientV());
    ctx.globalAlpha = 1;

    GD.horizonY += 2;

    for (let x = (RNDNum(-25, -5)); x < buffers.sky.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
    }

    ctx.globalAlpha = 0.5;
    skyBackground(skyGradientV());
    ctx.globalAlpha = 1;

    GD.horizonY += 5;

    for (let x = (RNDNum(-20, -10)); x < buffers.sky.width; x += w + 2) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);

    }
    setColor('black');
    //    GD.horizonY = Math.floor(buffers.sky.height * 0.7); // reset horizon
    GD.horizonY = Math.floor((buffers.sky.height / 2) - 6); // reset horizon
}


console.log(`skyline garbage loaded`);
