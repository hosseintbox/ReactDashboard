import React from "react";

interface CompareNumbersProps {
  value1: number;
  value2: number;
}

const CompareNumbers: React.FC<CompareNumbersProps> = ({ value1, value2 }) => {
  const textColor = value2 < value1 ? "text-[#F05252]" : "text-[#0E9F6E]";

  return (
    <div className="  flex gap-1 justify-center items-center direction-rtl">
      <span className={textColor}>{value2}</span> /
      <span className="text-[#111928]">{value1}</span>
    </div>
  );
};

export default CompareNumbers;
