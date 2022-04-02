import { createEnemy } from "./components/player";

const generateEnemyByLevel = (level) => {
    const canShoot = Math.random() < 0.7;
    let cooldown, damage, speed;
    speed = 0.3 + 2.7 * Math.random();
    if (canShoot) {
        cooldown = 0.05 + 1.95 * Math.random();
        damage = 1 + Math.min(level * 0.2 * cooldown, 25);
    }
    else {
        cooldown = 1 + 3 * Math.random();
        damage = 1 + Math.min(level * 0.1 * cooldown / speed, 25);
    }
    return createEnemy({
        health: 10 + 0.2 * level,
        size: 10 + Math.min(20, level * 2),
        bulletSpeed: 10,
        speed: { x: 0, y: 0, common: speed },
        canShoot,
        damage,
        cooldown
    });
};

export const generateLevel = (level) => {
    const count = Math.random() < 0.5 ? 1 : 1 + Math.random() * level;
    const levelFactors = [];
    for (let i = 0; i < count; ++i) {
        levelFactors.push(Math.random());
    }
    const sum = levelFactors.reduce((acc, x) => acc + x, 0);
    levelFactors.forEach((factor) => {
        const rate = factor / sum;
        const level_ = 1 + rate * (level - 1);
        generateEnemyByLevel(level_);
    });
};