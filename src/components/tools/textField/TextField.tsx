import React, { ReactNode } from "react";
import { useField, useFormikContext } from "formik";
import { FieldTheme } from "../../../models/enums/FieldTheme";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  innerClassName?: string;
  labelClassName?:string;
  help?: string | ReactNode;
  iconClassName?:string;
  value?: string;
  icon?: ReactNode;
  type?: string;
  readonly?: boolean;
  theme?: FieldTheme;
}

const TextField: React.FC<Props> = ({
  placeholder,
  label = "",
  className = "",
  innerClassName="",
  iconClassName="",
  labelClassName="",
  help,
  icon,
  name,
  type = "text",
  readonly = false,
  theme = FieldTheme.Primary,
}) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext(); // Access setFieldValue from Formik context

  const handleClear = () => {
    setFieldValue(name, ""); // Clear the value in Formik
  };

  return (
    <>
      <div className={`form-control w-full ${className} rounded-[13px] `}>
        {label && (
          <label
            className={`label text-gray-900 font-semibold text-sm ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div
          className={`flex items-center relative rounded-[13px] ${innerClassName}  
    
          `}
        >
          {icon && <div className={`p-2 absolute right-4`}>{icon}</div>}{" "}
          {/* Adjusted positioning */}
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`input ${
              readonly ? "hover:cursor-default border-none " : ""
            } w-full text-base text-[#6B7280] font-medium ${
              theme === FieldTheme.Primary ? "bg-[#FFF]" : "bg-[#F3F4F6]"
            } ${
              icon && "pr-16"
            } rounded-[12px] h-[48px] focus-within:outline-[0px]  focus-within:border-gray-400 
          `}
            disabled={readonly}
          />
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
      </div>
      {touched && error ? (
        <p className="text-error text-sm mt-1">{error}</p>
      ) : (
        help && <p className="text-gray-500 text-sm mt-1">{help}</p>
      )}
    </>
  );
};

export default TextField;
