// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createTray = () => {
    tray = new Tray('big_blue_16.png')
    tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    tray.on('click', function (event) {
        toggleWindow()
    })
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow(({
      width: 300,
      height: 450,
      show: false,
      frame: false,
      fullscreenable: false,
      resizable: false,
      transparent: true,
  }))

  // and load the index.html of the app.
  mainWindow.loadFile(`src/app.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode: 'detach'})

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

const toggleWindow = () => {
    if (mainWindow.isVisible()) {
        mainWindow.hide()
    } else {
        showWindow()
    }
}

const getWindowPosition = () => {
    const windowBounds = mainWindow.getBounds()
    const trayBounds = tray.getBounds()

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    return {x: x, y: y}
}

const showWindow = () => {
    const position = getWindowPosition()
    mainWindow.setPosition(position.x, position.y, false)
    mainWindow.show()
    mainWindow.focus()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createTray()
    createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
