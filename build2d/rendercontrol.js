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


    //clear Bottom::
    //    ground('#048', '#08f', '#048');
    ground('#030', '#050', '#030');



}




clog('setdesign.js');
