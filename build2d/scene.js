let scene = {
    camera: undefined,
    isVerbose: false,
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
        //        fieldGrid(); //WIP WIP WIP

    },
    add: function (newobj) {
        scene.props.push(newobj);
        scene.vlog(`${newobj.id} added!`);
    },
    initCamera: function () {
        scene.camera = new camera(512, 256);
        scene.vlog(`initCamera`);
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
