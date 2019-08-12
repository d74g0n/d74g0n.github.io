function background(color) {
    ctx.fillStyle = color;
    return ctx.fillRect(0, 0, canvas.width, canvas.height)
}

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

function RNDBool(){
    let random_boolean = Math.random() >= 0.5;
    return random_boolean;
}

function RNDNum(min,max){
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}


console.log(`commonctx loaded`);
