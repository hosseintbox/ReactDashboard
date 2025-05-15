import React, { useRef, useState } from "react";
import { ReactComponent as UpLoadIcon } from "../../../components/icons/svg/uploadIcon.svg";
import * as XLSX from "xlsx";
type ExcelUploadProps = {
  onDataChange?: (data: any[]) => void;
};
function ExcelUpload({ onDataChange }: ExcelUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any[]>([]);

  const typeMap: Record<string, (value: any) => any> = {
    barcode: (value) => String(value || "").trim(),
    receiverFirstName: (value) => String(value || "").trim(),
    receiverLastName: (value) => String(value || "").trim(),
    phoneNumber: (value) => String(value || "").trim(),
    parcelWeight: (value) => (value ? Number(value) : null),
    parcelValue: (value) => (value ? Number(value) : null),
    longitude: (value) => (value ? Number(value) : null),
    latitude: (value) => (value ? Number(value) : null),
    postalCode: (value) => (value ? String(value) : null),
    address: (value) => (value ? String(value) : null),
  };

  const parcelSize = [
    { label: "پاکت سایز1", value: "1" },
    { label: "پاکت سایز2", value: "2" },
    { label: "پاکت سایز3", value: '3' },
    { label: "کارتن سایز1", value: "4" },
    { label: "کارتن سایز2", value: "5" },
    { label: "کارتن سایز3", value: "6" },
    { label: "کارتن سایز4", value: "7" },
    { label: "کارتن سایز5", value: "8" },
  ];

  const headerMap: Record<string, string> = {
    بارکد: "barcode",
    "نام گیرنده": "receiverFirstName",
    "نام خانوادگی گیرنده": "receiverLastName",
    "شماره موبایل": "phoneNumber",
    "وزن بسته": "parcelWeight",
    "ارزشی مرسوله": "parcelValue",
    "طول جغرافیایی": "longitude",
    "عرض جغرافیایی": "latitude",
    "کد پستی": "postalCode",
    "اندازه پستی": "parcelTypeId",
    آدرس: "address",
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const arrayBuffer = event.target?.result;
    if (!arrayBuffer) return;

    const data = new Uint8Array(arrayBuffer as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
      header: 1,
    });

    if (jsonData.length <= 1) return;

    const headers = jsonData[0];
    const rows = jsonData
      .slice(1)
      .filter((row) =>
        row.some(
          (cell) =>
            cell !== null && cell !== undefined && String(cell).trim() !== ""
        )
      );

    const formattedData = rows.map((row) => {
      const obj: Record<string, any> = {};
      headers.forEach((header, index) => {
        const englishKey = headerMap[header as string] || header;
        const rawValue = row[index];

        if (englishKey === "parcelTypeId") {
          const matched = parcelSize.find(
            (item) => item.label.trim() === String(rawValue).trim()
          );
          obj[englishKey] = matched ? matched.value : null;
        } else if (typeMap[englishKey]) {
          obj[englishKey] = typeMap[englishKey](rawValue);
        } else {
          obj[englishKey] = rawValue;
        }
      });
      return obj;
    });

    setData(formattedData);
    onDataChange?.(formattedData); // ← بیرون دادن دیتا
  };

  reader.readAsArrayBuffer(file);
};
  

  return (
    <div className="w-full border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-[12px] py-6">
        <div className="flex flex-row gap-[10px] items-center">
          <UpLoadIcon />
          <span className="font-semibold">بارگذاری فایل</span>
        </div>
        <span className="font-semibold">
          فایل اکسل را در اینجا رها کنید یا{" "}
          <span
            onClick={handleClick}
            className="text-blue-600 cursor-pointer inline-block"
          >
            انتخاب فایل
          </span>
        </span>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
      </div>

      <button className="text-[#6B7280] border border-[#6B7280] px-6 py-3 rounded-[12px] self-center">
        دانلود نمونه فایل اکسل
      </button>
    {/* 
      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">داده‌های اکسل:</h3>
          <pre className="bg-gray-100 p-4 rounded-md max-h-[300px] overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
}

export default ExcelUpload;
