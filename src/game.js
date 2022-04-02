import { createPlayer } from "./components/player";
import { world } from "./components/world";
import { generateLevel } from "./levels";
import { drawHud } from "./components/hud";

let currentLevel = 1;

const tick = () => {
    world.animate();
    world.draw();
    if (world.players.length) drawHud(world.players[0], currentLevel);
    if (world.isLevelFinished()) {
        currentLevel++;
        generateLevel(currentLevel);
    }
    window.requestAnimationFrame(tick);
};

export const game = () => {
    const me = createPlayer();

    generateLevel(currentLevel);

    tick();
};