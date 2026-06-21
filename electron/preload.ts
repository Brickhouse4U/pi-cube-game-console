import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    getResourcesPath: () => ipcRenderer.invoke('get-resources-path'),
    readDirectory: (dirPath: string) => ipcRenderer.invoke('read-directory', dirPath),
    readGameTitle: (filePath: string) => ipcRenderer.invoke('read-game-title', filePath),
});

contextBridge.exposeInMainWorld('brightness', {
    get: () => ipcRenderer.invoke('brightness:get'),
    set: (value: number) => ipcRenderer.invoke('brightness:set', value),
});

contextBridge.exposeInMainWorld('volume', {
    get: () => ipcRenderer.invoke('get-volume'),
    set: (level: number) => ipcRenderer.invoke('set-volume', level),
    toggle: () => ipcRenderer.invoke('toggle-mute'),
});

contextBridge.exposeInMainWorld('games', {
    launch: (gameId: string) => ipcRenderer.invoke('launch-game', gameId),
    kill: () => ipcRenderer.invoke('kill-game'),
    onClosed: (callback: (...args: unknown[]) => void) => ipcRenderer.on('game-closed', callback),
    offClosed: (callback: (...args: unknown[]) => void) => ipcRenderer.removeListener('game-closed', callback),
});
