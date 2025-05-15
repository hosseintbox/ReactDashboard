import * as XLSX from "xlsx";
import { ReactComponent as ExcelIcon } from "../../icons/svg/excelIcon.svg";

const ExportToExcel = ({
  data,
  fileName,
}: {
  data: any[];
  fileName: string;
}) => {
  const handleExport = () => {
    const filteredData = data.map(
      ({
        orderNumber,
        reciverName,
        address,
        countOfBox,
        status,
        postalCode,
      }) => ({
        "شماره سفارش": orderNumber,
        "نام گیرنده": reciverName,
        آدرس: address,
        "تعداد مرسوله‌ها": countOfBox,
        وضعیت: typeof status === "string" ? status : "",
        کدپستی: postalCode,
      })
    );

    const headers = [
      "شماره سفارش",
      "نام گیرنده",
      "آدرس",
      "تعداد مرسوله‌ها",
      "وضعیت",
      "کدپستی",
    ];

    const ws = XLSX.utils.json_to_sheet(filteredData, {
      header: headers,
      skipHeader: false,
    });

    // تنظیم راست به چپ
    (ws as any)["!rtl"] = true;

    // اندازه ستون‌ها
    (ws as any)["!cols"] = [
      { wch: 20 },
      { wch: 25 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    // فیلتر روی سطر اول
    (ws as any)["!autofilter"] = { ref: "A1:F1" };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "گزارش");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="w-full mt-9 text-white bg-[#FF866A] rounded-lg h-10 gap-3 flex items-center justify-center"
    >
      <ExcelIcon />
      <span>خروجی اکسل</span>
    </button>
  );
};

export default ExportToExcel;
