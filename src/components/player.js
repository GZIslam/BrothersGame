import { colors, gameSize } from "../constants";
import { controller } from "../controller";
import { drawArc, drawCircle } from "../drawer";
import { vector } from "../geometry";
import { createBullet } from "./bullet";
import { world } from "./world";

import shootingPlayerAudioFile from "../assets/sounds/sfx_wpn_laser8.wav";
import shootingEnemyAudioFile from "../assets/sounds/sfx_wpn_laser7.wav";
import hitAudioFile from "../assets/sounds/sfx_wpn_punch4.wav";

const createUUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const createPerson = ({ color, health, canShoot, size, hearts, speed, damage,
    position, bulletSpeed, type, logic = null, cooldown }) => {
    const uuid = createUUID();
    let cooldownEnds = null;
    const cooldownReady = () => {
        if (cooldownEnds === null || +(new Date()) > cooldownEnds) {
            cooldownEnds = +(new Date()) + cooldown * 1000;
            return true;
        }
        return false;
    };
    const player = {
        color, health, canShoot, size, hearts, speed, damage, position, type,
        uuid, cooldown, score: 0,
        fullHealth: health,
        draw: function () {
            drawCircle({ color, size, position });
            drawArc({ color: 'black', size, width: 2, position, value: this.health / this.fullHealth });
        },
        animate: function () {
            if (logic)
                logic(this, world);
            position.x = (position.x + this.speed.x > gameSize.w - player.size) || (position.x + this.speed.x < 0 + player.size / 2) ? position.x : position.x + this.speed.x;
            position.y = (position.y + this.speed.y > gameSize.h - player.size) || (position.y + this.speed.y < 0 + player.size / 2) ? position.y : position.y + this.speed.y;
        },
        shoot: function (destination) {
            if (cooldownReady()) {
                // sound
                const shootingAudio = type === "player" ? new Audio(shootingPlayerAudioFile) : new Audio(shootingEnemyAudioFile);
                shootingAudio.play();

                const bSpeed = vector(destination).sub(position).setLength(bulletSpeed);
                world.bullets.push(createBullet({
                    color, damage, size: 3, speed: bSpeed, owner: this,
                    position: { x: position.x, y: position.y }
                }));
            }
        },
        hit: function (p) {
            if (!canShoot && cooldownReady()) {
                // sound
                const hitAudio = new Audio(hitAudioFile);
                hitAudio.play();
                
                return p.getDamage(damage);
            }
            return false;
        },
        getDamage: function (damage) {
            this.health -= damage;
            if (this.health <= 0) {
                if (this.hearts > 1) {
                    this.hearts--;
                    this.health = this.fullHealth;
                } else {
                    this.disabled = true;
                    return true;
                }
            }
            return false;
        },
    };
    world.players.push(player);
    return player;
};

const logic = (person, world) => {
    let closest = null, dist = -1;
    world.players.forEach((p) => {
        if (p.type !== person.type) {
            const curDist = vector(p.position).distanceTo(person.position);
            if (!closest || curDist < dist) {
                closest = p;
                dist = curDist;
            }
        }
    });
    if (closest !== null) {
        const pcSpeed = person.speed.common;
        if (!person.canShoot) {
            if (dist > person.size) {
                person.speed = {
                    common: pcSpeed,
                    ...vector(closest.position).sub(person.position).setLength(pcSpeed)
                }
            }
            else {
                person.speed.x = person.speed.y = 0;
            }
        } else {
            let direction = vector(closest.position).sub(person.position).setLength(pcSpeed * 0.01);
            if (dist > 20 * person.size || dist < 5 * person.size) {
                direction = vector(closest.position).sub(person.position).setLength(pcSpeed);
                if (dist < 5 * person.size)
                    direction = direction.mul(-1);
            }
            direction = direction.add(direction.perpendicular().setLength(pcSpeed)).setLength(pcSpeed);
            person.speed = {
                common: pcSpeed, ...direction
            }
            person.shoot(closest.position);
        }
    }
};

export const createPlayer = () => {
    const player = createPerson({
        color: colors.player,
        health: 30,
        canShoot: true,
        size: 10,
        type: 'player',
        hearts: 3,
        speed: { x: 0, y: 0, common: 5 },
        damage: 1,
        position: { x: gameSize.w / 2, y: gameSize.h / 2 },
        bulletSpeed: 10,
        cooldown: 0.1,
    });
    controller(player);
    return player;
}
export const createEnemy = (props) => {
    if (!props) {
        props = {
            health: 10,
            canShoot: Math.random() > 0.5,
            size: 10,
            speed: { x: 0, y: 0, common: 0.3 },
            damage: 1,
            bulletSpeed: 10,
            cooldown: 1
        }
    }
    return createPerson({
        color: props.canShoot ? colors.shootingEnemy : colors.enemy,
        type: 'enemy',
        hearts: 1,
        position: { x: Math.random() * gameSize.w, y: Math.random() * gameSize.h },
        logic,
        ...props
    });
}