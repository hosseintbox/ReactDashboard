import React, { useState } from "react";
import { useIsToggled } from "../../hooks/toggle/useToggle";
import useStore from "../../../store/zustand/store";
import {useLocation} from "react-router-dom";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface DynamicTabsProps {
  tabs: TabProps[];
  defaultActiveTab?: number;
  className?: string;
  contentClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  inputClassName?: string;
}

const DynamicTabs: React.FC<DynamicTabsProps> = React.memo(
  ({
    tabs,
    defaultActiveTab = 0,
    className = "",
    contentClassName = "",
    activeTabClassName = "tab-active border-b-[2px] border-[#FF7959] text-[#FF7959]",
    inactiveTabClassName = "",
    inputClassName = "",
  }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const isToggled = useIsToggled();
    const location = useLocation();

    return (
      <div
        className={`w-full relative p-4 rounded-2xl flex flex-col justify-start items-start transition-ease-out duration-300 ${className}
         ${
           location.pathname === "/AdDashboard" ||
           location.pathname === "/MhDashboard"
             ? "opacity-100"
             : isToggled
             ? "opacity-100"
             : "opacity-0  !z-0  "
         }`}
      >
        <div
          role="tablist"
          className={`tabs font-bold flex ${inputClassName} overflow-y-hidden overflow-x-auto`}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              role="tab"
              className={`tab hover:scale-95 active:scale-100 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === index ? activeTabClassName : inactiveTabClassName
              }`}
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className={`w-full ${contentClassName}`}>
          {tabs[activeTab]?.content}
        </div>
      </div>
    );
  }
);

export default DynamicTabs;
