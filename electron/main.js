const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow() {
  const displays = screen.getAllDisplays()

  const targetDisplay = displays[1]

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
      nodeIntegration: true
    }
  })

  // Load the Vite dev server in development
  win.webContents.openDevTools() // ← ADD THIS
  win.loadURL('http://localhost:5173')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})