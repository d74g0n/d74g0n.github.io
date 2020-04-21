/*NOTES

hook up SEED

the light offset needs:
- moved into control nob
- to be aligned left/reset every floor!!!

- nobup outlines
- nobup colors

*/


let perllightsframe = 0;
let lightsOffset = 0;

let buildings = {
    outline: false,
    fillIncrement: 1.5,
    lights:{
        style: 2,
        offFactor: 0.55,
        whiteFactor: 0.50,
        noiseCheck: false,
        panCheck: true,
        o: 2,
        p: 1,
        speed: 0.1,
        buildOffsetX: 0,
        pos: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
}

function lowerOffThreshold(factor = 0.01){
    buildings.lights.offFactor -= factor;
    if (buildings.lights.offFactor< 0.20||buildings.lights.offFactor>1){
         buildings.lights.offFactor = 0.50;
    }
}


function getNums(x, y, z = 5.5) {
  
    //scrolls windows left::
    x-= river.frame/100;
    //matrix rain::
//    y+= river.frame/10;
    //waterfall::
//    y+= river.frame;
    // I dunno::
//    z+= river.frame/10000;
    
    let dials = {
        o: buildings.lights.o,
        p: buildings.lights.p,
    }
    let pval = Perl.OctavePerlin(x, y, z, dials.o, dials.p);
    
    if (buildings.lights.noiseCheck){
           return `rgba(${Perl.OctavePerlin(x, y, z, dials.o, dials.p)*255},${Perl.OctavePerlin(x, y, z, dials.o, dials.p)*255},${Perl.OctavePerlin(x, y, z, dials.o, dials.p)*255},1)`;
    }
    
    //style 1
    if (pval.toFixed(2) == buildings.lights.whiteFactor && buildings.lights.style >= 1) {
        return `rgba(225,255,255,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)*2})`;
    }

    //style 2
    if (pval.toFixed(2) > buildings.lights.offFactor && buildings.lights.style > 1) {
        return `rgba(255,255,55,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)})`;
    } 
    
    //lights-OFF default:
    return `rgba(0,0,0,${Perl.OctavePerlin(x, y, z, dials.o, dials.p)})`;

}


function addPerlBuildingFill(px = 0, py = 0, pz = 0) {

    skyctx.fillStyle = skyBackground(skyGradientV());
    skyctx.fillRect(0, 0, buffers.sky.width, Math.floor(buffers.sky.height / 2));

    let bgrise = 2;
    let increment = 0.10;
    let newOff = 0;
    skyctx.globalAlpha = 0.5;
    bFillOffSet = newOff;
    for (y = 0; y < 2; y++) {
//        py * 0.2;
        for (x = 0; bFillOffSet <= buffers.sky.width; x++) {
            newOff = perlbuilding(px + (bFillOffSet * increment), py + y, pz, bFillOffSet,1.7);
            bFillOffSet += newOff + 2;

            py += x + 1.102;
        }
        skyctx.globalAlpha += 0.4;
//                increment += 0.07;
        bFillOffSet = -10;

        
    }
    buildings.lights.buildOffsetX = 0;
}

function perlbuilding(x = 0, y = 0, z = 1, xleft = 2, perlXoffset = 0.45) {
    
//    x+= perlXoffset;//WIP
//    z+= river.frame; //WIP
    
    bgctx.save();
    let ctx = skyctx;
    //        let ctx = bgctx;
    let base = buffers.bg.height / 2;
    let scalew = 64;
    let scaleh = scalew * 3.5;
//    let zdata = {
//        w: Perl.OctavePerlin(x, y, 1.02+river.frame/10000, 1, 1),
//        h: Perl.OctavePerlin(x, y, 1+river.frame/10000, 1, 1),
//    }
    
    let zdata = { // hook to seed shit.
        w: Perl.OctavePerlin(x, y, 1.58, 4, 3),
        h: Perl.OctavePerlin(x, y, 1, 4, 3),
    }

    let cols = {
        base: '#000',
    }
    let window = {
        w: 4,
        h: 2,
        padding: 2,
    }
    let floor = {
        h: 4,
    }
    let building = {
        l: xleft,
        w: zdata.w * scalew,
        h: zdata.h * scaleh,
        floors: undefined,
        winx: undefined,

    }
    building.floors = Math.floor(building.h / floor.h);
    const b = building;
    //        console.log(`floors:${building.floors}`);
    let bottop = base - (floor.h);

    //stroke debugshit
    function b_outline() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
//        ctx.strokeRect(xleft, base - (zdata.h * scaleh), zdata.w * scalew, zdata.h * scaleh);
        ctx.strokeRect(Math.floor(xleft), Math.floor(base - (zdata.h * scaleh)), Math.floor(zdata.w * scalew), Math.floor(zdata.h * scaleh));
    }
    
    if (buildings.outline){
        b_outline();
        }

    function b_basics() {
        //silloutte::
        ctx.fillStyle = cols.base;
        ctx.fillRect(Math.floor(xleft), Math.floor(base - (zdata.h * scaleh)), Math.floor(zdata.w * scalew), Math.floor(zdata.h * scaleh));
        //entrance floor::
        ctx.fillStyle = 'black';
        ctx.fillRect(Math.floor(xleft - window.padding), Math.floor(bottop), Math.floor(building.w + window.padding * 2), Math.floor(floor.h));
    }
    b_basics();

    let windowcanvaswidth = Math.floor(building.w - (window.padding * 4));
    let winbuildorder = Math.floor(windowcanvaswidth / (window.w + window.padding));
    let sidepadding = (building.w - windowcanvaswidth) / winbuildorder + 2;




    //draw perlin lights::
    for (iy = 2; iy <= building.floors - 2; iy++) {
        for (i = 0; i <= winbuildorder; i++) {
            ctx.fillStyle = getNums(buildings.lights.buildOffsetX+i + lightsOffset, iy);
            ctx.fillRect(Math.floor(building.l + sidepadding / 2 + (window.padding + window.w) * i), Math.floor(base - (floor.h * iy) - 2), Math.floor(window.w), Math.floor(window.h));
//            ctx.fill();
            
            perlXoffset+= 0.7;
        }
    }
 buildings.lights.buildOffsetX+= 0.05;
    bgctx.restore();

    // PANNING THE LIGHTS::
    lightsOffset += 0.000010;
    if(buildings.lights.panCheck){
        lightsOffset += 0.0001;
    }
    
    return building.w;

}
