class player {
    constructor(x, y, id, physics) {
        this.id = id;
        this.pos = {
            x: x,
            y: y,
        };

        this.z = 0;
        this.vz = 0;
        this.gravity = 0;
        this.isJumping = false;

        this.physics = physics;
    }

    readOut() {
        console.log(this);
    }


    doJumpVelocities() {

        this.z += this.vz;



    }

    doJump() {
        this.isJumping = true;
        this.jumpframe = game.frame;


    }

    drawSelf() {
        Engine.renderer.draw.itile(0, MapEditor.quickSprite.player, {
            x: Engine.viewport.getCenterTile().x,
            y: Engine.viewport.getCenterTile().y,
            offy: Engine.viewport.offsety+this.z,
            offx: -Engine.viewport.offsetx,
        }, 1);
    }


}

let _physics = {
    g: 9,
    vg: 0,
    f: 0.99,
}
