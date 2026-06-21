import { app, BrowserWindow, screen, ipcMain, IpcMainInvokeEvent } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';
import { detectDisplay, applyBrightness, loadBrightness } from './utils/brightness';
import { getVolume, setVolume, toggleMute } from './utils/volume';

const isDev = !app.isPackaged;

let gameProcess: ChildProcess | null = null;
let currentBrightness = 1.0;

function createWindow(): void {
  const displays = screen.getAllDisplays();

  const targetDisplay = displays[1] ?? displays[0];

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
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

ipcMain.handle('get-resources-path', () => {
    return app.getAppPath().replace('app.asar', '');
});

ipcMain.handle('read-directory', async (_event: IpcMainInvokeEvent, dirPath: string) => {
    try {
        const files = fs.readdirSync(dirPath);
        return files;
    } catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
});

ipcMain.handle('read-game-title', async (_event: IpcMainInvokeEvent, filePath: string) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.trim();
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
});

ipcMain.handle('brightness:get', () => currentBrightness);

ipcMain.handle('brightness:set', async (_event: IpcMainInvokeEvent, value: number) => {
    const clamped = Math.min(1.0, Math.max(0.1, value));
    applyBrightness(clamped);
    currentBrightness = clamped;
    return currentBrightness;
});

ipcMain.handle('get-volume', async () => {
  return await getVolume();
});

ipcMain.handle('set-volume', async (_event: IpcMainInvokeEvent, level: number) => {
  return await setVolume(level);
});

ipcMain.handle('toggle-mute', async () => {
  return await toggleMute();
});

ipcMain.handle('launch-game', (event: IpcMainInvokeEvent, gameId: string) => {
  return new Promise((resolve, reject) => {
    if (gameProcess) {
      return reject(new Error('A game is already running'));
    }

    const gamePath = `/media/picube/games/${gameId}/${gameId}.py`;

    gameProcess = spawn('python3', [gamePath], {
        detached: false,
        stdio: 'pipe',
        env: { ...process.env, DISPLAY: ':0' },
    });

    gameProcess.stdout?.on('data', (data: Buffer) => {
        console.log(`Game stdout: ${data}`);
    });

    gameProcess.stderr?.on('data', (data: Buffer) => {
        console.error(`Game stderr: ${data}`);
    });

    gameProcess.on('spawn', () => {
        console.log(`Game launched: ${gameId}`);
        resolve({ success: true });
    });

    gameProcess.on('close', (code: number | null) => {
        console.log(`Game exited with code: ${code}`);
        gameProcess = null;
        event.sender.send('game-closed');
    });

    gameProcess.on('error', (err: Error) => {
        gameProcess = null;
        reject(err);
    });
  });
});

ipcMain.handle('kill-game', async () => {
    if (gameProcess) {
        gameProcess.kill();
        gameProcess = null;
    }
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
    console.error('Brightness init failed:', (err as Error).message);
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
