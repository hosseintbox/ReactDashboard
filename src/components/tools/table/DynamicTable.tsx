import React, { useState, ReactNode } from "react";
import { ReactComponent as VerticalArrow } from "../../icons/svg/vertical-arrow.svg";
import { ReactComponent as DownArrow } from "../../icons/svg/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../icons/svg/up-arrow.svg";
import Loading from "../loading/Loading";
import Button from "../button/Button";
import ActionMenu from "../../../pages/shipmentBuffer/order/components/ActionMenu";

type TableHeader = {
  key: string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};

type SelectionMode = "single" | "multiple";

type TableProps = {
  pagination?: boolean;
  headers: TableHeader[];
  data: Record<string, ReactNode>[];
  showActions?: boolean;
  showActionMenu?: boolean;
  currentPageNumber?: number;
  showIndex?: boolean;
  onRowSelect?: (selectedRows: Record<string, ReactNode>[]) => void;
  selectionMode?: SelectionMode;
  rowClassName?: string;
  className?: string;
  isLoading?: boolean;
  totalPage?: number;
  onPageChange?: (page: number) => void;
};
const DynamicTable: React.FC<TableProps> = ({
  pagination = true,
  isLoading = false,
  rowClassName,
  totalPage = 1,
  headers,
  data = [],
  showIndex = false,
  showActions = false,
  onRowSelect,
  showActionMenu,
  selectionMode = "multiple",
  onPageChange,
  className,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Record<string, ReactNode>[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };
  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  const getTextValue = (value: ReactNode): string | number => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    if (
      React.isValidElement(value) &&
      typeof value.props.children === "string"
    ) {
      return value.props.children;
    }
    return "";
  };

  const handleRowClick = (row: Record<string, ReactNode>) => {
    let updatedSelectedRows;
    if (selectionMode === "single") {
      updatedSelectedRows = selectedRows.includes(row) ? [] : [row];
    } else {
      updatedSelectedRows = selectedRows.includes(row)
        ? selectedRows.filter((r) => r !== row)
        : [...selectedRows, row];
    }
    setSelectedRows(updatedSelectedRows);
    onRowSelect?.(updatedSelectedRows);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const valueA = getTextValue(a[sortColumn]);
    const valueB = getTextValue(b[sortColumn]);

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }

    return sortDirection === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedData = sortedData.slice(startIndex, endIndex);

  return isLoading ? (
    <div className="">
      <Loading />
    </div>
  ) : (
    <div className={`overflow-x-auto w-full ${className}`}>
      <div className="w-full rounded-lg overflow-hidden">
        <div className={`overflow-x-auto w-full ${className}`}>
          <div className="w-full rounded-lg overflow-hidden">
            <div className="hidden md:flex text-[14px] p-3 font-medium">
              {showIndex && (
                <div className="text-center flex-1 px-3 font-bold">ردیف</div>
              )}
              {headers
                .filter((h) => !h.hidden)
                .map((header, index) => (
                  <div
                    key={index}
                    className={`text-center flex-1 px-3 whitespace-nowrap cursor-pointer font-bold flex items-center justify-center ${
                      header.sortable ? "hover:text-[#FF4D4D]" : ""
                    }`}
                    onClick={() => header.sortable && handleSort(header.key)}
                  >
                    {header.label}
                  </div>
                ))}
              {showActions ||
                (showActionMenu && (
                  <div className={`text-center flex-1 px-3`}>
                    {showActionMenu ? "" : "عملیات"}
                  </div>
                ))}
            </div>

            {/* محتوای جدول */}
            <div className="hidden md:block">
              {sortedData.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex items-center ${rowClassName} bg-white relative my-2 p-3 rounded-[16px] cursor-pointer ${
                    selectedRows.includes(row)
                      ? "border-2 border-[#FF4D4D]"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest("button")) {
                      handleRowClick(row);
                    }
                  }}
                >
                  {showIndex && (
                    <div className="text-center flex-1 px-3 font-bold">
                      {startIndex + rowIndex + 1}{" "}
                    </div>
                  )}
                  {headers
                    .filter((h) => !h.hidden)
                    .map((header, colIndex) => (
                      <div
                        key={colIndex}
                        className="text-center text-sm font-bold whitespace-nowrap flex-1 min-w-0 overflow-hidden text-ellipsis"
                      >
                        {row[header.key]}
                      </div>
                    ))}
                  {showActions && (
                    <div className="text-center flex-1 px-3">
                      <button className="btn btn-sm btn-error">حذف</button>
                    </div>
                  )}
                  {showActionMenu && (
                    <div className="text-center flex-1 px-3">
                      <ActionMenu row={row} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {pagination && (
          <div className="flex justify-right mt-4">
            <button
              className="mx-1 rounded-[8px] bg-white px-4 py-2"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <span>{totalPage > 3 ? "<" : "قبلی"}</span>
            </button>

            {totalPage <= 3 ? (
              // نمایش همه دکمه‌های صفحات اگر تعداد کل صفحات <= 3 باشد
              <div className="flex">
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`mx-1 px-4 py-2 rounded-[8px] ${
                        currentPage === page
                          ? "bg-[#FFE4DE] text-[#FF7959]"
                          : "bg-white text-[#4B5563]"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            ) : (
              // صفحه‌بندی با خلاصه‌سازی برای صفحات زیادتر از ۳
              <div className="flex items-center">
                <button
                  className={`mx-1 px-4 py-2 rounded-[8px] ${
                    currentPage === currentPage
                      ? "bg-[#FFE4DE] text-[#FF7959]"
                      : "bg-white text-[#4B5563]"
                  }`}
                  disabled
                >
                  <span>{currentPage}</span>
                </button>

                {currentPage + 1 < totalPage && (
                  <button
                    className={`mx-1 px-4 py-2 rounded-[8px] ${
                      currentPage + 1 === currentPage
                        ? "bg-[#FFE4DE] text-[#FF7959]"
                        : "bg-white text-[#4B5563]"
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage + 2 < totalPage && (
                  <button
                    disabled
                    className="mx-1 px-4 py-2 rounded-[8px] bg-white"
                  >
                    <span>...</span>
                  </button>
                )}

                {currentPage !== totalPage && (
                  <button
                    className={`mx-1 px-4 py-2 rounded-[8px] ${
                      currentPage === totalPage
                        ? "bg-[#FFE4DE] text-[#FF7959]"
                        : "bg-white text-[#4B5563]"
                    }`}
                    onClick={() => handlePageChange(totalPage)}
                  >
                    <span>{totalPage}</span>
                  </button>
                )}
              </div>
            )}

            <button
              className="rounded-[8px] bg-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              <span className="px-4 py-2">{totalPage <= 3 ? "بعدی" : ">"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
