const { app, BrowserWindow } = require("electron");
// const electron = require("electron");

// Enable live reload for all the files inside your project directory
require("electron-reload")(__dirname);
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    resizable: true,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
