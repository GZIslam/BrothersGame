import { colors, gameSize } from "../constants";
import { controller } from "../controller";
import { drawArc, drawCircle } from "../drawer";
import { createBullet } from "./bullet";
import { world } from "./world";

const createUUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const createPerson = ({ color, health, frequency, size, hearths, speed, damage, position, bulletSpeed, type }) => {
    const uuid = createUUID();
    const player = {
        color, health, frequency, size, hearths, speed, damage, position, type,
        uuid,
        fullHealth: health,
        draw: function () {
            drawCircle({ color, size, position });
            drawArc({ color: 'black', size, width: 2, position, value: this.health / this.fullHealth });
        },
        animate: () => {
            position.x += speed.x;
            position.y += speed.y;
        },
        shoot: function (destination) {
            const v = {
                x: destination.x - position.x,
                y: destination.y - position.y
            };
            const length = Math.hypot(Math.abs(v.x), Math.abs(v.y));
            const bSpeed = {
                x: v.x * bulletSpeed / length,
                y: v.y * bulletSpeed / length
            };
            world.bullets.push(createBullet({
                color, damage, size: 3, speed: bSpeed, owner: this,
                position: { x: position.x, y: position.y }
            }));
        }
    };
    world.players.push(player);
    return player;
};

export const createPlayer = () => {
    const player = createPerson({
        color: colors.player,
        health: 10,
        frequency: 10,
        size: 10,
        type: 'player',
        hearths: 10,
        speed: { x: 0, y: 0, common: 5 },
        damage: 1,
        position: { x: gameSize.w / 2, y: gameSize.h / 2 },
        bulletSpeed: 10
    });
    controller(player);
    return player;
}
export const createEnemy = () => {
    return createPerson({
        color: colors.enemy,
        health: 10,
        frequency: 10,
        size: 10,
        type: 'enemy',
        hearths: 10,
        speed: { x: 0, y: 0, common: 5 },
        damage: 1,
        position: { x: Math.random() * gameSize.w, y: Math.random() * gameSize.h },
        bulletSpeed: 10
    });
}