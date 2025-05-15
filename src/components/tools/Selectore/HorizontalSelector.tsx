import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../icons/svg/arrow-down.svg";

type HorizontalSelectorProps = {
  items: any[];
  onSelect?: (item: any) => void;
};

export default function HorizontalSelector({
  items,
  onSelect,
}: HorizontalSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      setCanScroll(el.scrollWidth > el.clientWidth);
    }
  }, [items]);

  const startScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    intervalRef.current = setInterval(() => {
      el.scrollBy({
        left: direction === "left" ? -5 : 5,
        behavior: "auto",
      });
    }, 16);
  };

  const stopScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    onSelect?.(item);
  };

  return (
    <div className="flex items-center gap-2 rtl:space-x-reverse">
      {canScroll && (
        <button
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          className="rounded-[12px] border border-gray-300 hover:bg-gray-100 p-3"
        >
          <ArrowIcon className="-rotate-90 h-5 w-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 scrollbar-hide scroll-smooth rtl:space-x-reverse"
      >
        {items?.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            className={`whitespace-nowrap px-4 py-2 rounded-[12px] border transition-colors duration-300 ${
              selectedItem?.id === item.id
                ? "border-green-500 text-green-600 bg-green-50"
                : "border-gray-300 text-gray-700 bg-white"
            }`}
          >
            {item.nodeTypeTitle + " " + item.title}
          </button>
        ))}
      </div>

      {canScroll && (
        <button
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          className="rounded-[12px] border border-gray-300 hover:bg-gray-100 p-3"
        >
          <ArrowIcon className="rotate-90 h-5 w-5" />
        </button>
      )}
    </div>
  );
}
