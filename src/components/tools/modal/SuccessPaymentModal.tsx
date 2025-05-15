import React from "react";
import { ReactComponent as DocValidIcon } from "../../icons/svg/documentValidationIcon.svg";
import { ReactComponent as DoneOrderIcon } from "../../icons/svg/doneOrderIcon.svg";

interface SuccessPaymentModalProps {
  onClose: () => void;
}

function SuccessPaymentModal({ onClose }: SuccessPaymentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-[28px] shadow-lg p-6 w-full max-w-[38rem] relative">
        {/* دکمه بستن */}
        <button className="absolute top-5 right-3 text-gray-500 hover:text-gray-700 flex flex-row gap-2 items-center">
          <DocValidIcon />
          <span className="font-semibold text-black">پرداخت موفق!</span>
        </button>

        {/* محتوای مودال */}
        <div className="mt-12 flex flex-col gap-6">
          {/* عنوان ها */}
          <div className="text-center flex flex-col gap-4">
            <span className="block text-2xl text-[#057A55] font-bold">
              سفارش با موفقیت ثبت شد!
            </span>
            <span className="font-semibold text-gray-700">
              لطفا نشانی و موقعیت میکروهاب‌های بافر را با رانندگان خود به اشتراک
              گذارید.
            </span>
          </div>

          {/* آیکون */}
          <div className="flex justify-center">
            <DoneOrderIcon />
          </div>

          {/* دکمه */}
          <div className="flex justify-start">
            <button
              onClick={onClose}
              className="text-white font-semibold bg-[#0E9F6E] px-[32px] py-3 rounded-[12px] text-sm"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPaymentModal;
