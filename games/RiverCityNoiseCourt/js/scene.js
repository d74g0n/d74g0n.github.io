let scene = {
    camera: undefined,
    seed: undefined,
    isVerbose: true,
    vlog: function (msg) {
        if (scene.isVerbose) {
            console.log(`[scene]=>[ ${msg} ]`);
        }
    },
    props: [],
    tick: function () {
        //tigger each loaded object to render.
        mockupZone(); // underprops

        if (scene.props.length > 0) {
            for (i = 0; i < scene.props.length; i++) {
                scene.props[i].tick();
            }
        }
//                fieldGrid(); //WIP WIP WIP

    },
    add: function (newobj) {
        scene.props.push(newobj);
        scene.vlog(`${newobj.id} added!`);
    },
    initCamera: function (w=512,h=256) {
        scene.camera = new camera(w, h);
        scene.vlog(`initCamera`);
        return this.camera;
    },

    initSeed: function () {
      this.seed = this.generateSeed();  
    },
    
    generateSeed: function(){
        return {x:Math.random().toFixed(2),y:Math.random().toFixed(2),z:Math.random().toFixed(2)};
    },
    
    logSeed: function (){
        console.log(this.generateSeed());
    },
    
    
    
    
    collidable: [],
    collisionLogic: function () {
        if (scene.props.length > 0) {
            scene.collidable = scene.props;

            for (i = 0; i < scene.collidable.length; i++) {
                //if

                //splicing in a forloop ain't the best. maybe reverse order.
                scene.colliable.splice(i, 1); // remove element
                //if makes to end then remove from collideables.

            }

        }
    }
};


