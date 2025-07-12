import React from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../tools/table/DynamicTable";
import TableCell from "../tools/table/TableCell";
import { TableData } from "../../assets/mock/mockData";
import DetailButton from "../tools/button/DetailButton";

export default function StatisticsChart() {
  const navigate = useNavigate();

  const handleButtonClick = (id: string) => {
    navigate(`/RequestDetail/${id}`);
  };

  const originData = TableData.slice(0, 2).map((item: any) => ({
    id: item.id,
    requestType: <TableCell>{item.requestType}</TableCell>,
    originCityTitle: <TableCell>{item.originCityTitle}</TableCell>,
    destinationCityTitle: <TableCell>{item.destinationCityTitle}</TableCell>,
    mainOriginCityTitle: <TableCell>{item.mainOriginCityTitle}</TableCell>,
    mainDestinationCityTitle: <TableCell>{item.mainDestinationCityTitle}</TableCell>,
    departureDate: <TableCell>{item.departureDate}</TableCell>,
    arrivalDate: <TableCell>{item.arrivalDate}</TableCell>,
    button: (
      <DetailButton
        onFirstClick={() => handleButtonClick(item.id)}
        firstText="مشاهده جزئیات درخواست"
      />
    ),
  }));

  const destinationData = TableData.slice(2, 4).map((item: any) => ({
    id: item.id,
    requestType: <TableCell>{item.requestType}</TableCell>,
    originCityTitle: <TableCell>{item.originCityTitle}</TableCell>,
    destinationCityTitle: <TableCell>{item.destinationCityTitle}</TableCell>,
    mainOriginCityTitle: <TableCell>{item.mainOriginCityTitle}</TableCell>,
    mainDestinationCityTitle: <TableCell>{item.mainDestinationCityTitle}</TableCell>,
    departureDate: <TableCell>{item.departureDate}</TableCell>,
    arrivalDate: <TableCell>{item.arrivalDate}</TableCell>,
    button: (
      <DetailButton
        onFirstClick={() => handleButtonClick(item.id)}
        firstText="مشاهده جزئیات درخواست"
      />
    ),
  }));

  const headers = [
    { key: "id", label: "شناسه", hidden: true },
    { key: "requestType", label: "نوع درخواست" },
    { key: "originCityTitle", label: "شهر مبدا" },
    { key: "destinationCityTitle", label: "شهر مقصد" },
    { key: "mainOriginCityTitle", label: "مبدا اصلی" },
    { key: "mainDestinationCityTitle", label: "مقصد اصلی" },
    { key: "departureDate", label: "تاریخ حرکت" },
    { key: "arrivalDate", label: "تاریخ رسیدن" },
    { key: "button", label: "" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* مبدا */}
      <div className="mb-4">
        <h5  className="font-semibold  mb-2 pr-2 py-1 text-black bg-gray-300 rounded-lg">از مبدا شما</h5>
        <DynamicTable
          rowKey="id"
          pagination={false}
          headers={headers}
          data={originData}
          selectionMode="single"
          className="mb-4"
          rowClassName="border border-gray-200"
        />
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/OriginRequest")}
            className="border border-black px-3 py-2 rounded-[16px] hover:bg-black hover:text-white"
          >
            مشاهده همه
          </button>
        </div>
      </div>

      {/* مقصد */}
      <div>
        <h2 className="font-semibold mb-2 pr-2 py-1 text-black bg-gray-300 rounded-lg">به مقصد شما</h2>
        <DynamicTable
          rowKey="id"
          pagination={false}
          headers={headers}
          data={destinationData}
          selectionMode="single"
          className="mb-4"
          rowClassName="border border-gray-200"
        />
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/DestinationRequest")}
            className="border border-black px-3 py-2 rounded-[16px] hover:bg-black hover:text-white"
          >
            مشاهده همه
          </button>
        </div>
      </div>
    </div>
  );
}
