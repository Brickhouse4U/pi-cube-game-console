const sounds = {};

function preload(name, path) {
    sounds[name] = new Audio(path);
}

function play(name) {
    const sound = sounds[name];
    if (!sound) return;
    // Clone so rapid plays overlap cleanly
    const clone = sound.cloneNode();
    clone.volume = 0.5;
    clone.play().catch(() => {});
}

export { preload, play };