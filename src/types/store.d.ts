import { Shortcut } from "src/types/electron";

export type useDataTypes = {
  shortcutData: Shortcut[];
  setShortcutData: (newShortcut: any) => void;

  backgroundColor: string;
  setBackgroundColor: (color: string) => void;

  transparency: string;
  setTransparency: (value: string) => void;

  textColor: string;
  setTextColor: (color: string) => void;

  fontWeight: string;
  setFontWeight: (value: string) => void;

  borderRadius: string;
  setBorderRadius: (value: string) => void;

  border: string;
  setBorder: (value: string) => void;

  borderColor: string;
  setBorderColor: (value: string) => void;

  clockOrder: boolean;
  setClockOrder: (value: boolean) => void;

  enableClock: boolean;
  setEnableClock: (value: boolean) => void;

  headerWidth: string;
  setHeaderWidth: (value: string) => void;

  spaceTop:number;
  setSpaceTop: (value:number) => void;
};
