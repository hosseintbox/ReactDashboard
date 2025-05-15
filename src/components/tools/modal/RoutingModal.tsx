import React, { useRef, useEffect } from "react";
import { ReactComponent as BaladIcon } from "../../icons/svg/baladIcon.svg";
import { ReactComponent as WazeIcon } from "../../icons/svg/wazeIcon.svg";
import { ReactComponent as NeshanIcon } from "../../icons/svg/neshanIcon.svg";
import {ReactComponent as StoreIcon} from "../../icons/svg/storeLocationIcon.svg";
import {ReactComponent as CopyIcon} from "../../icons/svg/copyIcon.svg";


type RoutingModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lat: string | undefined;
  lng: string | undefined;
};


function RoutingModal({ isOpen, setIsOpen, lat, lng }: RoutingModalProps) {
  console.log("lat", lat);
  console.log("lng", lng );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("لینک کپی شد!");
  };

  if (!isOpen || !lat || !lng) return null;

const routingLinks = [
  {
    name: "مسیریاب نشان",
    link: `https://neshan.org/maps/routing/car/destination/${lat},${lng}`,
    icon: <NeshanIcon />,
  },
  {
    name: "مسیریاب بلد",
    link: `https://balad.ir/directions/driving?destination=${lng},${lat}#15/${lat}/${lng}`,
    icon: <BaladIcon />,
  },
  {
    name: "مسیریاب ویز",
    link: `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    icon: <WazeIcon />,
  },
];



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative"
      >
        <div className="flex flex-row">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 left-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
          <div className="flex flex-row gap-2">
            <StoreIcon />
            <span className="font-semibold">محل میکروهاب بافر</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <div className="text-xl font-semibold text-center mt-5">
            اشتراک‌گذاری محل میکروهاب
          </div>
          <div className="text-center font-medium mb-6">
            لطفاً موقعیت محل میکروهاب بافر را از یکی از مسیر‌یاب‌های زیر با
            رانندگان خود به اشتراک بگذارید.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {routingLinks.map((route) => (
            <div
              key={route.name}
              className="flex items-center justify-between border border-gray-200 rounded-[12px] px-4"
            >
              <div className="flex items-center gap-3">
                {route.icon}
                <span className="font-semibold">{route.name}</span>
              </div>
              <button
                className="flex items-center gap-1 bg-[#0E9F6E] text-white text-sm px-3 py-1.5 rounded-[8px] transition"
                onClick={() => handleCopy(route.link)}
              >
                <CopyIcon /> کپی لینک مسیر‌یابی
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default RoutingModal;