class Monster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bluemonster');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // check bounds then set active/visible to false
        if(this.y < 0 || this.y > game.config.height || this.x < 0 || this.x > game.config.width) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class MonsterGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Monster,
            frameQuantity: 4,
            active: true,          
            visible: true,
            key: 'bluemonster'
        })
    }

    randomizePlacement() {
        const monsterBounds = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        Phaser.Actions.RandomRectangle(this.getChildren(), monsterBounds);
    }

    getRandomTarget() {
        return Phaser.Utils.Array.GetRandom(Phaser.Utils.Array.GetAll(this.getChildren(), 'active', true));
    }
}