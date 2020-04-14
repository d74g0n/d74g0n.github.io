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
        function basicsky() {
            skyctx.fillStyle = nature_state.sky;
            skyctx.fillRect(0, 0, buffers.bg.width, buffers.bg.height / 2);
        }

        if (nature_state.buildskyonlyonce) {
            nature_state.buildskyonlyonce = false;
            drawcity();
        }


        transferSkytoBG();
    }

    sky();


}




clog('setdesign.js');
