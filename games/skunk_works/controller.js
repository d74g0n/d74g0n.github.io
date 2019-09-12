let debugging = false;
let verbosity = false;

const clog = function (msg) {
    if (verbosity) {
    return console.log(msg);
    }
}

class web_controls {
    constructor(char) {
        function jump() {
            if (!char.isJumping) {
                char.vy = char.vy - char.jumppwr;
            }
            char.isJumping = true;
            clog('Jump was pressed space')
        }

        document.addEventListener('keydown', function (event) {
            if (event.keyCode == 65) {
                clog('Left was pressed A');
                char.vx = char.vx - char.speed;
                char.isLeft = true;
            } else if (event.keyCode == 83) {
                clog('Down was pressed S');
                char.y = char.y + 2;
            } else if (event.keyCode == 87) {
                clog('Up was pressed W');
                jump();
            } else if (event.keyCode == 68) {
                clog('Right was pressed D');
                char.vx = char.vx + char.speed;
                char.isLeft = false;
            } else if (event.keyCode == 32 && !event.shiftKey) {
                jump();
            } else if (event.keyCode == 32 && event.shiftKey) {
                global.draw_scale = global.draw_scale * 1.01;
                clog('Jump was pressed space')
            }

            if (debugging) {
                console.log(JSON.stringify(event.keyCode));
                console.log(JSON.stringify(event));
                console.log(char.y);
            }
        });


    }




}
