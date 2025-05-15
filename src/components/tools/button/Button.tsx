import React, { ReactNode } from "react";

interface Props {
  type?: "submit" | "button" | "reset";
  children?: string | ReactNode;
  onClick?: any;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<Props> = ({
  type,
  disabled,
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-[#FF7959] text-center text-white text-sm  font-bold rounded-[12px] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
