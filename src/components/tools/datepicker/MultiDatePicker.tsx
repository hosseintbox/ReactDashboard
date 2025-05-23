import React from "react";
import DatePicker from "react-multi-date-picker";
import { CalenderIcon } from "../../../icons";

interface Props {
  value: any;
  setFieldValue: (field: string, value: any) => void;
  label?: string;
  name?: string;
  placeholder?: string;
}

const MultiDatePicker = ({
  placeholder = "Select a date",
  value,
  setFieldValue,
  label = "Date",
  name = "toDate",
}: Props) => {
  return (
    <div className="w-full max-w-xs">
      <label className="mb-1 text-right block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 pointer-events-none">
          <CalenderIcon />
        </span>
        <DatePicker
          value={value}
          onChange={(date: any) => {
            setFieldValue(name, date ? date.toDate().toISOString() : null);
          }}
          placeholder={placeholder}
          calendarPosition="bottom-right"
          inputClass="pl-10 pr-4 border border-gray-300 rounded-[12px] py-2 text-[#073054] text-base font-semibold w-full bg-white text-right"
          containerClassName="w-full"
        />
      </div>
    </div>
  );
};

export default MultiDatePicker;
