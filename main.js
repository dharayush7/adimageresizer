const fs = require("fs");
const os = require("os");
const resizeImg = require("resize-img");
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const path = require("path");

// Platfrom and dev checking
process.env.NODE_ENV = "production";
const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

let mainWindow;
// function to create Mani window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "AD Image Resizer",
    width: isDev ? 1000 : 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // render Main Window
  mainWindow.loadFile(path.join(__dirname, "./UI/index.html"));
}

// Creat About Window
function creatAboutWndow() {
  const aboutWindow = new BrowserWindow({
    title: "About AD Image Resizer",
    width: 300,
    height: 300,
  });

  // render About Window
  aboutWindow.loadFile(path.join(__dirname, "./UI/about.html"));
}

// Start Window
app.whenReady().then(() => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menuTamplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("close", () => {
    mainWindow = null;
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menuTamplate = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              lable: "About",
              click: creatAboutWndow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: creatAboutWndow,
            },
          ],
        },
      ]
    : []),
];

// response to ipcRenderer

ipcMain.on("image:resize", (e, options) => {
  options.dest = path.join(os.homedir(), "Downloads", "ADImageResizer");
  resizeImage(options);
});

// resize image
async function resizeImage({ imgPath, width, height, dest }) {
  try {
    const newPath = await resizeImg(fs.readFileSync(imgPath), {
      width: +width,
      height: +height,
    });

    const fileName = `${
      path.basename(imgPath).split(".")[0]
    }-${width}X${height}.${path.basename(imgPath).split(".")[1]}`;

    // check dest folder existance
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    fs.writeFileSync(path.join(dest, fileName), newPath);

    mainWindow.webContents.send("image:done");

    shell.openPath(dest);
  } catch (error) {
    console.log(error);
  }
}

// Close Window
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
