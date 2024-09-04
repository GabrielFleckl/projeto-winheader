import { create } from "zustand";

import { useDataTypes } from "src/types/store";

export const useData = create<useDataTypes>((set) => ({
  shortcutData: [], // valor inicial
  setShortcutData: (newShortcut: any) => set({ shortcutData: newShortcut }),

  backgroundColor: "#000000", // valor inicial
  setBackgroundColor: (color) => set({ backgroundColor: color }),

  transparency: "FF", // valor inicial
  setTransparency: (value) => set({ transparency: value }),

  textColor: "#f9f9f9", // valor inicial
  setTextColor: (value) => set({ textColor: value }),

  fontWeight: "500", // valor inicial
  setFontWeight: (value) => set({ fontWeight: value }),

  borderRadius: "9999px",
  setBorderRadius: (value) => set({ borderRadius: value }),

  border: "0px",
  setBorder: (value) => set({ border: value }),

  borderColor: "#f9f9f9",
  setBorderColor: (value) => set({ borderColor: value }),

  clockOrder: false,
  setClockOrder: (value: boolean) => set({ clockOrder: value }),

  enableClock: true,
  setEnableClock: (value: boolean) => set({ enableClock: value }),

  headerWidth: "75%",
  setHeaderWidth: (value: string) => set({ headerWidth: value }),

  spaceTop: 8,
  setSpaceTop: (value: number) => set({ spaceTop: value }),
}));
