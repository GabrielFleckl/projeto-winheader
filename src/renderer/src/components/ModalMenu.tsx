export function ModalMenu() {
  const openModalAdd = () => {
    window.electronAPI.openModalAdd();
  };

  const openModalDelete = () => {
    window.electronAPI.openModalDelete();
  };

  const openModalConfig = () => {
    window.electronAPI.openModalConfig();
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="rounded bg-slate-950/50 p-5 shadow-lg">
        <div className="flex w-full flex-col items-start gap-3 text-slate-50">
          <button
            className="w-full rounded border border-slate-50 px-3 py-1"
            onClick={() => {
              openModalAdd();
              window.close();
            }}
          >
            Adicionar Atalho
          </button>
          <button
            className="w-full rounded border border-slate-50 p-1"
            onClick={() => {
              openModalDelete();
              window.close();
            }}
          >
            Excluir atalhos
          </button>
          <button
            className="w-full rounded border border-slate-50 p-1"
            onClick={() => {
              openModalConfig();
              window.close();
            }}
          >
            Configurações
          </button>
          <button
            className="w-full rounded border border-slate-50 p-1"
            onClick={() => {
              window.close();
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </main>
  );
}
