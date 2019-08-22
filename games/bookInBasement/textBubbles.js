let MsgNodes = {
    tv: [164, 150],

}
const MN = MsgNodes;

// PERHAPS THIS BECOMES A CLASS FOR CUING INTO CUE ARRAY
function Textbubble(msg = '01234567891', x = 164, y = 150, direction = `DOWN`) {
    let bubscale = 1;
    if (msg.length > 13) {
        bubscale = msg.length / 10;
        x -= bubscale*10;
        bubscale *= 0.666;
    }
    
    if (bubscale >= 3){
        bubscale = 2.7;
    }
    
//    console.log(`bubscale= ${bubscale}`);
//    bubscale *= 0.95;
 
    ctx.save();
    if (direction == `UP`) {
        ctx.translate(0, (y * 2) + 23);
        ctx.scale(1, -1);
    }
//    superdrawImage(Global.images.speecha, 0, 0, 600, 147, x-(5*bubscale), y, (128 * bubscale)-16, 32);
    GlobalAlpha(0.7);
    superdrawImage(Global.images.speecha, 0, 0, 600, 147, x-(5*bubscale)-8*bubscale, y, (128 * bubscale)+16*bubscale, 40);
    GlobalAlpha(1);
    ctx.restore();
    writeText(msg, x + (64 * bubscale)-(5*bubscale), y + 4, '18px serif', Pal.floor, Pal.ceiling, 'top', 'center');
//    writeText(RandoRant(), x + (64 * bubscale)-6, y + 3, '18px serif', Pal.floor, Pal.ceiling, 'top', 'center');
}

function RandoRant(){
//    return TalkingData.Topic.AllIsMath[RNDNum(0,TalkingData.Topic.AllIsMath.length-1)];
    return TalkingData.Topic.FakeNews[RNDNum(0,TalkingData.Topic.FakeNews.length-1)];
}