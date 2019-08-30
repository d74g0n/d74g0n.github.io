class TOSDoor {
    constructor(x = 10, y = 50, w = 200, h = 60) {
        this.cid = 'TOSdoor';
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.color = TOS.color.door.light;
        this.lookingglass = Global.images.thumb;
        this.isOpen = false;
    }

    createView() {
        setStrokeColor('blacks');
        ctx.lineWidth = 2;
        let panelHcenter = this.x + (this.w / 2);
        let panelWidth = this.w - (this.w * 0.25);
        let doorL = panelHcenter - (panelWidth / 2);
        let doorT = this.y + (this.h * 2);
        let doorH = this.h * 3;
        superdrawImage(this.lookingglass, 120, 100, Global.images.thumb.width / 2, Global.images.thumb.height / 1.3, doorL, doorT, panelWidth, doorH);

        if (player.y < doorT+doorH+player.scale) {
            player.drawSelf();
        }
    }

    drawBase(frame = 0) {
        //door base mind you
        setStrokeColor('blacks');
        ctx.lineWidth = 2;
        let panelHcenter = this.x + (this.w / 2);
        let panelWidth = this.w - (this.w * 0.25);
        let doorL = panelHcenter - (panelWidth / 2);
        let doorT = this.y + (this.h * 2);
        let doorH = this.h * 3;
        //        setColor('grey');
        //        drawRect(doorL, doorT, panelWidth, doorH - 1);
        strokeRect(doorL, doorT, panelWidth, doorH - 1);
    }

    drawOpenfactor(factor = 75) {
        if (factor > 75) {
            factor = 75;
            this.isOpen = true;
        }

        if (factor < 0) {
            factor = 0;
            this.isOpen = false;
        }
        let panelHcenter = this.x + (this.w / 2);
        let doorwidth = this.w - (this.w * 0.25);
        let halfDoor = doorwidth / 2;
        let doorR = panelHcenter + halfDoor;
        let doorsize = doorwidth / 2;
        let doorL = panelHcenter - (doorwidth / 2);
        let doorT = this.y + (this.h * 2);
        let doorH = this.h * 3;
        setColor(this.color);
        setStrokeColor('black');
        //left Door (fixed left side)
        drawRect(doorL, doorT, halfDoor - (factor), doorH - 1);
        strokeRect(doorL, doorT, halfDoor - (factor), doorH - 1);
        //right door (fixed right side)
        drawRect(doorR - halfDoor + (factor), doorT, halfDoor - (factor), doorH - 1);
        strokeRect(doorR - halfDoor + (factor), doorT, halfDoor - (factor), doorH - 1);
    }

    tick(frame = 0) {

        this.drawSelf(frame);
    }

    drawSelf(frame = 0) {
        this.drawBase(frame);
        if (frame > 72) {
            frame = 72;
        }
        this.createView();
        this.drawOpenfactor(frame);
    }

    readout() {
        console.log(`[CID][${this.cid}]`);
        console.log(`this.x:${this.x}`);
        console.log(`this.y:${this.y}`);
        console.log(`this.w:${this.w}`);
        console.log(`this.h:${this.h}`);
        console.log(`this.detailList:${this.detailList}`);
    }
}
