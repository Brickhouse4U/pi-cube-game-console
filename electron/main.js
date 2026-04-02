const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')
const { detectDisplay, applyBrightness, loadBrightness } = require('./utils/brightness.js');
const { getVolume, setVolume, toggleMute } = require('./utils/volume');


const isDev = !app.isPackaged

let currentBrightness = 1.0;

function createWindow() {
  const displays = screen.getAllDisplays()

    // Use second display if available, otherwise fall back to primary
  const targetDisplay = displays[1] ?? displays[0]

  const win = new BrowserWindow({
    x: targetDisplay.bounds.x,
    y: targetDisplay.bounds.y,
    width: targetDisplay.bounds.width,
    height: targetDisplay.bounds.height,
    fullscreen: true,
    autoHideMenuBar: true,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Temporarily open DevTools in all modes to debug
  win.webContents.openDevTools()
}

ipcMain.handle('brightness:get', () => currentBrightness);

ipcMain.handle('brightness:set', async (_, value) => {
    const clamped = Math.min(1.0, Math.max(0.1, value));
    applyBrightness(clamped);
    currentBrightness = clamped;
    return currentBrightness;
});

ipcMain.handle('get-volume', async () => {
  return await getVolume();
});

ipcMain.handle('set-volume', async (event, level) => {
  return await setVolume(level);
});

ipcMain.handle('toggle-mute', async () => {
  return await toggleMute();
});

app.whenReady().then(async () => {
  try {
    const display = await detectDisplay();

    if (!display) {
      console.warn('No DDC/CI display detected, brightness control unavailable');
    } else {
      currentBrightness = loadBrightness();
      applyBrightness(currentBrightness);
    }
  } catch (err) {
    console.error('Brightness init failed:', err.message);
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});