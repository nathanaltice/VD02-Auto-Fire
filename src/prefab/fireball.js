class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fireball');
        this.scene = scene;
        this.FIREBALL_VELOCITY = 200;
    }

    fire(x, y, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(angle - 90);  // subtract 90 deg since our sprite isn't facing right
        // velocityFromAngle sets the fireball's vector velocity based on its angle
        // ie, it shoots the fireball in the proper vector direction
        this.scene.physics.velocityFromAngle(angle, this.FIREBALL_VELOCITY, this.body.velocity);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // set fireball active/visible to false if it goes 'offscreen'
        if(this.y < 0 || this.y > game.config.height || this.x < 0 || this.x > game.config.width) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class FireballGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Fireball,    // all members of this group will be of class Fireball
            frameQuantity: 30,      // this will be our max number of fireballs
            active: false,          // all group member will start inactive...
            visible: false,         // ...and invisible
            key: 'fireball'
        })
    }

    fireFireballs(x, y, angle) {
        let fireballCount = 3;                      // how many fireballs do we shoot at once?          
        let spreadAngle = 3;                        // how far apart (in deg) should each fireball be?
        let firingAngle = angle - spreadAngle;
        //console.log(`angle: ${angle} | fireAngle: ${firingAngle}`);
        if(this.countActive(false) >= fireballCount) {      // make sure we can shoot the full amount
            for(let i = 0; i < fireballCount; i++) {
                let fireball = this.getFirstDead(false);    // find an inactive fireball
                if (fireball) {                             // make sure the fireball exists
                    fireball.fire(x, y, firingAngle);
                    firingAngle += spreadAngle;
                }
            }
        }
    }
}

