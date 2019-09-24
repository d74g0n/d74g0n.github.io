//let f = new FontFace('8-bit', '/common/fonts/8bitOperatorPlus-Regular.ttf');


function centerDraw(image, s = 1) {
    //    ctx.drawImage(image,dx,dy,dw,dh);
    //    middleofcanvas::
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let ix = image.width * s / 2;
    let iy = image.height * s / 2;

    let left = cx - ix;
    let top = cy - iy;


    //    ctx.fillStyle = "black";
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.globalAlpha = 0.8;
    ctx.rect(left, top, image.width * s, image.height * s);
    ctx.fill();
    ctx.globalAlpha = 1;

    //    ctx.clearRect(left,top,image.width*s,image.height*s);
    ctx.drawImage(image, left, top, image.width * s, image.height * s);
}


function clearCanvas() {
    return ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function background(color) {
    ctx.fillStyle = color;
    return ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawImage(img, x, y) {
    ctx.drawImage(img, x, y, img.width, img.height);
}

function superdrawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {
            tl: radius,
            tr: radius,
            br: radius,
            bl: radius
        };
    } else {
        var defaultRadius = {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

function writeText(string = 'oops', scaleX = canvas.width / 2, scaleY = 170, font = f, fillStyle = 'red', strokeStyle = 'gold', textBaseline = 'top', textAlign = 'center') {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(string, scaleX, scaleY);
    ctx.strokeText(string, scaleX, scaleY);
    // REMEMBER SHADOWING?
}

function strokeRect(x = 100, y = 100, w = 100, h = 100, color = 'black') {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.strokeRect(x + 0.5, y + 0.5, w, h);
    ctx.stroke();
}


function GlobalAlpha(num = 1) {
    ctx.globalAlpha = num;
}

function Shadow(shadowBlur = 2, shadowColor = 'white', shadowOffsetX = 1, shadowOffsetY = 1) {
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
}

function clrShadow(color = 'rgb(255,0,255)') {
    // 'greenscreen-pink' used as debugging detector; 
    // finalize perhaps we go green or transparent.
    Shadow(0, color, 0, 0);
}

function setColor(color) {
    return ctx.fillStyle = color;
}

function setStrokeColor(color) {
    return ctx.strokeStyle = color;
}

function drawSquare(x, y, scale) {
    ctx.fillRect(x, y, scale, scale);
}

function strokeSquare(x, y, scale) {
    ctx.strokeRect(x, y, scale, scale);
}

function strokeRect(x,y,w,h){
     ctx.strokeRect(x,y,w,h);
//    ctx.stroke();
}

function drawRect(x, y, w, h) {
    return ctx.fillRect(x, y, w, h);
}
// game specific me thinks:
function drawGround(y) {
    return ctx.fillRect(0, y, canvas.width, canvas.height - y);
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function fillCicle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

//function sSq(x, y, color = 'rgba(255,255,255,1)') {
function sSq(x, y, color = 'green') {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.strokeRect(x + 0.5, y + 0.5, global.scale - 1, global.scale - 1);
    ctx.stroke();
}
// -=-=-=-=-=-=-=-

//function gradientV(colorA = 'black', colorB = 'blue', colorC = 'skyblue') {
function gradientV(colorA = '#100077', colorB = 'skyblue', colorC = 'black') {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.7, colorB);
    gradient.addColorStop(1, colorC);
    ctx.fillStyle = gradient;
    //ctx.fillRect(10, 10, 200, 100);
    return gradient;
    //background(gradient);
}

function gradientH(colorA = 'black', colorB = 'blue', colorC = 'skyblue') {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.7, colorB);
    gradient.addColorStop(1, colorC);
    ctx.fillStyle = gradient;
    //ctx.fillRect(10, 10, 200, 100);
    return gradient;
    //background(gradient);
}

function makeGradient(colorA='red', valueA=0, colorB='white', valueB=0.5, colorC='blue', valueC=1, direction = 'V',scale=RP.tv.height, o = 0) {
    // valid direction values: H/V Horizontal / Vertical
    let gradient;
    switch (direction) {
        case `V`:
//            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient = ctx.createLinearGradient(0, o, 0, scale);
            break;
        case `H`:
            gradient = ctx.createLinearGradient(o, 0, scale, 0);
            break;
        default:
            return console.log(`ERROR - makeGradient - Incorrect direction value`);
    }

    gradient.addColorStop(valueA, colorA);
    gradient.addColorStop(valueB, colorB);
    gradient.addColorStop(valueC, colorC);
//debugger
    ctx.fillStyle = gradient;
//    ctx.fillRect(10, 10, 200, 100);
//    
    return gradient;
}


function drawLine(xa, ya, xb, yb) {
    ctx.beginPath();
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
    ctx.stroke();
}

function horizontalLine(y) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
}

function drawline(x, y, xb, yb) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xb, yb);
    ctx.stroke();
}

//=-=-=-=-=-=-=-=-

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

function fillCheckerboard(x, y) {
    //    CHECKER LOGIC
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
}


function fillGrass(x, y, m) {

    let noise = Perl.noise((rndSeed + x) / m, (rndSeed + y) / m, 5 / m);
    if (noise > 100) {
        // GRASS LEVEL
        setColor(`rgb(0,${noise/3},0)`);

        if (noise > 100 && noise < 110) {
            setColor(`rgba(${noise/1},${noise/1},${noise/2},1)`);
        }

        if (Math.floor(noise).toFixed(0) == 130) {
            setColor('black');
        }

        if ((noise).toFixed(0) % 10 == 0 && Math.floor(noise).toFixed(0) > 130) {
            setColor('black');
        }

        global.tiles.grass++;
    } else {
        // WATER LEVEL
        setColor(`rgb(0,0,${noise/2})`);
        global.tiles.water++;
    }


}
console.log(`/g/c/drawing.js loaded`);
