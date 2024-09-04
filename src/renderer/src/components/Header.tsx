import { useState, useEffect } from "react";
import { useData } from "../store/store";

import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

register();

export function Header() {
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

  const [time, setTime] = useState<Date>(new Date());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const date = String(time.getDate()).padStart(2, "0");

  const hour = String(time.getHours()).padStart(2, "0");
  const min = String(time.getMinutes()).padStart(2, "0");
  const sec = String(time.getSeconds()).padStart(2, "0");

  const openApp = (appPath: string) => {
    window.electronAPI.openApp(appPath);
  };

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
        {shortCutsExists && (
          <Swiper
            modules={[Mousewheel]}
            direction={"horizontal"}
            mousewheel
            spaceBetween={0}
            centeredSlides={false}
            slidesPerView="auto"
            className="w-full"
          >
            {shortcutData.map((shortcut: any) => (
              <SwiperSlide key={shortcut.name} className="flex-shrink-0">
                <div className="" onClick={() => openApp(shortcut.path)}>
                  <p className="cursor-pointer capitalize">{shortcut.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {enableClock ? (
          <ul className="flex select-none flex-nowrap gap-1 text-nowrap">
            {shortCutsExists ? <li>|</li> : ""}
            <div
              className={
                clockOrder
                  ? "flex flex-row-reverse gap-2 text-nowrap"
                  : "flex gap-2 text-nowrap"
              }
            >
              <li>
                {date}/{month}/{year}
              </li>
              <li>
                {hour}:{min}:{sec}
              </li>
            </div>
          </ul>
        ) : (
          ""
        )}
      </main>
    </>
  );
}


