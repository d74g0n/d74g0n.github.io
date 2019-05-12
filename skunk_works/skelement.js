// this is a canvas thing

class skelement {
    // builds the display screen to use with global.ctx:
    constructor(h = '400px', w = '600px', bg = 'skyblue', border = '2px solid gold') {
        console.log('skunk_works - constructor');
        let display = document.createElement('canvas');
        display.id = 'sprite_works';
        document.body.appendChild(display);
        global.canvas = document.getElementById('sprite_works');
        let style = document.getElementById('sprite_works').style;
        style.position = 'absolute';
        style.display = 'block';
        //        style.height = '128px';
        //        style.height = h;
        //                style.height = 'auto';
        //        style.width = w;
        //        style.width = 'auto';
        style.background = bg;
        style.border = border;
        style.margin = 'auto';
        style.left = '0';
        style.right = '0';
        style.top = '100px';
        global.ctx = document.getElementById('sprite_works').getContext('2d');
        global.ctx.imageSmoothingEnabled = false;
        let height = document.documentElement.clientHeight - 16;
        let width = document.documentElement.clientWidth - 16;
        var min_size = height < width ? height : width;
        global.ctx.canvas.height = min_size;
        global.ctx.canvas.width = min_size;
        /*        this.adjustElementSize = function(w = window.innnerWidth + 'px', h = window.innerHeight + 'px') {
                    this.height = h;
                    this.width = w;
                    let style = document.getElementById('sprite_works').style;
                    style.height = h;
                    style.width = w;
                    console.log(`[skunk_works][resize][${w}x${h}]`);
                }*/
    }

}
