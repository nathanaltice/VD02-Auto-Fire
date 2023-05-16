/*
Nathan Altice
02/17/23
Vampire Dissection 02: Auto-Fire
Character spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites
Fireball by HandsomeUnicorn: https://handsomeunicorn.itch.io/fireball-sprite
Monster sprite by Robocelot: https://robocelot.itch.io/ocunid-monster-sprite
Firing code adapted from: https://www.codecaptain.io/blog/game-development/shooting-bullets-phaser-3-using-arcade-physics-groups/696
*/

"use strict";

let cursors;

class PlayScene extends Phaser.Scene {
    constructor() {
        super({key:'playScene'});
    }

    preload() {
        this.load.path = './assets/img/';
        this.load.spritesheet('player', 'Character_001.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.spritesheet('fireball', 'fireballSpritesheet.png', {
            frameWidth: 24,
            frameHeight: 32
        });
        this.load.spritesheet('bluemonster', 'blue_octonid.png', {
            frameWidth: 64,
            frameHeight: 64 
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD);
        cursors = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, game.config.width/2, game.config.height/2);

        this.monsterGroup = new MonsterGroup(this);
        this.monsterGroup.randomizePlacement();
        
        this.fireballGroup = new FireballGroup(this);
        this.SHOT_COOLDOWN = 60;  // in frames
        this.shotTimer = this.SHOT_COOLDOWN;

        // mouse input
        this.input.on('pointerdown', pointer => {
            this.monsterGroup.randomizePlacement();
        })
        // instruction text
        this.add.text(50, 750, 'Arrow keys: move | Mouse click: randomize monsters', { color: 0xFFFFFF });
    }

    update() {
        // handle shot timer
        this.shotTimer -= 1;
        if(this.shotTimer <= 0) {
            this.fireFireball();
            this.shotTimer = this.SHOT_COOLDOWN;
        }
        // prefab updates (necessary for overridden update loops to run)
        this.player.update();
    }

    fireFireball() {
        let target = this.monsterGroup.getRandomTarget();
        let targetAngle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.x, this.player.y, target.x, target.y);
        this.fireballGroup.fireFireballs(this.player.x, this.player.y, targetAngle);
    }
}

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [ PlayScene ]
}

const game = new Phaser.Game(config);