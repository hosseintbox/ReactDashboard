import React from "react";

type BadgeProps = {
  className?:string;
  text: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

const Badge: React.FC<BadgeProps> = ({
  className = "w-[70px]",
  text,
  bgColor = "#fdf6b2",
  borderColor = "#faca15",
  textColor = "#8e4b10",
}) => {
  return (
    <div
      className={`${className} h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border`}
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <div
        className="text-right text-xs whitespace-nowrap leading-none"
        style={{color: textColor}}
      >
        {text}
      </div>
    </div>
  );
};

export default Badge;
