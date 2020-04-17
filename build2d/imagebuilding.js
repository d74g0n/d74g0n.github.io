let nature_state = {
    sky: "blue",
    ground: "rgba(0, 22, 0, 1)",
    buildskyonlyonce: true,
}

function transferSkytoBG() {
    // skybuffer transfered to bg buffer
    bgctx.drawImage(buffers.sky, 0, 0, buffers.bg.width, buffers.bg.height, 0, 0, buffers.bg.width, buffers.bg.height);
}

function build_bgbuffer() {
    function ground() {
        hgrad(buffers.bg, bgctx, "#010", "#050", "#010");
        bgctx.fillRect(0, buffers.bg.height / 2, buffers.bg.width, buffers.bg.height / 2);
        bgctx.font = "30px Tiny";
    }
    ground();

    function sky() {
        skyBackground(skyGradientV());
    }

    function solidCity() {
        if (nature_state.buildskyonlyonce) {
            nature_state.buildskyonlyonce = false;
            skyctx.save();
            skyctx.globalAlpha = 1;
            drawcity();
            skyctx.restore();
        }
        transferSkytoBG();
    }

    function fadeCity() {
        if (nature_state.buildskyonlyonce) {
            skyctx.save();
            skyctx.globalAlpha = 0.5;
            drawcity();
            skyctx.restore();
        }
    }

    sky();
    //    fadeCity();
    fadeCity();
    solidCity();



}




clog('setdesign.js');
