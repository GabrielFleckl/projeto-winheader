import { useEffect } from "react";
import { useData } from "../store/store";

import Clock from "../components/Clock";
import Carousel from "../components/Carousel";

export function Home() {
  const { shortcutData, setShortcutData } = useData();

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

  useEffect(() => {
    window.electronAPI.getShortcuts().then(setShortcutData);
  }, [shortcutData]);

  const shortCutsExists: boolean = shortcutData.length > 0;

  const defaultHeaderStyle = "m-auto flex items-center px-3 py-2";

  return (
    <>
      <main
        className={
          shortCutsExists
            ? defaultHeaderStyle + " justify-between"
            : defaultHeaderStyle + " justify-center"
        }
        style={{
          backgroundColor: `${backgroundColor! + transparency!} `,
          color: `${textColor}`,
          fontWeight: `${fontWeight}`,
          borderRadius: `${borderRadius}`,
          border: `${border} solid ${borderColor}`,
          width: `${headerWidth}`,
        }}
      >
        {shortCutsExists && <Carousel />}

        {enableClock ? (
          <Clock clockOrder={clockOrder} shortCutsExists={shortCutsExists} />
        ) : (
          ""
        )}
      </main>
    </>
  );
}
