        function drawBG() {
            ctx.globalAlpha = 0.1;
            drawSet(); // in set.js
        }

        function linerope(fsine, yoff = 0) {

            ctx.globalAlpha = 1;

            let ropelength = 100;

            let pivot = {
                x: canvas.width / 2,
                y: 25,
            };
            let char = {
                x: pivot.x + (fsine * 1.8),
                y: pivot.y + yoff + 100 - ((Math.pow(fsine, 2)) / 100),
            };

            ctx.fillStyle = "black";
            drawline(pivot.x, pivot.y, char.x, char.y);

            ctx.save();

            let charwidth = 10;
            let charheight = 30;

            ctx.translate(char.x - (charwidth / 2), (char.y - charheight / 3));

            let rotateamount = 250;
            ctx.rotate(fsine / rotateamount);

            ctx.fillStyle = 'yellow';
            ctx.fillRect(0, 0, charwidth, charheight);

            ctx.restore();
        }
        linerope();
