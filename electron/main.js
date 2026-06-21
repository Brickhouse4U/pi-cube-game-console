"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const brightness_1 = require("./utils/brightness");
const volume_1 = require("./utils/volume");
const isDev = !electron_1.app.isPackaged;
let gameProcess = null;
let currentBrightness = 1.0;
function createWindow() {
    const displays = electron_1.screen.getAllDisplays();
    const targetDisplay = displays[1] ?? displays[0];
    const win = new electron_1.BrowserWindow({
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
    }
    else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}
electron_1.ipcMain.handle('get-resources-path', () => {
    return electron_1.app.getAppPath().replace('app.asar', '');
});
electron_1.ipcMain.handle('read-directory', async (_event, dirPath) => {
    try {
        const files = fs.readdirSync(dirPath);
        return files;
    }
    catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
});
electron_1.ipcMain.handle('read-game-title', async (_event, filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.trim();
    }
    catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
});
electron_1.ipcMain.handle('brightness:get', () => currentBrightness);
electron_1.ipcMain.handle('brightness:set', async (_event, value) => {
    const clamped = Math.min(1.0, Math.max(0.1, value));
    (0, brightness_1.applyBrightness)(clamped);
    currentBrightness = clamped;
    return currentBrightness;
});
electron_1.ipcMain.handle('get-volume', async () => {
    return await (0, volume_1.getVolume)();
});
electron_1.ipcMain.handle('set-volume', async (_event, level) => {
    return await (0, volume_1.setVolume)(level);
});
electron_1.ipcMain.handle('toggle-mute', async () => {
    return await (0, volume_1.toggleMute)();
});
electron_1.ipcMain.handle('launch-game', (event, gameId) => {
    return new Promise((resolve, reject) => {
        if (gameProcess) {
            return reject(new Error('A game is already running'));
        }
        const gamePath = `/media/picube/games/${gameId}/${gameId}.py`;
        gameProcess = (0, child_process_1.spawn)('python3', [gamePath], {
            detached: false,
            stdio: 'pipe',
            env: { ...process.env, DISPLAY: ':0' },
        });
        gameProcess.stdout?.on('data', (data) => {
            console.log(`Game stdout: ${data}`);
        });
        gameProcess.stderr?.on('data', (data) => {
            console.error(`Game stderr: ${data}`);
        });
        gameProcess.on('spawn', () => {
            console.log(`Game launched: ${gameId}`);
            resolve({ success: true });
        });
        gameProcess.on('close', (code) => {
            console.log(`Game exited with code: ${code}`);
            gameProcess = null;
            event.sender.send('game-closed');
        });
        gameProcess.on('error', (err) => {
            gameProcess = null;
            reject(err);
        });
    });
});
electron_1.ipcMain.handle('kill-game', async () => {
    if (gameProcess) {
        gameProcess.kill();
        gameProcess = null;
    }
});
electron_1.app.whenReady().then(async () => {
    try {
        const display = await (0, brightness_1.detectDisplay)();
        if (!display) {
            console.warn('No DDC/CI display detected, brightness control unavailable');
        }
        else {
            currentBrightness = (0, brightness_1.loadBrightness)();
            (0, brightness_1.applyBrightness)(currentBrightness);
        }
    }
    catch (err) {
        console.error('Brightness init failed:', err.message);
    }
    createWindow();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
