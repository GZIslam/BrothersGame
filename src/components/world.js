import { clearCanvas } from "../drawer";
import { vector } from "../geometry";

const intersects = (a, b) => {
    return vector(a.position).sub(b.position).length() <= a.size + b.size;
};

export const world = {
    players: [],
    bullets: [],
    draw: function () {
        clearCanvas(world);
        this.players.forEach(player => player.draw());
        this.bullets.forEach(bullet => bullet.draw());
    },
    animate: function () {
        this.players.forEach(player => player.animate());
        this.bullets.forEach(bullet => bullet.animate());
        this.checkCollisions();
        this.removeOrphans();
    },
    removeOrphans: function () {
        this.players = this.players.filter(p => !p.disabled);
        this.bullets = this.bullets.filter(p => !p.disabled);
    },
    checkCollisions: function () {
        this.players.forEach(player => {
            this.bullets.forEach(bullet => {
                if (intersects(player, bullet) && bullet.owner.type !== player.type) {
                    if (player.getDamage(bullet.damage)) {
                        bullet.owner.score++;
                    }
                    bullet.disabled = true;
                }
            });

            this.players.forEach(p => {
                if (intersects(player, p) && p.type !== player.type) {
                    p.hit(player);
                }
            });
        });
    },
    isLevelFinished: function () {
        return this.players.every((el) => el.type === 'player');
    },
}