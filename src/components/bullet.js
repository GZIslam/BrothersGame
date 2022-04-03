import { drawCircle } from "../drawer";
import { gameSize } from "../constants";

export const createBullet = ({ color, damage, size, speed, owner, position }) => {
    return {
        color, damage, size, speed, owner, position, disabled: false,
        draw: () => drawCircle({ color, size, position }),
        animate: function () {
            position.x += speed.x;
            position.y += speed.y;
            if (position.x < 0 || position.x > gameSize.w || position.y < 0 || position.y > gameSize.h) {
                this.disabled = true;
            }
        }
    }
}
