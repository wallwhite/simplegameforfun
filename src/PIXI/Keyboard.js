// @flow

class Keyboard {
    pressed: {
        [key: string]: boolean,
    };

    constructor() {
        this.pressed = {};
    }

    watch = (el: HTMLElement) => {
        el.addEventListener('keydown', (e: KeyboardEvent) => {
            this.pressed[e.key] = true;
        });
        el.addEventListener('keyup', (e: KeyboardEvent) => {
            this.pressed[e.key] = false;
        });
    };
}

export default Keyboard;
