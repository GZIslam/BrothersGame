import { createEnemy, createPlayer } from "./components/player";
import { world } from "./components/world";

const tick = () => {
    world.animate();
    world.draw();
    window.requestAnimationFrame(tick);
};

const me = createPlayer();
for (let i = 0; i < 9; i++) {
    createEnemy();
}

tick();