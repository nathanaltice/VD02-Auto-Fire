class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 1);
        scene.add.existing(this);

        this.PLAYER_VELOCITY = 2;
    }

    update() {
        // store direction vector
        let playerDirection = new Phaser.Math.Vector2(0, 0);
        // handle left/right
        if(cursors.left.isDown) {
            playerDirection.x = -1;
        } else if(cursors.right.isDown) {
            playerDirection.x = 1;
        }
        // handle up/down
        if(cursors.up.isDown) {
            playerDirection.y = -1;
        } else if(cursors.down.isDown) {
            playerDirection.y = 1;
        }
        // account for diagonals
        playerDirection.normalize();
        // update player position
        this.x += playerDirection.x * this.PLAYER_VELOCITY;
        this.y += playerDirection.y * this.PLAYER_VELOCITY;
    }
}