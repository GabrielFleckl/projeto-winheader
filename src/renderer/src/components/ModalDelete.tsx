import { useEffect } from "react";

import { useData } from "../store/store";
import { Shortcut } from "src/types/electron";

export function ModalDelete() {
  const { shortcutData, setShortcutData } = useData();

  const shortCutsExists: boolean = shortcutData.length > 0;

  const removeShortcut = (name: string) => {
    window.electronAPI.removeShortcut(name).then(setShortcutData);
  };

  const closeModal = () => {
    window.close();
  };

  useEffect(() => {
    window.electronAPI.getShortcuts().then(setShortcutData);
  }, [shortcutData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative rounded bg-slate-950/50 p-10 text-slate-50 shadow-lg">
        <div
          onClick={() => closeModal()}
          className="absolute right-0 top-0 grid h-[32px] w-[32px] cursor-pointer place-items-center rounded bg-slate-950 text-lg text-slate-50"
        >
          x
        </div>
        <p className="font-bold text-slate-300">
          {shortCutsExists ? "" : "Nenhum atalho adicionado!"}
        </p>
        {shortCutsExists ? (
          <h2 className="mb-3 text-xl">Gerenciar Atalhos</h2>
        ) : (
          ""
        )}
        <ul className="grid grid-cols-2 items-center gap-3">
          {shortcutData.map((shortcut: Shortcut) => (
            <div>
              <li
                key={shortcut.name}
                className="flex items-center justify-between gap-3 bg-slate-950 p-3 text-slate-300"
              >
                <span>{shortcut.name}</span>
                <button
                  className="bg-red-500 p-1 text-slate-950"
                  onClick={() => removeShortcut(shortcut.name)}
                >
                  Excluir
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
