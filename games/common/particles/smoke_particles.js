var parts = [],
    minSpawnTime = 40,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(6000, (canvas.height / (1.5 * 60) * 1000)),
    emitterX = canvas.width / 2,
    emitterY = canvas.height - 10,
    smokeImage = new Image();
smokeImage.src = "/games/common/particles/smoke.png";
//smokeImage.src = "smoke.png";

let animating = true;


function spawn(x, y) {
    emitterX = x;
    emitterY = y;
    if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new smoke(emitterX, emitterY));
    }
}

function smokedraw() {
    var len = parts.length;
//    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (len--) {
        if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
            parts.splice(len, 1);
        } else {
            parts[len].update();

            ctx.save();
            ctx.imageSmoothing = true;
            var offsetX = -parts[len].size / 2,
                offsetY = -parts[len].size / 2;

            ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
            ctx.rotate(parts[len].angle / 180 * Math.PI);
            ctx.globalAlpha = parts[len].alpha;
            ctx.drawImage(smokeImage, offsetX, offsetY, parts[len].size, parts[len].size);
            ctx.restore();
        }
    }
    if (animating) {
        spawn(emitterX, emitterY);
    }

    //    if (animating) {
//    requestAnimationFrame(smokedraw);
    //    }

}

class smoke {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;

        this.size = 1;
        this.startSize = 18;
        this.endSize = 128;

        this.angle = Math.random() * 359;

        this.startLife = new Date().getTime();
        this.lifeTime = 0;

//        this.velY = -1 - (Math.random() * 0.5);
        this.velY = 0.5 * (Math.random() * 0.5);
        this.velX = Math.floor(Math.random() * (-6) + 3);
//        this.velX = Math.floor(Math.random() * (-6)+1);
        //        this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
    }
}
smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;

    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

    this.alpha = 1 - (lifePerc * .01);
    this.alpha = Math.max(this.alpha, 0);

    this.x += this.velX/10;
    this.y += this.velY/10;
}

//smokeImage.src = "http://somethinghitme.com/projects/particle%20test/images/smoke.png";
//spawn(320, 380);
spawn(canvas.width/2, canvas.height/2);
//spawn(canvas.width/2, canvas.height);
//smokedraw();

document.onclick = function () {
    animating = !animating;
}


console.log(`loaded`);
