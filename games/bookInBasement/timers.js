let timeINpieces = {
    tick: function (frame){
        this.framesync = frame;
        this.endlesscount++;
        this.limits();
//        console.log(this.endlesscount);
    },
    limits: function (){
        if (this.endlesscount >= 120000000){
            this.endlesscount = 0;
            this.endlesseons++;
            console.log(`EON TICKED ${this.endlesseons}`);
        }
    },
    modoloTruth: function (modnum) {
        if (this.endlesscount % modnum == 0){
            return true;
        }else{
            return false;
        }
    },
    
    framesync: undefined,
    endlesseons: undefined,
    endlesscount: 0,
    readoutData: function(){
        console.log(`tips dataobject readoutout`);
        console.log(`endlessEONS: ${this.endlesseons}`);
        console.log(`endlesscount: ${this.endlesscount}`);
        
    },
}

const tip = timeINpieces;


//timeINpieces.tick(20);