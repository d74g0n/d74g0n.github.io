// needs to manage its fade out and timings;
// if message is empty then fade out etc/ dont render
// need calc - look at self make adjustments.

class TextBubbles {
    constructor() {
        this.id = 'TextBubbles';
        this.v = 'versionB';
        this.x = 0;
        this.y = 0;
        this.msg = ``;
        this.image = undefined;

        this.loadImage();
    }

    tick() {
        //        ctx.save();
        this.textbubble(this.msg, this.x, this.y, `DOWN`);
        //        ctx.restore();
    }

    say(msg = this.msg, x = this.x, y = this.y) {
        this.msg = msg;
        this.x = x;
        this.y = y;

        //        ctx.save();
        this.textbubble(this.msg, this.x, this.y, `DOWN`);
        //        ctx.restore();
    }

    writeText(string = 'oops', scaleX = canvas.width / 2, scaleY = 170, font = `monospace`, fillStyle = 'red', strokeStyle = 'gold', textBaseline = 'top', textAlign = 'center') {

                ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillText(string, scaleX, scaleY);
        ctx.strokeText(string, scaleX, scaleY);
                ctx.restore();
        // REMEMBER SHADOWING?
    }

    textbubble(msg = '01234567891', x = 217, y = 180, direction = `DOWN`) {
        // default x y position is tv speaker atm
        ctx.save();
        let text2pixelScale = 6;
        let wordleftpadding = 20;
        let bubblerightpadding = 60;
        let msgw = msg.length;
        if (direction == `UP`) {
            ctx.save();
            ctx.translate(0, (y * 2) + 23);
            ctx.scale(1, -1);
            ctx.restore();
        }

        this.manualBubble(x, y, ((text2pixelScale * msgw) + bubblerightpadding));
        this.writeText(msg, x + wordleftpadding, y + 4, '12px monospace', '#674e0f', '#4d4d4d', 'top', 'left');
        ctx.restore();
    }

    manualBubble(x = canvas.width / 2, y = canvas.height / 2, w = 128) {
        let bub = {
            w: 100,
            h: 24,
        }
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothing = false;
        //        ctx.save();        
        setColor(`white`);
        setStrokeColor('black');
        ctx.lineWidth = 2;
        roundRect(ctx, x, y, w, bub.h, 8, 'white', 'black');
        //        ctx.restore();

        //        ctx.save();
        //        ctx.imageSmoothingEnabled = false;
        //        ctx.imageSmoothing = false;
        superdrawImage(this.image, 0, 0, this.image.width, this.image.height, x + 4, y + bub.h - 2, this.image.width * 2, this.image.height * 2);

        //        ctx.restore();
        //        ctx.imageSmoothingEnabled = true;

    }

    loadImage(path) {
        this.image = new Image();
        this.image.src = `class/TextBubble.png`;
        this.image.onload = function () {
            console.log(`TextBubbleLoaded`);
        }
    }


}


let TB = new TextBubbles();
