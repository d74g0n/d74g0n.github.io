function loadSpriteSheet(path = '/SpriteStrip.png') {

    function setspritesheet() {
        //  global.ctx.drawImage(this, 0, 32, 32, 32, 0, 0, 128, 64);
        global.spirtesheet = this;
    }

    const image = new Image(); // Using optional size for image
    image.onload = setspritesheet; // Draw when image has loaded
    image.src = path;
}

let draw_gradient_top2bot = function ( colorA = 'green', colorB = 'cyan', colorC = 'blue',canvas = global.canvas) {
    // most simple gradient background (wife likes it)
    var ctx = canvas.getContext('2d');
    
    //Up-down gradient (draws line):
    var gradient = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
    
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(.5, colorB);
    gradient.addColorStop(1, colorC);
    
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}