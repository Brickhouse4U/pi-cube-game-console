type ButtonCallback = () => void;

export const BUTTONS: Record<string, number> = {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LB: 4,
    RB: 5,
    LT: 6,
    RT: 7,
    SELECT: 8,
    START: 9,
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15,
};

export const AXES: Record<string, number> = {
    LEFT_X: 0,
    LEFT_Y: 1,
    RIGHT_X: 2,
    RIGHT_Y: 3,
};

const listeners: Record<number, ButtonCallback[]> = {};
let animationFrame: number | null = null;
const prevButtons: Record<number, boolean> = {};

export function on(button: number, callback: ButtonCallback): void {
    if (!listeners[button]) listeners[button] = [];
    listeners[button].push(callback);
}

export function off(button: number, callback: ButtonCallback): void {
    if (!listeners[button]) return;
    listeners[button] = listeners[button].filter(cb => cb !== callback);
}

function poll(): void {
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
        if (!gp) continue;
        gp.buttons.forEach((btn, index) => {
            const wasPressed = prevButtons[index] || false;
            const isPressed = btn.pressed;
            if (isPressed && !wasPressed) {
                if (listeners[index]) {
                    listeners[index].forEach(cb => cb());
                }
            }
            prevButtons[index] = isPressed;
        });
    }
    animationFrame = requestAnimationFrame(poll);
}

export function start(): void {
    window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
        console.log('Gamepad connected:', e.gamepad.id);
        if (!animationFrame) poll();
    });
    window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => {
        console.log('Gamepad disconnected:', e.gamepad.id);
    });
}

export function stop(): void {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}
