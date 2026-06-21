import { getSoundPath } from './assets';

const sounds: Record<string, HTMLAudioElement> = {};

export async function preload(name: string): Promise<void> {
    const path = await getSoundPath(`${name}.wav`);
    sounds[name] = new Audio(path);
}

export function play(name: string): void {
    const sound = sounds[name];
    if (!sound) return;
    const clone = sound.cloneNode() as HTMLAudioElement;
    clone.volume = 0.5;
    clone.play().catch(() => {});
}
