class tdhero {
    constructor(x = canvas.width / 2, y = canvas.height / 2, id = `topddownhero`) {
        this.x = x;
        this.y = y;
        this.id = id;

        //        this.s = 16;
        this.s = 16;


        this.body = {
            head: 2,
            width: 3,
            arm: 1,
            footW: 0.5,
        };


        this.inventory = [];
        this.r = 0;


        //        this.animation = {
        //            frame:[
        //                
        //            ],
        //        }
    }

    readout() {
        console.log(this);
    }


    head() {
        //head
        ctx.fillStyle = `#FFDDAA`;
        let headLeft = this.x - (this.body.head * this.s) / 2;
        let headTop = this.y - (this.body.head * this.s) / 2;
        let headSize = this.s * this.body.head;

        let headnoise = this.s / 2;

        fillRect(headLeft, headTop - headnoise, headSize, headSize);

    }

    hair() {
        //hairhead
        ctx.fillStyle = `#073399`;
        let headLeft = this.x - (this.body.head * this.s) / 2;
        let headTop = this.y - (this.body.head * this.s) / 2;
        let headSize = this.s * this.body.head;

        let headnoise = this.s / 2;

        fillRect(headLeft, headTop - headnoise, headSize, headSize / 2);
    }

    mouth(openness = 0.1) {
        
//        openness = Math.random();
        openness = this.s/180;
                if (openness>1){
            openness = 1;
        }
        ctx.fillStyle = `#000000`;
//        ctx.fillStyle = `#d8d7dd`;
        let headSize = this.s * this.body.head;
        let headLeft = this.x - (this.body.head * this.s) / 2;

        let headBottom = this.y + (this.body.head * this.s/2) / 2;
        let mouthTop = headBottom - (this.s/2);;
        let mouthleft = this.x - ((openness/2)*this.s);
        
//        fillRect(mouthleft, mouthTop+this.s/10, openness*this.s, openness*this.s/4);
//        fillRect(mouthleft, mouthTop+this.s/8, openness*this.s, openness*this.s/4);

        fillRect(mouthleft, mouthTop, openness*this.s, openness*this.s/4);

    }

    feet() {
        ctx.fillStyle = `#DD7744`;

        let footsizeW = this.body.footW * this.s;
        let bodyleft = this.x - ((this.body.width * this.s) / 2);
        let footLeft = bodyleft + (footsizeW / 2);

        let beltLine = this.y + ((this.body.width / 2) * this.s) / 2;

        fillRect(footLeft, beltLine, footsizeW * 2, footsizeW / 2);

        let footRight = this.x + this.s / 4;

        fillRect(footRight, beltLine, footsizeW * 2, footsizeW / 2);



    }

    shoulder() {

        ctx.fillStyle = `#d03926`;


        let bodyLeft = this.x - (this.body.width * this.s) / 2;
        let bodyTop = this.y - ((this.body.width / 2) * this.s) / 2;
        let bodySize = this.s * this.body.width;
        fillRect(bodyLeft, bodyTop, bodySize, bodySize / 2);


    }

    rightarm() {
        ctx.fillStyle = `#FFDDAA`;
        let armLeft = this.x - (this.body.arm * this.s) / 2;
        let armTop = this.y - ((this.body.arm) * this.s) / 2;
        let armSize = this.s * this.body.arm;

        let bodyRight = this.x + ((this.body.width / 2) * this.s);
        let quarterArm = armSize / 4;

        //shirtPiece-shoulder::
        ctx.fillStyle = `#d02916`;
        fillRect(bodyRight - quarterArm, armTop - this.s / 2, armSize, armSize + this.s / 2);
        //arm
        ctx.fillStyle = `#FFDDAA`;
        fillRect(bodyRight - quarterArm, armTop, armSize, armSize);

    }



    leftarm() {

        let armLeft = this.x - (this.body.arm * this.s) + this.s;
        let armTop = this.y - ((this.body.arm) * this.s) / 2;
        let armSize = this.s * this.body.arm;

        let bodyLeft = this.x - (this.body.width * this.s) / 2;

        let arm3Quarter = armSize / 4 * 3;

        let bodyLeftLeft = bodyLeft - arm3Quarter;

        //forearm
        //        ctx.fillStyle = `#DDBB77`;
        ctx.fillStyle = `#d02916`;
        fillRect(bodyLeftLeft, armTop - this.s / 2, armSize, armSize + this.s / 2);


        //ARM?
        ctx.fillStyle = `#FFDDAA`;
        //        ctx.fillStyle = `#d03926`;


        fillRect(bodyLeftLeft, armTop, armSize, armSize);


    }





    drawself() {


        this.shoulder();
        this.head();
        this.rightarm();
        this.leftarm();
        this.feet();
        this.hair();
        this.mouth();
    }


}






console.log(`tdhero.js`);
