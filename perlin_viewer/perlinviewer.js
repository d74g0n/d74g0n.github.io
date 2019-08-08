const global = {};

let NoiseObj = {
    octaves: 1,
    permenance: 0,
    scale: 8,
    x: 1,
    y: 1,
    z: 1,
    magxyz: 10,
};

let DisplaySettings = {
    pixelscale: 10,
    colormode: 1,
    offset: {
        x: 0,
        y: 0,
        z: 0
    },
}
const DS = DisplaySettings;

function applyMag() {
    return (10 ** NoiseObj.magxyz);
}

function reRange(val, rng) {
    return Perl.percentage(val, rng);
}

function getnoiseVal(x = 1, y = 1, z = 1, o = 1, p = 1) {
    let val = Perl.OctavePerlin(x / 10, y / 10, z / 10, o, p);
    console.log(`reRange: ${reRange(val, 1000).toFixed(0)}`);
    console.log(`getnoiseVal: ${val.toFixed(4)}`);
    return val;
}

function OneBecomes255(val) {
    return Perl.percentage(val);
}

function ListKeysHTML(dataobj) {
    let finaloutput = '<hr>';
    finaloutput += `DO = { `;
    for (const [key, value] of Object.entries(dataobj)) {
        finaloutput += `${key}: ${value},<br>`;
    }
    finaloutput += `}`;
    return finaloutput;
}

let counter = 1;
function loop() {
    counter++;
    console.log(`counter: ${counter}`);
    getnoiseVal(counter);
}
