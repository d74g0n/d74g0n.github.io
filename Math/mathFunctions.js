function smoothStepSimple(x = 0.001) {
    // smoothstep::
    // https://www.youtube.com/watch?v=60VoL-F-jIQ
    // my desmos::
    // https://www.desmos.com/calculator/czfoy3gd9y 

    let k = Math.max(0, Math.min(1, x));
    //    let scale = 0.2;
    //    k = Math.max(0, Math.min(1, (x-startslider)/(endslider-startslider);
    return Math.pow(k, 2) * (3 - (2 * k)) // * scale;
}


function smoothStepTolerance(x = 0.01, scale = 2, t1 = 0, t2 = 1) {
    let k = Math.max(0, Math.min(1, (x - t1) / (t2 - t1)));
    return Math.pow(k, 2) * (3 - (2 * k)) * scale;


}


function smoothStepTarget(x = 0.01, n = 0) {
    //    let k = Math.max(0, Math.min(1, Math.abs(x - n)));
    let k = Math.max(0, Math.min(1, (x - n)));
    return Math.pow(k, 2) * (3 - (2 * k));
}

let RAM = {
    frame: 0,
    inc: 0.05,
    incval: 0,
}





let runTimer = setInterval(testLoop, 1000 / 10);

function testLoop() {

    RAM.frame++;
    RAM.incval += RAM.inc;
    //    console.log(smoothStepSimple(Math.sin(RAM.incval) * 2));
    //    console.log(smoothStepTolerance(Math.sin(RAM.incval) * 2));
    //    console.log(smoothStepTolerance(Math.sin(RAM.incval) * 1));
    console.log(smoothStepTarget(Math.sin(RAM.incval) * 2.2));
    //    console.log(smoothStepTolerance(Math.sin(RAM.frame) * 1));




}
