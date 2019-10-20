// expected to be rendered seperately and not inserted into mapData.map

class animationTile{
    constructor(x=0,y=0,s=32,h=3,w=2){
        this.x = x;
        this.y = y;
        this.scale = s;
        this.h = h;
        this.w = w;
        
        this.frame = 1;
        
        this.infoPanel;
        this.div;
        
        
        this.init();
    }
    
    init() {
        this.div = document.createElement('DIV');
    }
    
    DBreadout(){
        
    }
    
    fixLimits(){
        if (this.frame>1000){
            this.frame = 1;
        }
    }
    
}

//-=-=- TESTING::
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};