class Ball {
    contructor(id = 'ball', x = 0, y = 0, r = 0) {
        this.id = id;
        this.pos = {
            x: x,
            y: y,
        };
        this.vel = {
            x: 0,
            y: 0,
        };
        this.r = r;
        this.density = 1;

    }

    velAdd(dat) {
        this.vel.x += dat.x;
        this.vel.y += dat.y;
    }


    reflect(strXY) {
        switch (strXY) {
            case 'x':
                console.log(`[ball][x][reflect]`);
                this.vel.x = this.vel.x * -1;
                break;
            case 'y':
                console.log(`[ball][y][reflect]`);
                this.vel.y = this.vel.y * -1;
                break;
        }
    }


}
