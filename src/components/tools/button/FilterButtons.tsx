import React, { useRef, useEffect, useState } from "react";

interface Button {
  id: string;
  value: any;
  label: string;
  icon?: any;
  category: string;
}

interface DropdownButton extends Button {
  options?: { id: string; label: string }[];
}

interface FilterButtonsProps {
  buttons: DropdownButton[];
  onButtonClick: (button: Button, selectedOption?: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  buttons,
  onButtonClick,
}) => {
  const activeButtonsRef = useRef<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const dropdownRef = useRef<HTMLDivElement>(null); // **اضافه کردن ref برای مدیریت کلیک بیرون**

  useEffect(() => {
    const isActiveDefault = buttons.find((btn) => btn.category === "isActive");
    if (isActiveDefault) {
      activeButtonsRef.current["isActive"] = isActiveDefault.id;
    }
  }, [buttons]);

  const handleButtonClick = (button: DropdownButton): void => {
    const { category, id, options } = button;

    if (options) {
      setOpenDropdown(openDropdown === id ? null : id);

      // اگر گزینه‌ای انتخاب شده بود، غیرفعال کند
      if (selectedOptions[id]) {
        setSelectedOptions((prev) => {
          const newOptions = { ...prev };
          delete newOptions[id];
          return newOptions;
        });
      }
    } else {
      if (activeButtonsRef.current[category] === id) {
        delete activeButtonsRef.current[category];
      } else {
        activeButtonsRef.current[category] = id;
      }
      onButtonClick(button);
    }
  };

  const handleOptionSelect = (
    button: DropdownButton,
    option: { id: string; label: string }
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [button.id]: option.label,
    }));
    setOpenDropdown(null);
    onButtonClick(button, option.id);
  };

  const isActive = (button: DropdownButton): boolean => {
    if (button.options) {
      return !!selectedOptions[button.id];
    }
    return activeButtonsRef.current[button.category] === button.id;
  };

  // **بستن Dropdown هنگام کلیک بیرون**
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex items-center justify-start flex-wrap w-full gap-[10px] mt-[25px]"
    >
      {buttons.map((button) => (
        <div key={button.id} className="relative">
          <div
            className={`min-w-[100px] hover:scale-95 active:scale-100 transition-all shadow h-[34px] px-3 py-1.5 rounded-[28px] justify-center items-center gap-2.5 inline-flex cursor-pointer 
            ${
              isActive(button)
                ? "bg-[#FF7959] text-white"
                : "bg-gray-200 text-[#111928]"
            }`}
            onClick={() => handleButtonClick(button)}
          >
            <div className="text-right text-sm font-bold">
              {button.options
                ? selectedOptions[button.id] || button.label
                : button.label}
            </div>
            {button.icon && <span className="text-lg">{button.icon}</span>}
          </div>

          {openDropdown === button.id && button.options && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-[#E5E7EB] shadow-lg rounded-[16px] z-10">
              <ul className="py-1">
                {button.options.map((option) => (
                  <li
                    key={option.id}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect(button, option)}
                  >
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
