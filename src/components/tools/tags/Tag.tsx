import React from "react";


const category = {
  parcelStatus: {
    1: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1A56DB",
      text: "پذیرش مرسوله",
    },
    2: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "تخصیص شده به باندل",
    },
    3: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "در انتظار تحویل",
    },
    4: {
      bg: "#FDE8E8",
      border: "#F8B4B4",
      textColor: "#C81E1E",
      text: "تحویل نهایی",
    },
    5: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: "لغو شده",
    },
    6: {
      bg: "#F3F4F6",
      border: "#D1D5DB",
      textColor: "#374151",
      text: "برگشتنی",
    },
    7: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "رسوبی",
    },
  },
  orderType: {
    1: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: "بافر حمل",
    },
    2: { bg: "#F8B4D9", border: "#F8B4D9", textColor: "#D61F69", text: "بافر" },
  },
  bundleStatus: {
    1: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1A56DB",
      text: "پذیرش مرسولات",
    },
    2: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "در حال باندل بندی",
    },
    3: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "پذیرش باندل",
    },
    4: {
      bg: "#FDE8E8",
      border: "#F8B4B4",
      textColor: "#C81E1E",
      text: "پذیرش شده",
    },
    5: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: "آماده توزیع به لجستیک",
    },
    6: {
      bg: "#F3F4F6",
      border: "#D1D5DB",
      textColor: "#374151",
      text: "در حال توزیع به لجستیک",
    },
    7: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "تحویل نهایی",
    },
    8: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "تاخیر در تحویل",
    },
  },
  fleetType: {
    1: {
      bg: "#DBEAFE",
      border: "#2563EB",
      textColor: "#1E40AF",
      text: "تاکسی",
    },
    2: {
      bg: "#FEF9C3",
      border: "#D97706",
      textColor: "#92400E",
      text: "اتوبوس",
    },
  },
};

type CategoryType = typeof category;
type CategoryName = keyof CategoryType;
type BundleStatusId = keyof typeof category.bundleStatus;
type FleetTypeId = keyof typeof category.fleetType;
type OrderTypeId = keyof typeof category.orderType;

type IdType = BundleStatusId | FleetTypeId | OrderTypeId;

interface TagProps {
  categoryName: CategoryName;
  id: IdType;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ categoryName, id, className = "" }) => {
  // @ts-ignore
  const colors = category[categoryName]?.[id] || {
    bg: "#F3F4F6",
    border: "#D1D5DB",
    textColor: "#374151",
    text: "نامشخص",
  };

  return (
    <div
      className={`${className} h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border`}
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <div
        className="text-right text-xs whitespace-nowrap leading-none"
        style={{ color: colors.textColor }}
      >
        {colors.text}
      </div>
    </div>
  );
};

export default Tag;
