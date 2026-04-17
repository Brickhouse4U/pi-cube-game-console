const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getResourcesPath: () => ipcRenderer.invoke('get-resources-path'),
});

contextBridge.exposeInMainWorld('brightness', {
    get: () => ipcRenderer.invoke('brightness:get'),
    set: (value) => ipcRenderer.invoke('brightness:set', value),
});

contextBridge.exposeInMainWorld('volume', {
    get: () => ipcRenderer.invoke('get-volume'),
    set: (level) => ipcRenderer.invoke('set-volume', level),
    toggle: () => ipcRenderer.invoke('toggle-mute'),
});