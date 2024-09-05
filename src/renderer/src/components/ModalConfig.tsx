import { ChangeEvent, useEffect } from "react";
import { useData } from "../store/store";

export function ModalConfig() {
  const backgroundColor = useData((state) => state.backgroundColor);
  const setBackgroundColor = useData((state) => state.setBackgroundColor);

  const transparency = useData((state) => state.transparency);
  const setTransparency = useData((state) => state.setTransparency);

  const textColor = useData((state) => state.textColor);
  const setTextColor = useData((state) => state.setTextColor);

  const fontWeight = useData((state) => state.fontWeight);
  const setFontWeight = useData((state) => state.setFontWeight);

  const borderRadius = useData((state) => state.borderRadius);
  const setBorderRadius = useData((state) => state.setBorderRadius);

  const border = useData((state) => state.border);
  const setBorder = useData((state) => state.setBorder);

  const borderColor = useData((state) => state.borderColor);
  const setBorderColor = useData((state) => state.setBorderColor);

  const clockOrder = useData((state) => state.clockOrder);
  const setClockOrder = useData((state) => state.setClockOrder);

  const enableClock = useData((state) => state.enableClock);
  const setEnableClock = useData((state) => state.setEnableClock);

  const headerWidth = useData((state) => state.headerWidth);
  const setHeaderWidth = useData((state) => state.setHeaderWidth);

  const handleSaveConfig = () => {
    window.electronAPI.saveSettings({
      backgroundColor,
      transparency,
      textColor,
      fontWeight,
      borderRadius,
      clockOrder,
      enableClock,
      border,
      borderColor,
      headerWidth,
    });

    window.electronAPI.restartApp();
  };

  const handleResetConfig = () => {
    window.electronAPI.resetSetting();
    window.electronAPI.restartApp();
  };

  useEffect(() => {
    window.electronAPI.getSettings().then((settings) => {
      setBackgroundColor(settings.backgroundColor);
      setTransparency(settings.transparency);
      setTextColor(settings.textColor);
      setFontWeight(settings.fontWeight);
      setBorderRadius(settings.borderRadius);
      setClockOrder(settings.clockOrder);
      setEnableClock(settings.enableClock);
      setBorder(settings.border);
      setBorderColor(settings.borderColor);
      setHeaderWidth(settings.headerWidth);
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative h-[70vh] overflow-y-scroll rounded bg-slate-950/50 p-5 text-slate-50 shadow-lg">
        <div
          onClick={() => window.close()}
          className="absolute right-0 top-0 grid h-[32px] w-[32px] cursor-pointer place-items-center bg-slate-950 text-lg text-slate-50"
        >
          x
        </div>

        <h2 className="mb-4 text-xl">Configurações</h2>

        <div className="flex w-[500px] flex-col gap-3">
          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Tamanho do WinHeader</p>

            <div className="flex flex-col items-end justify-center">
              <label className="flex gap-1">
                <p>30%</p>
                <input
                  type="radio"
                  name="headerWidth"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeaderWidth(e.target.value)
                  }
                  checked={headerWidth === "30%"}
                  value={"30%"}
                />
              </label>
              <label className="flex gap-1">
                <p>50%</p>
                <input
                  type="radio"
                  name="headerWidth"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeaderWidth(e.target.value)
                  }
                  checked={headerWidth === "50%"}
                  value={"50%"}
                />
              </label>
              <label className="flex gap-1">
                <p>75%</p>
                <input
                  type="radio"
                  name="headerWidth"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeaderWidth(e.target.value)
                  }
                  checked={headerWidth === "75%"}
                  value={"75%"}
                />
              </label>
              <label className="flex gap-1">
                <p>100%</p>
                <input
                  type="radio"
                  name="headerWidth"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHeaderWidth(e.target.value)
                  }
                  checked={headerWidth === "100%"}
                  value={"100%"}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Cor de fundo</p>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Transparência do fundo</p>

            <div className="flex flex-col items-end justify-center">
              <label className="flex gap-1">
                <p>0%</p>
                <input
                  type="radio"
                  name="transparency"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTransparency(e.target.value)
                  }
                  checked={transparency === "00"}
                  value={"00"}
                />
              </label>
              <label className="flex gap-1">
                <p>20%</p>
                <input
                  type="radio"
                  name="transparency"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTransparency(e.target.value)
                  }
                  checked={transparency === "33"}
                  value={"33"}
                />
              </label>
              <label className="flex gap-1">
                <p>50%</p>
                <input
                  type="radio"
                  name="transparency"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTransparency(e.target.value)
                  }
                  checked={transparency === "80"}
                  value={"80"}
                />
              </label>
              <label className="flex gap-1">
                <p>80%</p>
                <input
                  type="radio"
                  name="transparency"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTransparency(e.target.value)
                  }
                  checked={transparency === "CC"}
                  value={"CC"}
                />
              </label>
              <label className="flex gap-1">
                <p>100%</p>
                <input
                  type="radio"
                  name="transparency"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTransparency(e.target.value)
                  }
                  checked={transparency === "FF"}
                  value={"FF"}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Cor do texto</p>
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Tipo de texto</p>
            <div className="flex flex-col items-end justify-center">
              <label className="flex gap-1">
                <p>Leve</p>
                <input
                  type="radio"
                  name="text-weight"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFontWeight(e.target.value)
                  }
                  checked={fontWeight === "200"}
                  value={"200"}
                />
              </label>
              <label className="flex gap-1">
                <p>Regular</p>
                <input
                  type="radio"
                  name="text-weight"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFontWeight(e.target.value)
                  }
                  checked={fontWeight === "500"}
                  value={"500"}
                />
              </label>
              <label className="flex gap-1">
                <p>Pesado</p>
                <input
                  type="radio"
                  name="text-weight"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFontWeight(e.target.value)
                  }
                  checked={fontWeight === "700"}
                  value={"700"}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Cor da borda</p>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => {
                setBorderColor(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Espessura da borda</p>

            <div className="flex flex-col items-end justify-center">
              <label className="flex gap-1">
                <p>Nenhum</p>
                <input
                  type="radio"
                  name="border"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorder(e.target.value)
                  }
                  checked={border === "0px"}
                  value={"0px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Leve</p>
                <input
                  type="radio"
                  name="border"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorder(e.target.value)
                  }
                  checked={border === "1px"}
                  value={"1px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Médio</p>
                <input
                  type="radio"
                  name="border"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorder(e.target.value)
                  }
                  checked={border === "2px"}
                  value={"2px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Pesado</p>
                <input
                  type="radio"
                  name="border"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorder(e.target.value)
                  }
                  checked={border === "3px"}
                  value={"3px"}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-slate-950/50 p-2">
            <p>Tipo de arredondamento</p>
            <div className="flex flex-col items-end justify-center">
              <label className="flex gap-1">
                <p>Nenhum</p>
                <input
                  type="radio"
                  name="border-radius"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorderRadius(e.target.value)
                  }
                  checked={borderRadius === "0px"}
                  value={"0px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Leve</p>
                <input
                  type="radio"
                  name="border-radius"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorderRadius(e.target.value)
                  }
                  checked={borderRadius === "4px"}
                  value={"4px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Médio</p>
                <input
                  type="radio"
                  name="border-radius"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorderRadius(e.target.value)
                  }
                  checked={borderRadius === "8px"}
                  value={"8px"}
                />
              </label>
              <label className="flex gap-1">
                <p>Pesado</p>
                <input
                  type="radio"
                  name="border-radius"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBorderRadius(e.target.value)
                  }
                  checked={borderRadius === "9999px"}
                  value={"9999px"}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-1 rounded bg-slate-950/50 p-2">
            <div className="flex justify-between">
              <p>Mudar ordem do relógio</p>
              <input
                type="checkbox"
                checked={clockOrder}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setClockOrder(e.target.checked)
                }
              />
            </div>

            <div className="flex justify-between">
              <p>Habilitar relógio</p>
              <input
                type="checkbox"
                checked={enableClock}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEnableClock(e.target.checked)
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              className="w-[150px] bg-blue-500 p-2"
              onClick={handleSaveConfig}
            >
              Salvar
            </button>
            <button
              className="w-[150px] bg-blue-500 p-2"
              onClick={handleResetConfig}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
