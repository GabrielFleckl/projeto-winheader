import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openApp: (appPath) => ipcRenderer.send("open-app", appPath),
  getShortcuts: () => ipcRenderer.invoke("get-shortcuts"),
  addShortcut: (shortcut) => ipcRenderer.invoke("add-shortcut", shortcut),
  removeShortcut: (name) => ipcRenderer.invoke("remove-shortcut", name),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  getSettings: () => ipcRenderer.invoke("get-settings"),
  resetSetting: () => ipcRenderer.invoke("reset-settings"),
  saveSettings: (settings) => ipcRenderer.invoke("save-settings", settings),
  openModalAdd: () => ipcRenderer.send("open-modal-add"),
  openModalDelete: () => ipcRenderer.send("open-modal-delete"),
  openModalConfig: () => ipcRenderer.send("open-modal-config"),
  openModalMenu: () => ipcRenderer.send("open-modal-menu"),
  restartApp: () => ipcRenderer.invoke("restart-app")
});
