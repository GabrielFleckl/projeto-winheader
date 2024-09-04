import path from "path";
import {

  BrowserWindow

} from "electron";
function createModal(hash: string, parent: BrowserWindow) {
  const modalWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: parent!,
    modal: true,
    show: false,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  modalWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
    hash,
  });

  modalWindow.once("ready-to-show", () => {
    modalWindow.show();
  });

  return modalWindow;
}

export default createModal