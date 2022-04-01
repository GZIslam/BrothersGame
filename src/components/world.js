import { clearCanvas } from "../drawer";

const intersects = (a, b) => {
    const pa = a.position, pb = b.position;
    const range = Math.hypot(Math.abs(pa.x - pb.x), Math.abs(pa.y - pb.y));
    return range <= a.size + b.size;
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
                    player.health -= bullet.damage;
                    bullet.disabled = true;
                }
            });
            if (player.health <= 0) {
                if (player.hearts > 1) {
                    player.hearts--;
                    player.health = player.fullHealth;
                } else {
                    player.disabled = true;
                }
            }
        });
    }
}