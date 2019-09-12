// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ PLAYERS SECTION ]
// REFACTOR: INTO GAMEDATA?
var players = [];

function createPlayer(name = 'default', globalid, color = 'blue', x = 2, y = 4, direction = 'd', vx = 0, vy = 0, isAlive = false) {

    function Player(name, color, x, y) {
        this.globalid = globalid;
        this.name = name;
        this.isAI = true;
        this.color = color;
        this.length = 55;
        // COORDINATES:
        this.x = x;
        this.y = y;
        // VELOCITY:
        this.vx = vx;
        this.vy = vy;
        // CURRENT DIRECTION:
        this.direction = direction;
        // LOCATION OF BODY:
        this.loc = [[this.x, this.y, this.color]];
        // MOVE PLAYER:
        this.move = function () {

            if (this.isaboutToCrash() && this.isAI) {

                let mysense = player_look(this.globalid);
                this.setLRUD(indexofmax(mysense));

            }
            // REFACTOR:
            //  Add collision isFilled() function here.
            // then b) remove shift() because unshift() will be denied:
            if (this.isAlive) {
                this.x = this.x + this.vx;
                this.y = this.y + this.vy;
                this.loc.unshift([this.x, this.y, this.color]);
            }
            
            if (this.loc.length > this.length) {
                this.loc.pop();
            }
            

        }

        this.init = function () {
            this.isAlive = true;
            this.setbyDirection();
        }

        this.setLRUD = function (lrudindex) {
            //            console.log('LRUDDER: ' + lrudindex);    
            //            var random_boolean = Math.random() >= 0.5;
            //            console.log('random_boolean: ' + random_boolean);            

            //            if (random_boolean) {

            switch (lrudindex) {
                case 2:
                    this.smW();
                    break;
                case 0:
                    this.smA();
                    break;
                case 3:
                    this.smS();
                    break;
                case 1:
                    this.smD();
                    break;
            }
            //            }

        }

        this.setbyDirection = function () {
            switch (this.direction) {
                case 'w':
                    this.smW();
                    break;
                case 'a':
                    this.smA();
                    break;
                case 's':
                    this.smS();
                    break;
                case 'd':
                    this.smD();
                    break;
            }

        } // END INIT

        this.isaboutToCrash = function () {
            return isFilled(this.x + this.vx, this.y + this.vy);
        }

        // GO LEFT:
        this.smA = function () {
            this.vx = -1;
            this.vy = 0;
            this.direction = 'a';
        }
        // GO DOWN:
        this.smS = function () {
            this.vx = 0;
            this.vy = 1;
            this.direction = 's';
        }
        // GO RIGHT:
        this.smD = function () {
            this.vx = 1;
            this.vy = 0;
            this.direction = 'd';
        }
        // GO UP:
        this.smW = function () {
            this.vx = 0;
            this.vy = -1;
            this.direction = 'w';
        }

        this.isAlive = isAlive;

        this.turnLeft = function () {
            // MUTATE VELOCITY RELATIVE LEFT:

            // if moving right (x_axis++):
            if (this.vx > 0) {
                this.smW(); // go UP (relative LEFTTURN of RIGHT)
                return true;
            }
            // if moving left (x_axis--):
            if (this.vx < 0) {
                this.smS(); // go DOWN (relative LEFTTURN of LEFT)
                return true;
            }
            // if moving down
            if (this.vy > 0) {
                this.smD(); // go RIGHT (relative LEFTTURN of DOWN)
                return true;
            }
            if (this.vy < 0) {
                this.smA(); // go LEFT (relative LEFTTURN of UP)
                return true;
            }

            return false;

        }

        this.turnRight = function () {
            // MUTATE VELOCITY RELATIVE LEFT:

            // if moving right (x_axis++):
            if (this.vx > 0) {
                this.smS(); // go DOWN (relative turnRight of LEFT)
                return true;
            }
            // if moving left (x_axis--):
            if (this.vx < 0) {
                this.smW(); // go UP (relative turnRight of RIGHT)
                return true;
            }
            // if moving down
            if (this.vy > 0) {
                this.smA(); // go LEFT (relative turnRight of UP)
                return true;
            }

            if (this.vy < 0) {
                this.smD(); // go RIGHT (relative turnRight of DOWN)
                return true;
            }

            return false;

        }


    }

    return new Player(name, color, x, y);
}

function spawnPlayers(playernum = 0) {
    // zero is player one.
    playernum--;

    const pallette_main = {
        red: 'rgb(204,43,43)',
        yellow: 'rgb(255,181,79)', // marigold. (complement of blue)
        blue: 'rgb(12,163,255)', // (lighthappy)
        purple: 'rgb(93,20,179)', // (compliment of yellow.)
        green: 'rgb(79,255,79)', // (relative compliment of deep red.)
        cyan: 'rgb(57,255,250)', //cyan?
        orange: 'rgb(255,128,57)', // comliment of cyan?
    }

    const pallette_triad_y = {
        yellow: 'rgb(255,253,79)', // standard yellow.
        blue: 'rgb(104,196,255)', // amazing blue.
        red: 'rgb(204,43,43)', // poppin red.
    }




    let _spawning_Data = [
        [2, 17, pallette_main.yellow, 'd'],
        [48, 17, pallette_main.green, 'a'],
        [25, 2, pallette_main.blue, 's'],
        [25, 32, pallette_main.red, 'w'],
        [10, 2, pallette_main.purple, 's'],
        [40, 32, pallette_triad_y.blue, 'w'],
        [10, 32, pallette_main.cyan, 'w'],
        [40, 2, pallette_main.orange, 's']
    ];

    let _spD = _spawning_Data;


    for (i = 0; i <= playernum; i++) {
        //  this will push all the players to the players array.
        //-=-=-=-=-=-=-=-=-=[LEGEND]::::::name     color            x          y           direction
        players.push(createPlayer('AI', i, _spD[i][2], _spD[i][0], _spD[i][1], _spD[i][3]));
        //  need to set their vectors based on direction.
        players[i].init();

    }





}

function spawn4Players() {


    // have to refactor into canvas dimensions -1 +1 and directions, and colour:
    let _spawning_Data = [
    [2, 17, pallette_main.yellow],
    [48, 17, pallette_main.green],
    [25, 2, pallette_main.blue],
    [25, 32, pallette_main.red],
    [10, 2, pallette_main.purple],
    [40, 32, pallette_triad_y.blue],
    [10, 32, pallette_main.cyan],
    [40, 2, pallette_main.orange]
];

    console.log(_spawning_Data);
    //    players.push(createPlayer('d74', pallette_main.yellow, 2, 17, 'd', 1));
    //    players.push(createPlayer('AI', pallette_main.green, 48, 17, 'a', -1));
    //    players.push(createPlayer('AI', pallette_main.red, 25, 32, 'w', 0, -1));
    //    players.push(createPlayer('AI', pallette_main.blue, 25, 2, 's', 0, 1));
    players.push(createPlayer('AI', pallette_main.purple, 10, 2, 's', 0, 1));
    players.push(createPlayer('AI', pallette_main.cyan, 10, 32, 'w', 0, -1));
    players.push(createPlayer('AI', pallette_main.orange, 40, 2, 's', 0, 1));
    players.push(createPlayer('AI', pallette_triad_y.blue, 40, 32, 'w', 0, -1));

    if (_verbose) {
        console.log('[PLAYERLISTCREATED][' + players + ']');
    }

}

spawnPlayers(8);
//spawn4Players();
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ PLAYERS SECTION ]
