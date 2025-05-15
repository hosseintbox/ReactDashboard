import React, { useRef, ReactNode } from "react";
import { Formik, Form } from "formik";
import TextField from "../textField/TextField";

interface ModalProps {
  title: string;
  titleIcon?: React.ReactNode;
  children?: ReactNode; // اجازه دادن به هر محتوایی داخل مودال
  positionClassName?: string;
  modalClassName?: string;
  onConfirm?: (values: any) => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ScanModal: React.FC<ModalProps> = ({
  title,
  titleIcon,
  children,
  positionClassName = "fixed inset-0 flex items-center justify-center backdrop-blur-[4px] bg-[#00000099] z-50",
  modalClassName = "w-96 p-5 rounded-[28px] shadow bg-white border",
  onConfirm,
  onCancel,
  confirmText = "تایید",
  cancelText = "انصراف",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCancel?.();
    }
  };

  return (
    <div
      data-aos="fade"
      className={positionClassName}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleOutsideClick}
    >
      <div ref={modalRef} className={modalClassName} role="document">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {titleIcon && <span>{titleIcon}</span>}
            <h3
              className="text-lg font-semibold text-gray-800"
              id="modal-title"
            >
              {title}
            </h3>
          </div>
        </div>

        {/* فرمی که مقدار را مدیریت می‌کند */}
        <Formik
          initialValues={{ myField: "" }}
          onSubmit={(values) => onConfirm?.(values)}
        >
          {({ setFieldValue }) => (
            <Form>
              <TextField
                name="myField"
                innerClassName="border border-[#E5E7EB]"
                label="بارکد"
                placeholder="بارکد موجود را وارد کنید."
              />
              <div className="mt-5 flex justify-start gap-2">
                <button
                  type="submit"
                  className="px-8 py-3 text-sm font-bold text-white bg-[#046C4E] rounded-[12px] hover:scale-95 transition-all"
                >
                  {confirmText}
                </button>
               {onCancel && (
                  <button
                    type="button"
                    className="px-4 py-3 text-sm font-bold text-[#046C4E] bg-[#DEF7EC] rounded-[12px] hover:scale-95 transition-all"
                    onClick={onCancel}
                  >
                    {cancelText}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ScanModal;
