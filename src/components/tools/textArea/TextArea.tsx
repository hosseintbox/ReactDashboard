import React, { ReactNode } from "react";
import { useField, useFormikContext } from "formik";
import { FieldTheme } from "../../../models/enums/FieldTheme";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  help?: string | ReactNode;
  icon?: ReactNode;
  readonly?: boolean;
  innerClassName?:string;
  theme?: FieldTheme;
  value?:string;
  rows?: number;
}

const TextArea: React.FC<Props> = ({
  placeholder,
  label = "",
  className = "",
  help,
  icon,
  name,
  readonly = false,
  innerClassName ='',
  theme = FieldTheme.Primary,
  rows = 4, 
}) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext(); 

  const handleClear = () => {
    setFieldValue(name, ""); 
  };

  return (
    <div className={`form-control w-full ${className} `}>
      {label && (
        <label className="label text-gray-900 font-semibold text-sm">
          {label}
        </label>
      )}
      <div
        className={`flex items-center relative ${innerClassName} 
        `}
      >
        {icon && <div className="p-2 absolute right-4 top-2">{icon}</div>}{" "}
        <textarea
          {...field}
          placeholder={placeholder}
          rows={rows}
          className={`textarea  p-3 w-full text-base text-[#6B7280] font-medium ${
            theme === FieldTheme.Primary ? "bg-[#FFF]" : "bg-[#F3F4F6]"
          } ${
            icon && "pr-12"
          } rounded-[12px] h-[100px] max-with-[120px] focus-within:outline-[0px] focus-within:border-gray-400 ${
            touched && error ? "input-error" : ""
          } ${readonly ? "hover:cursor-default border-none" : ""} `}
          disabled={readonly}
        />
        {/* Clear button */}
        {field.value && !readonly && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-4 top-2 text-gray-600 hover:text-gray-800 "
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

export default TextArea;
