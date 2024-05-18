const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    processFiles: (directoryPath) => ipcRenderer.invoke('process-files', directoryPath)
});
