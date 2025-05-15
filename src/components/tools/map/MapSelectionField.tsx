import React, { useRef, useState } from "react";
import { ReactComponent as MapIcon } from "../../icons/svg/mapWhiteIcon.svg";
import { ReactComponent as RedMapIcon } from "../../icons/svg/mapRedIcon.svg";
import MapComponent from "./MapTest";

type LatLng = {
  lat: number;
  lng: number;
};

const MapSelector = ({
  value,
  onChange,
}: {
  value?: LatLng | null;
  onChange?: (val: LatLng) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeLocationRef = useRef<LatLng | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleMapClick = (latLng: LatLng) => {
    nodeLocationRef.current = latLng;
  };

  const handleConfirm = () => {
    if (nodeLocationRef.current) {
      onChange?.(nodeLocationRef.current);
    }
    closeModal();
  };

  return (
    <div className="w-full border border-gray-200 rounded-[12px] flex items-center justify-between px-4 py-2 my-6">
      <div className="text-sm text-gray-500 font-semibold">
        {value ? (
          <>
            طول <span className="text-[#0E9F6E] ml-1">{value.lng}</span>، عرض{" "}
            <span className="text-[#0E9F6E]">{value.lat}</span>
          </>
        ) : (
          "موقعیت انتخاب نشده"
        )}
      </div>

      <button
        type="button"
        onClick={openModal}
        className="bg-[#0E9F6E] text-white text-sm font-bold rounded-[8px] px-4 py-2 flex items-center gap-2"
      >
        <MapIcon className="w-4 h-4" />
        انتخاب روی نقشه
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={closeModal}
          ></div>

          <div className="relative bg-white rounded-[16px] p-6 w-full max-w-2xl h-[500px] shadow-xl z-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-row justify-between items-center w-full mb-4">
                <div className="flex items-center gap-2">
                  <RedMapIcon className="w-5 h-5" />
                  <h2 className="text-lg font-bold">نقشه</h2>
                </div>

                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-2">
                <span className="font-semibold">جستجوی موقعیت مکانی</span>
              </div>

              <div className="w-full h-[300px] rounded-[16px] overflow-hidden mb-4">
                <MapComponent
                  center={[35.6762, 51.4231]}
                  zoom={15}
                  className="w-full h-full"
                  enableMarkers={true}
                  enableRegions={true}
                  enableFullScreen={true}
                  enableMultiSelect={false}
                  enableLayerControl={true}
                  enableMapClick={true}
                  onMapClick={handleMapClick}
                />
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-[#FF866A] px-6 py-2 rounded-[10px] hover:bg-[#fa7352] transition"
              >
                <span className="text-white font-semibold">
                  تایید موقعیت مکانی
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
