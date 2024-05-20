const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const processFiles = require('./scripts/processFiles'); // Your processing script

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    return result.filePaths;
});

ipcMain.handle('process-files', async (event, directoryPath) => {
    const outputFilePath = await processFiles(directoryPath);
    return outputFilePath;
});
