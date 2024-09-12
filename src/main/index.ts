import {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  dialog,
  Tray,
  Menu,
  IpcMainInvokeEvent,
} from "electron";

import path from "path";
import fs from "fs";
import { exec } from "child_process";

import icon from "../../resources/icon.ico?asset";

import { Shortcut, Settings } from "../types/electron";

import createFileIfNotExists from "../utils/createFileIfNotExists"
import createModal from "../utils/createModal";

// Dev Path files

const shortcutsFilePath = path.join(__dirname, "../../config/shortcuts.json");
const settingsFilePath = path.join(__dirname, "../../config/settings.json");

// Prod Path files

// const shortcutsFilePath = path.join(
//   process.resourcesPath,
//   "config/shortcuts.json",
// );
// const settingsFilePath = path.join(
//   process.resourcesPath,
//   "config/settings.json",
// );


const defaultShortcutsContent: Shortcut[] = [];
const defaultSettingsContent: Settings = {
  backgroundColor: "#000000",
  transparency: "FF",
  textColor: "#f9f9f9",
  fontWeight: "500",
  borderRadius: "9999px",
  border: "0px",
  borderColor: "#f9f9f9",
  clockOrder: false,
  enableClock: true,
  headerWidth: "75%",
};

createFileIfNotExists(shortcutsFilePath, defaultShortcutsContent);
createFileIfNotExists(settingsFilePath, defaultSettingsContent);

let mainWindow: BrowserWindow | null | undefined;
let tray: Tray | null;

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 47, // 47
    x: (width - 1000) / 2,
    y: 10,
    movable: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
    frame: false,
    transparent: true,
    show: false,
    skipTaskbar: true,
    title: "WinHeader",
    icon: icon,
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));

  tray!.on("click", () => {
    mainWindow!.show();
    mainWindow!.focus();
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Mostrar",
      click: () => {
        mainWindow!.show();
        mainWindow!.focus();
      },
    },
    {
      label: "Esconder",
      click: () => {
        mainWindow!.hide();
      },
    },
    {
      label: "Configuração",
      click: () => {
        createModal("/modalMenu", mainWindow!)
      },
    },
    {
      label: "Sair",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray!.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  tray = new Tray(icon);
  tray.setToolTip("WinHeader");

  createWindow();

  mainWindow!.once("ready-to-show", () => {
    mainWindow!.show();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("get-settings", () => {
  try {
    if (
      fs.existsSync(settingsFilePath) &&
      fs.statSync(settingsFilePath).size > 0
    ) {
      const data = fs.readFileSync(settingsFilePath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading settings file:", error);
  }
  return defaultSettingsContent;
});

ipcMain.handle("save-settings", (_event, settings) => {
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
});

ipcMain.handle("reset-settings", (_event) => {
  fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettingsContent, null, 2));
});

ipcMain.handle("get-shortcuts", (): Shortcut[] => {
  return JSON.parse(fs.readFileSync(shortcutsFilePath, "utf8")) as Shortcut[];
});

ipcMain.handle(
  "add-shortcut",
  (_event: IpcMainInvokeEvent, shortcut: Shortcut): Shortcut[] => {
    const shortcuts = JSON.parse(
      fs.readFileSync(shortcutsFilePath, "utf8"),
    ) as Shortcut[];
    shortcuts.push(shortcut);
    fs.writeFileSync(shortcutsFilePath, JSON.stringify(shortcuts, null, 2));
    return shortcuts;
  },
);

ipcMain.handle(
  "remove-shortcut",
  (_event: IpcMainInvokeEvent, name: string): Shortcut[] => {
    let shortcuts = JSON.parse(
      fs.readFileSync(shortcutsFilePath, "utf8"),
    ) as Shortcut[];
    shortcuts = shortcuts.filter((shortcut) => shortcut.name !== name);
    fs.writeFileSync(shortcutsFilePath, JSON.stringify(shortcuts, null, 2));
    return shortcuts;
  },
);

ipcMain.on("open-app", (_event, appPath) => {
  exec(`"${appPath}"`, (error) => {
    if (error) {
      console.error(`Error opening ${appPath}:`, error);
    }
  });
});

ipcMain.handle("dialog:openFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Executables", extensions: ["exe"] }],
    title: "Selecione o executável para preencher o caminho.",
  });

  if (canceled) {
    return null;
  } else {
    console.log(filePaths);
    return filePaths[0];
  }
});

ipcMain.handle("restart-app", (_event) => {
  app.relaunch();

  app.exit(0);
});

// MODAL

ipcMain.on("open-modal-add", (_event) => {
  createModal("/modalAdd", mainWindow!)
});

ipcMain.on("open-modal-delete", (_event) => {
  createModal("/modalDelete", mainWindow!)
});

ipcMain.on("open-modal-config", (_event) => {
  createModal("/modalConfig", mainWindow!)
});

ipcMain.on("open-modal-menu", (_event) => {
  createModal("/modalMenu", mainWindow!)
});