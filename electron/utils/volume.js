const { exec } = require('child_process');

/**
 * Get current volume (returns 0.0 - 1.0)
 */
function getVolume() {
  return new Promise((resolve, reject) => {
    exec("amixer get Master | grep -o '[0-9]*%' | head -1", (err, stdout) => {
      if (err) return reject(err);
      const percent = parseInt(stdout.replace('%', '').trim());
      resolve(percent / 100);
    });
  });
}

/**
 * Set volume (accepts 0.0 - 1.0)
 */
function setVolume(level) {
  return new Promise((resolve, reject) => {
    if (level < 0 || level > 1) return reject(new Error('Volume must be between 0.0 and 1.0'));
    const percent = Math.round(level * 100);
    exec(`amixer set Master ${percent}%`, (err) => {
      if (err) return reject(err);
      resolve(percent);
    });
  });
}

/**
 * Mute/unmute toggle
 */
function toggleMute() {
  return new Promise((resolve, reject) => {
    exec('amixer set Master toggle', (err, stdout) => {
      if (err) return reject(err);
      const muted = stdout.includes('[off]');
      resolve(muted);
    });
  });
}

module.exports = { getVolume, setVolume, toggleMute };