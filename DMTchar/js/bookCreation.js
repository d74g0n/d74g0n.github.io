let characterGenerator = {
    init: function () {
        // setup and load area.
        console.log(`[chargen.init]`);

        // begin true execution.
        characterGenerator.start();
    },
    media: {
        images: {},
        sfx: {},
        music: {},
    },
    cookies: {
        //un
        read: function () {},
        write: function (data) {},
    },
    start: function () {
        console.log(`[chargen.start]`);
        characterGenerator.mainLoop();
    },
    characterDetails: {
        name: 'Book',
        tint: undefined,
    },
    draw: {
        background: function () {

        },
        hud: function () {

        },
        player: function () {

        },
    },
    mainLoop: function () {

        characterGenerator.draw.background();
        characterGenerator.draw.hud();
        characterGenerator.draw.player();




        requestAnimationFrame(mainLoop);
    }

}


chargen.init();
