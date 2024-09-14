import { useEffect, useState } from "react";
import { useData } from "../store/store";
import { Shortcut } from "../../../types/electron";

export function ModalAdd() {
  const { shortcutData, setShortcutData } = useData();

  const [newShortcutName, setNewShortcutName] = useState("");
  const [newShortcutPath, setNewShortcutPath] = useState("");

  const shortCutsLimit: boolean = shortcutData.length >= 20;

  const handleOpenFile = () => {
    window.electronAPI.openFile().then(setNewShortcutPath);
  };

  const addShortcut = () => {
    if (!shortCutsLimit) {
      const newShortcut: Shortcut = {
        name: newShortcutName,
        path: newShortcutPath,
      };
      window.electronAPI.addShortcut(newShortcut).then(setShortcutData);
      setNewShortcutName("");
      setNewShortcutPath("");
      // window.close();
    }
  };

  const closeModal = () => {
    window.close();
  };

  useEffect(() => {
    window.electronAPI.getShortcuts().then(setShortcutData);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative rounded bg-slate-950/50 p-5 text-slate-50 shadow-lg">
        <div
          onClick={() => closeModal()}
          className="absolute right-0 top-0 grid h-[32px] w-[32px] cursor-pointer place-items-center rounded bg-slate-950 text-lg text-slate-50"
        >
          x
        </div>
        <h2 className="mb-4 text-xl">Adicionar Novo Atalho</h2>
        <div>
          <div className="mb-3 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome do atalho"
              className="border p-2 text-slate-950"
              maxLength={8}
              minLength={1}
              value={newShortcutName}
              onChange={(e) => setNewShortcutName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Caminho do atalho"
              className="border p-2 text-slate-950"
              value={newShortcutPath}
              onChange={(e) => setNewShortcutPath(e.target.value)}
            />
          </div>

          <div className="flex justify-start gap-3">
            <button
              className="w-[150px] bg-blue-500 p-2"
              onClick={() => handleOpenFile()}
            >
              Procurar...
            </button>
            <button
              className="w-[150px] bg-green-500 p-2"
              onClick={addShortcut}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
