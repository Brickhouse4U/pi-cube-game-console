const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
  const displays = screen.getAllDisplays()

  // Use second display if available, otherwise fall back to primary
  const targetDisplay = displays[1] ?? displays[0]

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

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Temporarily open DevTools in all modes to debug
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})