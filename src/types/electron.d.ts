export type Settings = {
  backgroundColor: string;
  transparency: string;
  textColor: string;
  fontWeight: string;
  borderRadius: string;
  clockOrder: boolean;
  enableClock: boolean;
  border:string;
  borderColor: string;
  headerWidth: string;
};

export type Shortcut = {
  name: string;
  path: string;
};

export interface ElectronAPI {
  openApp: (appPath: string) => void;
  getShortcuts: () => Promise<Shortcut[]>;
  addShortcut: (shortcut: Shortcut) => Promise<void>;
  removeShortcut: (name: string) => Promise<void>;
  updateShortcut: (shortcut: Shortcut) => Promise<void>;
  openFile: () => Promise<string>;
  getSettings: () => Promise<Settings>;
  resetSetting: () => Promise<void>;
  saveSettings: (settings: Settings) => Promise<void>;
  openModalAdd: () => Promise<void>;
  openModalDelete: () => Promise<void>;
  openModalConfig: () => Promise<void>;
  openModalMenu: () => Promise<void>;
  restartApp: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}