function background(color) {
    ctx.fillStyle = color;
    return ctx.fillRect(0, 0, canvas.width, canvas.height)
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
    ctx.Rect(x, y, scale, scale);
}

function drawRect(x, y, w, h) {
    return ctx.fillRect(x, y, w, h);
}

function drawGround(y){
    return ctx.fillRect(0,y,canvas.width,canvas.height-y);
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function fillCicle(x,y,r,color){
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


function horizontalLine(y) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
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

function fillCheckerboard(x,y){
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


function fillGrass(x,y,m){
    
    let noise = Perl.noise((rndSeed+x)/m,(rndSeed+y)/m,5/m);
    if (noise > 100){
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
    }else{
        // WATER LEVEL
        setColor(`rgb(0,0,${noise/2})`);
        global.tiles.water++;
    }

    
}
console.log(`/g/c/drawing.js loaded`);
