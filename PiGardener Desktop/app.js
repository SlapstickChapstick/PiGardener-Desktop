/*********************************
 *                               *
 *    Name: PiGardener Desktop   *
 *  Author: Oliver Chapman       *
 *                               *
 *********************************/

// Module Requirements
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;

// Variables
let win;

// Function Declaration / Definition

// Draw the window on the screen
function Create_Window() {
    // Create a new BrowserWindow and set the base properties
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the main page
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/dashboard.html'),
        protocol: file,
        slashes: true
    }));

    // If the window is closed, set the value of win to null
    win.on('closed', () => {
        win = null;
    })
}

console.log("Checking for config.json...");

// When the app is ready, draw the window
app.on('ready', Create_Window);

// If all the windows created are closed...
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); // Close the window
    }
})

// When the app is activated...
app.on('actiavte', () => {
    if (win === null) {
        Create_Window();
    }
})

// IPC Listeners

// When a request is made to get the devices
ipc.on('get-devices', (event, args) => {
    var json_content = require('./config.json');
    event.reply('return-devices', json_content);
})