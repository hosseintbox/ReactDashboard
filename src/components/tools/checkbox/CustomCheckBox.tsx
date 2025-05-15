import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-4 h-4 flex items-center justify-center cursor-pointer rounded-[3px] border transition-all duration-300 ${
        checked ? "bg-green-500 border-green-500" : "bg-white border-gray-900"
      }`}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
