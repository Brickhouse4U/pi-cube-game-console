const { ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// On Pi/production: persist to /etc/brightness.state
// On dev machine: persist to home directory
const BRIGHTNESS_STATE = process.env.NODE_ENV === 'production'
    ? '/etc/brightness.state'
    : path.join(os.homedir(), '.brightness.state');

// console.log('Brightness state file:', BRIGHTNESS_STATE);

function detectDisplays() {
    return new Promise((resolve, reject) => {
        exec('xrandr --listmonitors', (err, stdout) => {
            if (err) return reject(err);

            console.log('xrandr --listmonitors output:', stdout);

            const displays = [];
            const lines = stdout.trim().split('\n');

            for (const line of lines) {
                const parts = line.trim().split(/\s+/);
                const last = parts[parts.length - 1];
                // Match HDMI-A-1, DP-1, eDP-1, default, etc.
                if (last && /^[A-Za-z]/.test(last) && !line.startsWith('Monitors:')) {
                    displays.push(last);
                }
            }

            console.log('Detected displays:', displays);
            resolve(displays);
        });
    });
}

function detectDisplay(index = 0) {
    return detectDisplays().then(displays => displays[index] ?? null);
}

// Apply brightness asynchronously
function applyBrightness(display, value) {
    return new Promise((resolve, reject) => {
        if (!display) return reject(new Error('No display available'));
        exec(`xrandr --output ${display} --brightness ${value}`, (err) => {
            if (err) return reject(err);
            fs.writeFileSync(BRIGHTNESS_STATE, String(value));
            resolve(value);
        });
    });
}

function applyBrightnessAll(value) {
    return detectDisplays().then(displays => {
        const promises = displays.map(display => applyBrightness(display, value));
        return Promise.all(promises);
    });
}

function loadBrightness() {
    try {
        return parseFloat(fs.readFileSync(BRIGHTNESS_STATE, 'utf8').trim());
    } catch {
        return 1.0;
    }
}

module.exports = { 
    detectDisplay, 
    detectDisplays, 
    applyBrightness, 
    applyBrightnessAll, 
    loadBrightness 
};
    