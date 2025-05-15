import React, { ReactNode } from "react";
import { useField, useFormikContext } from "formik";
import { FieldTheme } from "../../../models/enums/FieldTheme";
import {ReactComponent as UploadIcon} from "../../../components/icons/svg/uploadIcon.svg";
interface Props {
    name: string;
    label?: string;
    className?: string;
    help?: string | ReactNode;
    icon?: ReactNode;
    readonly?: boolean;
    theme?: FieldTheme;
}

const FileUpload: React.FC<Props> = ({
                                         label = "",
                                         className = "",
                                         help,
                                         icon,
                                         name,
                                         readonly = false,
                                         theme = FieldTheme.Primary,
                                     }) => {
    const [field, { error, touched }] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFieldValue(name, file);
        }
    };

    const handleClear = () => {
        setFieldValue(name, null); // Clear the file in Formik
    };

    return (
        <div className={`form-control w-full ${className} rounded-[13px]`}>
            {label && (
                <label className="label text-gray-900 font-semibold text-sm">
                    {label}
                </label>
            )}
            <div className="flex items-center relative">
                {icon && <div className="p-2 absolute right-4">{icon}</div>}

                {/* This is the hidden input */}
                <input
                    {...field}
                    type="file"
                    className="hidden"
                    disabled={readonly}
                    onChange={handleFileChange}
                    id={`file-upload-${name}`} // ID for label connection
                />

                {/* This is the button styled as a file input */}
                <label
                    htmlFor={`file-upload-${name}`}
                    className={` ${readonly ? "cursor-not-allowed" : "cursor-pointer"} h-[48px] hover:scale-[99%] active:scale-100 transition-all w-full border-dashed border-gray-300 border bg-white text-[#111928] font-bold rounded-lg py-2 text-sm flex justify-center items-center`}>
                    {field.value ? field.value.name : <span className={'flex items-center gap-2'}><UploadIcon/>بارگذاری فایل</span>}
                </label>

                {/* Clear button */}
                {field.value && !readonly && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute left-4 top-2 text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                )}
            </div>
            {touched && error ? (
                <p className="text-error text-sm mt-1">{error}</p>
            ) : (
                help && <p className="text-gray-500 text-sm mt-1">{help}</p>
            )}
        </div>
    );
};

export default FileUpload;
