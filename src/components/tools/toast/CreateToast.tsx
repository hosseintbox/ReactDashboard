import { toast } from "react-toastify";
import { ToastType } from "../../../models/enums/ToastType";
import "react-toastify/dist/ReactToastify.css";

interface IToast {
  (toastType: ToastType, message: string, options?: object): void;
}

export const CreateToast: IToast = (
  toastType: ToastType,
  message: string,
  options?: object
) => {
  toast(message, {
    type: toastType,
    ...options,
  });
};
