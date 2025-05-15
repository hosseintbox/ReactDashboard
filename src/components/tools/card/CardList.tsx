import React from 'react';

interface CardProps {
  id: string;
  title: string;
  redTitle?: string;
  firstHead?: number | string;
  secondHead?: string | number;
  thirdHead?: string | number;
  firstHeadValue?: number | string;
  secondHeadValue?: number | string;
  thirdHeadValue?: number | string;
  tags: { label: string; color: string; borderColor: string }[];
  isSelected: boolean;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
  onSelect: (id: string) => void;
  fourthHead?: string;
  fourthHeadValue?: string;
  fifthHead?: string;
  sixthHead?: string;
}

const CardList: React.FC<CardProps> = React.memo(
  ({
    id,
    title,
    redTitle,
    firstHead,
    firstHeadValue,
    secondHead,
    secondHeadValue,
    thirdHead,
    thirdHeadValue,
    tags,
    isSelected,
    latitude,
    longitude,
    isActive,
    onSelect,
    fourthHead,
    fourthHeadValue,
    fifthHead,
    sixthHead
  }) => {
    return (
      <div
        className={`hover:scale-[98.5%] active:scale-100 transition-all w-full shadow p-4 bg-white rounded-2xl border-[2px] flex-col justify-center items-center cursor-pointer ${
          isSelected ? "border-[#FF7959]" : "border-transparent"
        }`}
        onClick={() => onSelect(id)}
      >
        <div className="w-full flex items-center justify-between">
          <div className="text-right text-[#111928] text-sm font-bold">
            {title}
          </div>
          <div className="flex items-center justify-between gap-[8px]">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`min-w-[70px] h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex`}
                style={{
                  backgroundColor: tag.color,
                  borderColor: tag.borderColor,
                }}
              >
                <div
                  className="text-right text-xs font-bold leading-none"
                  style={{ color: tag.borderColor }}
                >
                  {tag.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {redTitle && (
          <div className="text-right text-[#FF7959] text-sm font-bold leading-[14px] mt-[5px]">
            {redTitle}
          </div>
        )}

        <div
          className={`flex flex-col items-start justify-center ${
            redTitle && "mt-[16.5px]"
          }`}
        >
          {thirdHeadValue && (
            <div className="justify-end items-center gap-4 inline-flex mt-[16.5px]">
              <div className="w-[104px] text-right text-gray-500 text-sm font-bold leading-[21px]">{`${thirdHead} :`}</div>
              <div className="grow shrink basis-0 text-right text-[#111928] text-sm font-bold">
                {thirdHeadValue}
              </div>
            </div>
          )}
          {firstHeadValue && (
            <div className="justify-end items-center gap-4 inline-flex mt-[16.5px]">
              <div className="w-[104px] text-right text-gray-500 text-sm font-bold leading-[21px]">{`${firstHead} :`}</div>
              <div className="grow shrink basis-0 text-right text-[#111928] text-sm font-bold">
                {firstHeadValue}
              </div>
            </div>
          )}

          {sixthHead && (
            <div className="justify-end items-center gap-4 inline-flex mt-[16.5px]">
              <div className="w-[104px] text-right text-gray-500 text-sm font-bold leading-[21px]">{`${sixthHead} :`}</div>
              <div className="grow shrink basis-0 text-right text-[#111928] text-sm font-bold">
                {`${latitude} ${" ".repeat(3)} , ${" ".repeat(3)} ${longitude}`}
              </div>
            </div>
          )}
          {(secondHeadValue || secondHead) && (
            <div className="justify-end items-center gap-4 inline-flex mt-[16.5px]">
              <div className="min-w-[104px] text-right text-gray-500 text-sm font-bold leading-[21px]">
                {`${secondHead} :`}
              </div>
              <div className="text-[#111928] text-sm font-bold leading-[21px]">
                {secondHeadValue}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default CardList;
