
import React, { useRef, useState ,useEffect } from "react";
import HorizontalSelector from "../Selectore/HorizontalSelector";
import { ReactComponent as RedMapIcon } from "../../icons/svg/mapRedIcon.svg";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import NodeSvg from "../../../components/icons/components/NodeSvg";
import useStore from "../../../store/zustand/store";
import { GetHubs, UpdateBufferShippingOrder } from "../../../setting/ApiUrl";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import {
  useReactQuery,
  useReactMutation,
} from "../../hooks/query/useReactQuery";


import MapComponent from "./MapTest";
import { data } from "react-router-dom";

type LatLng = {
  lat: number;
  lng: number;
};

type HubItem = {
  id: string;
  title: string;
  nodeTypeTitle: string;
  latitude: number;
  longitude: number;
};
const MapHubSelection = ({
  selectedCard,
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  selectedCard:any
  value?: LatLng | null;
  onChange?: (val: LatLng) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const apiDetails1 = {
    url: GetHubs,
    method: HttpMethod.GET,
  };
 
  interface Marker {
    id: string;
    lat: number;
    lng: number;
    name?: string;
    popupContent: JSX.Element;
  }
  const [selectedValue, setSelectedValue] = useState<HubItem | null>(null);
  const externalRefetch =useStore((state)=>(state.refetch));
  const { data: HubData } = useReactQuery(apiDetails1);
  const nodeLocationRef = useRef<LatLng | null>(null);
  const closeModal = () => setIsOpen(false);
   const updateOrderData = {
     url: UpdateBufferShippingOrder,
     method: HttpMethod.PUT,
   };
     const {
       mutate: Mutate,
       isLoading: Loading,
       data,
       error,
     } = useReactMutation(updateOrderData);
  const handleConfirm = () => {
    if (nodeLocationRef.current) {
      onChange?.(nodeLocationRef.current);
    }
    console.log("selectedValue", selectedValue?.id);
    console.log("selectedCard.id", selectedCard.id);
    Mutate({ bundleId: selectedCard.id, nodeId: selectedValue?.id });


  };
useEffect(() => {
  if (!Loading && data) {
    if (data.data?.isSuccess) {
      CreateToast(ToastType.SUCCESS, data.data?.message);
      externalRefetch?.();
      closeModal();
    } else {
      CreateToast(ToastType.ERROR, data.data?.message || "خطایی رخ داده است");
    }
  }
}, [data, Loading]);

  const popupContent = (title: string, id: string): JSX.Element => (
    <div className="relative flex items-center justify-center flex-col bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
      <h3 className="whitespace-nowrap font-semibold">{title}</h3>
      <NodeSvg strokeColor="#FFF" className="m-1" />
    </div>
  );

  const markers: Marker[] =
    HubData?.data && HubData?.data.length > 0
      ? HubData?.data.map((item: any, index: any) => ({
          id: item.id || `${index}`,
          lat: item.latitude,
          lng: item.longitude,
          name: item.nodeTypeTitle + item.title,
          popupContent: popupContent(
            item.nodeTypeTitle + item.title,
            item.id || `${index}`
          ),
        }))
      : [];
  console.log(selectedValue);
  return (
    <div className="w-full border border-gray-200 rounded-[12px] flex items-center justify-between px-4 py-2 my-6">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-[16px] w-full max-w-2xl max-h-[90vh] shadow-xl z-10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 ">
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

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-2">
                <span className="font-semibold">جستجوی موقعیت مکانی</span>
              </div>
              <HorizontalSelector
                items={HubData?.data}
                onSelect={(val: any) => setSelectedValue(val)}
              />

              <div className="w-full h-[300px] rounded-[16px] overflow-hidden my-4">
                <MapComponent
                  focusMarkerId={selectedValue?.id}
                  center={[35.6762, 51.4231]}
                  zoom={15}
                  markers={markers}
                  className="lg:relative fixed z-0"
                  loading={true}
                  loadTime={1000}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6  flex justify-start">
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

export default MapHubSelection;
