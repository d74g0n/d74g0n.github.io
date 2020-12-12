class player {
    constructor(x, y, id, physics) {
        this.id = id;
        this.pos = {
            x: x,
            y: y,
            offx: 0,
            offy: 0,
        };

        this.z = 0;
        this.vz = 0;
        this.physics = physics;

        this.jump = {};
        this.jump.hasLaunched = false;
        this.jump.startframe = undefined;
        this.jump.airtime = undefined;
        this.jump.z = 0;
        this.jump.vz = 0;
        this.jump.power = 10;
        this.jump.do = function () {

            if (this.jump.hasLaunched) {
                //in air re-jump code::

            } else {
                //on ground jump code::
                this.groundJump();
            }
        };
    }

    groundJump() {
        this.jump.vz += this.jump.power;
        this.jump.hasLaunched = true;
        this.jump.startframe = game.frame;
        this.jump.airtime = 0;
        this.physics.ag = 0;
    }

    doPhysics() {
        //accumulate gravity - perhaps with modolo

        if (this.jump.hasLaunched) {
            //do gravity (because in air)
            this.physics.ag += this.physics.gravity;
            this.vz -= this.physics.g;
        } else {
            //do ground friction (because on ground)
            
        }
        
        // winds



    }




    
    
    
    

    drawSelf() {
        Engine.renderer.draw.itile(0, MapEditor.quickSprite.player, {
            x: Engine.viewport.getCenterTile().x,
            y: Engine.viewport.getCenterTile().y,
            offy: Engine.viewport.offsety + this.z,
            offx: -Engine.viewport.offsetx,
        }, 1);
    }


}

let _physics = {
    g: 9,
    ag: 0,
    f: 0.99,
    w: 0,
}
