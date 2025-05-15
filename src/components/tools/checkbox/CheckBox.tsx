import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  className?: string;
}

const Checkbox: React.FC<Props> = ({ name, label, className = "" }) => {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          {...field}
          className={`bg-[#E5E7EB] border-[#E5E7EB] checkbox 
            checked:bg-[#FF7959]  checked:border-[#FF7959]
            `}
        />
        <span className="label-text ml-2 mr-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
