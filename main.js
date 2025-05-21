const { app, globalShortcut } = require("electron");
const path = require("path");
const { menubar } = require("menubar");

const mb = menubar({
  browserWindow: { width: 500, height: 660 },
  preloadWindow: true,
  icon: path.join(__dirname, "/MenuIcon.png"),
  webPreferences: {
    partition: "persist:ytmenuaplayer",
  },
});

mb.app.commandLine.appendSwitch(
  "disable-backgrounding-occluded-windows",
  "true"
);

mb.on("ready", () => {
  console.log("app is ready");

  win = mb.window;
  // win.openDevTools();

  win.loadURL("https://music.youtube.com/");

  // mb.on('after-create-window', () => {});
  // win.webContents.once("dom-ready", () => {});
});



app.commandLine.appendSwitch('enable-features', 'GlobalShortcutsPortal')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    if (process.platform !== "darwin") app.quit();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+X')
  globalShortcut.unregisterAll()
});
