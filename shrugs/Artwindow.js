// simple canvas mgmt constructor:

class Artwindow {
    constructor(parentelm, bg = 'orange', width = undefined, height = undefined, id = 'artwindow', border = 'none') {
        this.anchorid = parentelm;
        this.id = id;
        this.bg = bg;
        this.border = border;

        this.width = width;
        this.height = height;
    }

    whoami() {
        console.log(this);
        return this;
    }
    
    help(){
        console.log('-=[ Artwindow.js - quick chainable canvas system');
        console.log(`ex: a.setBackground('black').setwidth(400).setheight(400).setBorder('1px dotted green');`);
        return this;
    }

    init() {
        // create canvas element:
        this.elm = document.createElement("CANVAS");

        // give it id:
        this.elm.id = this.id;

        this.elm.style.background = this.bg;
        this.elm.style.border = this.border;
        this.elm.drraggable = 'true';

        // get 2dcontext:
        this.ctx = this.elm.getContext('2d');
        
        // Find Parent Element for placement:
        if (document.getElementById(this.anchorid)) {
            this.paremtelm = document.getElementById(this.anchorid);
        } else {
            console.log('[Artwindow.js][Anchor]=>[BODY tag used]');
            this.paremtelm = document.body;
        }
        // Append canvas to Parentelm:
        this.paremtelm.appendChild(this.elm);

        if (this.width) {
            this.elm.width = this.width;
        } else {
            this.elm.width = window.innerWidth; // - this.elm.style.borderWidth;
            this.width = window.innerWidth;
        }

        if (this.height) {
            this.elm.height = this.height;
        } else {
            this.elm.height = window.innerHeight - 8; // - this.elm.style.borderWidth;
            this.height = window.innerHeight - 8;
        }

        console.log(`[Artwindow.js][window_created][id:"${this.id}"]`);
        return this;

        
    }

    getctx() {
        return this.ctx;
    }
    
    getcanvas() {
        return this.elm;
    }

    setheight(val) {
        this.elm.height = val;
        return this;
    }

    setwidth(val) {
        this.elm.width = val;
        return this;
    }

    setBorder(val) {
        this.elm.style.border = val;
        return this;
    }

    setBackground(val) {
        this.elm.style.background = val;
        return this;
    }

    setStyle(key, value) {
        this.elm.style[key] = value;
        return this;
    }

}

console.log('[Artwindow.js Loaded]=>[fire at will]');
