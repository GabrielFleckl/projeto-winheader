import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

register();

import { useData } from "../store/store";
import { Shortcut } from "~/src/types/electron";


function Carousel() {
  const { shortcutData } = useData();

  const openApp = (appPath: string) => {
    window.electronAPI.openApp(appPath);
  };

  return (
    <Swiper
    modules={[Mousewheel]}
    direction={"horizontal"}
    mousewheel
    spaceBetween={0}
    centeredSlides={false}
    slidesPerView="auto"
    className="w-full"
  >
    {shortcutData.map((shortcut: Shortcut) => (
      <SwiperSlide key={shortcut.name} className="flex-shrink-0">
        <div  onClick={() => openApp(shortcut.path)}>
          <p className="cursor-pointer capitalize">{shortcut.name}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default Carousel