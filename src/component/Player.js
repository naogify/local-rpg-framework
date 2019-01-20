import '../assets/enchant.js';
import game from "./Game";
import map from "./Map";

//set size of player sprite as 32px * 32px;
const player = new Sprite(32, 32);

//set the initial position of the player sprite.
player.x = 6 * 16 - 8; //6map-tile - 8px from left.
player.y = 10 * 16; //10map-tile from top.
player.image = game.assets['chara0.png'];


player.isMoving = false;
player.direction = 0;
player.walk = 1;


//enterframe ignite after load files, and it won't stop.
player.addEventListener('enterframe', function () {

    //Choose which player to render by index number.
    this.frame = this.direction * 3 + this.walk;

    if (this.isMoving) {
        this.moveBy(this.vx, this.vy);

        if (!(game.frame % 3)) {
            this.walk++;
            this.walk %= 3;
        }
        if ((this.vx && (this.x - 8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
            this.isMoving = false;
            this.walk = 1;
        }
    } else {
        this.vx = this.vy = 0;
        if (game.input.left) {
            this.direction = 1;
            this.vx = -4;
        } else if (game.input.right) {
            this.direction = 2;
            this.vx = 4;
        } else if (game.input.up) {
            this.direction = 3;
            this.vy = -4;
        } else if (game.input.down) {
            this.direction = 0;
            this.vy = 4;
        }

        if (this.vx || this.vy) {

            console.log(this.vx);


            var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
            var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;


            //x and y is not smaller/bigger than map width height and ther is no obstacle at x and y.
            if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {

                this.isMoving = true;
                arguments.callee.call(this);
            }
        }
    }
});

export default player;