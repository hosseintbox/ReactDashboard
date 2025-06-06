import React, { useState, ReactNode } from "react";
import { VerticalArrow  ,DownArrow ,UpArrow} from "../../../icons";

import Loading from "../loading/Loading";
import Button from "../button/Button";

type TableHeader = {
  key: string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
};

type SelectionMode = "single" | "multiple";

type TableProps = {
  PageNumber?:number | 5;
  rowKey: string;
  pagination?: boolean;
  headers: TableHeader[];
  data: Record<string, ReactNode>[];
  showActions?: boolean;
  currentPageNumber?: number;
  showIndex?: boolean;
  onRowSelect?: (rows: any[]) => void;
  selectionMode?: SelectionMode;
  rowClassName?: string;
  className?: string;
  isLoading?: boolean;
  totalPage?: number;
  onPageChange?: (page: number) => void;
};

const DynamicTable: React.FC<TableProps> = ({
  PageNumber =5,
  rowKey,
  pagination = true,
  isLoading = false,
  rowClassName,
  totalPage = 1,
  headers,
  data = [],
  showIndex = false,
  showActions = false,
  onRowSelect,
  selectionMode = "multiple",
  onPageChange,
  className,
}) => {
  console.log("PageNumber", PageNumber);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const PageNumber = totalPage /
  // const itemsPerPage = 5;

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
    if (typeof value === "string" || typeof value === "number") return value;
    if (React.isValidElement(value)) {
const child = (value as React.ReactElement<any>).props.children;
      if (typeof child === "string" || typeof child === "number") return child;
    }
    return "";
  };

  const handleRowClick = (row: Record<string, ReactNode>) => {
    const rowId = row[rowKey] as string | number;
    let updatedSelectedIds: (string | number)[];

    if (selectionMode === "single") {
      updatedSelectedIds = selectedRowIds.includes(rowId) ? [] : [rowId];
    } else {
      updatedSelectedIds = selectedRowIds.includes(rowId)
        ? selectedRowIds?.filter((id) => id !== rowId)
        : [...selectedRowIds, rowId];
    }

    setSelectedRowIds(updatedSelectedIds);

    const selectedOriginalRows = data?.filter((r) => {
        const rId = r[rowKey] as string | number;
        return updatedSelectedIds.includes(rId);
      })
      .map((r) => (r as any).original)?.filter(Boolean);

    onRowSelect?.(selectedOriginalRows);
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

  const startIndex = (currentPage - 1) * PageNumber;
  const endIndex = startIndex + PageNumber;
const paginatedData = sortedData;
  console.log("paginatedData", paginatedData);
  return isLoading ? (
    <div className="">
      <Loading />
    </div>
  ) : (
    <div className={`overflow-x-auto w-full ${className}`}>
      <div className="w-full rounded-lg overflow-hidden">
        <div className="hidden md:flex text-[14px] p-3 font-medium">
          {selectionMode === "multiple" && (
            <div className="text-center flex-1 px-3">
              {selectionMode === "multiple" && (
                <div className="text-center flex-1 px-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedRowIds.length === data.length && data.length > 0
                    }
                    onChange={(e) => {
                      const allIds = data.map(
                        (row) => row[rowKey] as string | number
                      );
                      const updatedSelectedIds = e.target.checked ? allIds : [];
                      setSelectedRowIds(updatedSelectedIds);

                      const selectedOriginalRows = data
                        ?.filter((r) =>
                          updatedSelectedIds.includes(
                            r[rowKey] as string | number
                          )
                        )
                        .map((r) => (r as any).original)
                        ?.filter(Boolean);

                      onRowSelect?.(selectedOriginalRows);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          )}

          {showIndex && (
            <div className="text-center flex-1 px-3 font-bold">ردیف</div>
          )}

          {headers
            ?.filter((h) => !h.hidden)
            .map((header, index) => (
              <div
                key={index}
                className={`text-center flex-1 px-3 whitespace-nowrap cursor-pointer font-meduim flex items-center justify-center ${
                  header.sortable ? "hover:text-[#FF4D4D]" : ""
                }`}
                onClick={() => header.sortable && handleSort(header.key)}
              >
                {header.label}
              </div>
            ))}

          {showActions && <div className="text-center flex-1 px-3">عملیات</div>}
        </div>

        <div className="hidden md:block">
          {paginatedData.map((row, rowIndex) => {
            const rowId = row?.id as string | number;
            const isSelected = selectedRowIds.includes(rowId);

            return (
              <div
                key={rowId ?? rowIndex}
                className={`flex items-center ${rowClassName} bg-white relative my-1 px-3 py-1 rounded-[16px] cursor-pointer ${
                  isSelected ? "border-2 border-[#FF7959]" : ""
                }`}
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest("button")) {
                    handleRowClick(row);
                  }
                }}
              >
                {selectionMode === "multiple" && (
                  <div className="text-center flex-1 px-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowClick(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {showIndex && (
                  <div className="text-center flex-1 px-3 font-bold">
                    {startIndex + rowIndex + 1}
                  </div>
                )}

                {headers
                  .filter((h) => !h.hidden)
                  .map((header, colIndex) => (
                    <div
                      key={colIndex}
                      className="text-center text-sm font-meduim whitespace-nowrap flex-1 min-w-0 overflow-hidden text-ellipsis"
                    >
                      {row[header.key]}
                    </div>
                  ))}

                {showActions && (
                  <div className="text-center flex-1 px-3">
                    <button className="btn btn-sm btn-error">حذف</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {pagination && (
          <div className="flex justify-right mt-4">
            <button
              className="mx-1 rounded-[8px] bg-white px-4 py-2"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPage))
              }
              disabled={currentPage === 1}
            >
              <span>{PageNumber > 3 ? "<" : "قبلی"}</span>
            </button>

            {totalPage <= 3 ? (
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
              <div className="flex items-center">
                <button
                  className={`mx-1 px-4 py-2 rounded-[8px] ${"bg-[#FFE4DE] text-[#FF7959]"}`}
                  disabled
                >
                  <span>{currentPage}</span>
                </button>

                {currentPage + 1 < totalPage && (
                  <button
                    className={`mx-1 px-4 py-2 rounded-[8px] bg-white text-[#4B5563]`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage + 2 < PageNumber && (
                  <button
                    disabled
                    className="mx-1 px-4 py-2 rounded-[8px] bg-white"
                  >
                    <span>...</span>
                  </button>
                )}

                {currentPage !== PageNumber && (
                  <button
                    className={`mx-1 px-4 py-2 rounded-[8px] bg-white text-[#4B5563]`}
                    onClick={() => handlePageChange(PageNumber)}
                  >
                    <span>{PageNumber}</span>
                  </button>
                )}
              </div>
            )}

            <button
              className="rounded-[8px] bg-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              <span className="px-4 py-2">
                {PageNumber <= 3 ? "بعدی" : ">"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
