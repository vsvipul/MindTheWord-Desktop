const { app, BrowserWindow } = require('electron');
const path = require('path');
const os = require('os');

let win;

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('src/index.html');
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
