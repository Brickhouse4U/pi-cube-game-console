"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    getResourcesPath: () => electron_1.ipcRenderer.invoke('get-resources-path'),
    readDirectory: (dirPath) => electron_1.ipcRenderer.invoke('read-directory', dirPath),
    readGameTitle: (filePath) => electron_1.ipcRenderer.invoke('read-game-title', filePath),
});
electron_1.contextBridge.exposeInMainWorld('brightness', {
    get: () => electron_1.ipcRenderer.invoke('brightness:get'),
    set: (value) => electron_1.ipcRenderer.invoke('brightness:set', value),
});
electron_1.contextBridge.exposeInMainWorld('volume', {
    get: () => electron_1.ipcRenderer.invoke('get-volume'),
    set: (level) => electron_1.ipcRenderer.invoke('set-volume', level),
    toggle: () => electron_1.ipcRenderer.invoke('toggle-mute'),
});
electron_1.contextBridge.exposeInMainWorld('games', {
    launch: (gameId) => electron_1.ipcRenderer.invoke('launch-game', gameId),
    kill: () => electron_1.ipcRenderer.invoke('kill-game'),
    onClosed: (callback) => electron_1.ipcRenderer.on('game-closed', callback),
    offClosed: (callback) => electron_1.ipcRenderer.removeListener('game-closed', callback),
});
