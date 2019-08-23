let MsgNodes = {
    tvspeaker: [217, 180],

}
const MN = MsgNodes;

// PERHAPS THIS BECOMES A CLASS FOR CUING INTO CUE ARRAY
function Textbubble(msg = '01234567891', x = 217, y = 180, direction = `DOWN`) {
// default x y position is tv speaker atm
    let text2pixelScale = 6;
    let wordleftpadding = 20;
    let bubblerightpadding = 60;
    let msgw = msg.length;
        
    ctx.save();
    if (direction == `UP`) {
        ctx.translate(0, (y * 2) + 23);
        ctx.scale(1, -1);
    }
    manualBubble(x, y, (text2pixelScale*msgw)+bubblerightpadding);
    ctx.restore();
    writeText(msg, x+wordleftpadding, y + 4, '12px monospace', Pal.floor, Pal.ceiling, 'top', 'left');
}

function manualBubble(x = canvas.width / 2, y = canvas.height / 2, w =128) {
    let bub = {
        w: 100,
        h: 24,
    }
    setColor(`white`);
    setStrokeColor('black');
    ctx.lineWidth = 2;
    roundRect(ctx, x, y, w, bub.h, 8, 'white', 'black');
    superdrawImage(Global.images.ghosttail, 0, 0, 16, 8, x + 2, y + bub.h - 1.5, 32, 16);

}


// TADO - REFACTOR INTO FULL SPEECH SYSTEM::
function RandoRant() {
//    Temp sentance spitter
    //    return TalkingData.Topic.AllIsMath[RNDNum(0,TalkingData.Topic.AllIsMath.length-1)];
    return TalkingData.Topic.FakeNews[RNDNum(0, TalkingData.Topic.FakeNews.length - 1)];
}