import { drawCircle, drawRect, drawText } from "../drawer"

export const drawHud = (player, currentLevel) => {
    drawRect({ color: 'black', width: player.fullHealth * 3, height: 20, position: { x: 10, y: 10 } });
    drawRect({ color: 'green', width: player.health * 3, height: 20, position: { x: 10, y: 10 } });
    drawText({ text: `score: ${player.score}  level: ${currentLevel}`, color: 'black', size: 30, position: { x: 10, y: 90 } });

    for (let i = 0; i < player.hearts; i++) {
        drawCircle({ color: 'red', size: 10, position: { x: 20 + i * 30, y: 50 } })
    }
}