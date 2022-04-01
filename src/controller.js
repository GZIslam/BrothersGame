export const controller = (player) => {
    window.document.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyA":
                player.speed.x = -player.speed.common;
                break;
            case "KeyD":
                player.speed.x = player.speed.common;
                break;
            case "KeyW":
                player.speed.y = -player.speed.common;
                break;
            case "KeyS":
                player.speed.y = player.speed.common;
                break;
        }
    });
    window.document.addEventListener("keyup", (e) => {
        switch (e.code) {
            case "KeyA":
                if (player.speed.x < 0)
                    player.speed.x = 0;
                break;
            case "KeyD":
                if (player.speed.x > 0)
                    player.speed.x = 0;
                break;
            case "KeyW":
                if (player.speed.y < 0)
                    player.speed.y = 0;
                break;
            case "KeyS":
                if (player.speed.y > 0)
                    player.speed.y = 0;
                break;
        }
    });
    window.document.addEventListener('mousedown', (e) => {
        player.shoot({ x: e.clientX, y: e.clientY });
    })
}