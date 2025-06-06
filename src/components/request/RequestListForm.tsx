import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../hooks/toggle/useToggle";
import DetailButton from '../../components/tools/button/DetailButton';
import DynamicTable from "../../components/tools/table/DynamicTable";
import TableCell from '../tools/table/TableCell';
import FilterForm from '../../pages/Request/RequestList/components/FilterForm';

const TableData = [
  {
    id: '1',
    requestType: 'حمل کننده',
    originCityTitle: 'تهران',
    destinationCityTitle: 'هانبورگ',
    mainOriginCityTitle: 'تهران',
    mainDestinationCityTitle: 'هانوفه',
    departureDate: '2025-05-23',
    arrivalDate: '2025-05-26',
  },
  {
    id: '2',
    requestType: 'فرستنده',
    originCityTitle: 'اصفهان',
    destinationCityTitle: 'برلین',
    mainOriginCityTitle: 'اصفهان',
    mainDestinationCityTitle: 'کلن',
    departureDate: '2025-06-01',
    arrivalDate: '2025-06-05',
  },
  {
    id: '3',
    requestType: 'حمل کننده',
    originCityTitle: 'مشهد',
    destinationCityTitle: 'دوسلدورف',
    mainOriginCityTitle: 'مشهد',
    mainDestinationCityTitle: 'مونیخ',
    departureDate: '2025-06-10',
    arrivalDate: '2025-06-15',
  },
  {
    id: '4',
    requestType: 'فرستنده',
    originCityTitle: 'تبریز',
    destinationCityTitle: 'فرانکفورت',
    mainOriginCityTitle: 'تبریز',
    mainDestinationCityTitle: 'اشتوتگارت',
    departureDate: '2025-07-01',
    arrivalDate: '2025-07-06',
  },
  {
    id: '5',
    requestType: 'حمل کننده',
    originCityTitle: 'شیراز',
    destinationCityTitle: 'درسدن',
    mainOriginCityTitle: 'شیراز',
    mainDestinationCityTitle: 'هامبورگ',
    departureDate: '2025-07-15',
    arrivalDate: '2025-07-20',
  },
  {
    id: '6',
    requestType: 'فرستنده',
    originCityTitle: 'رشت',
    destinationCityTitle: 'اشتوتگارت',
    mainOriginCityTitle: 'رشت',
    mainDestinationCityTitle: 'نورنبرگ',
    departureDate: '2025-08-01',
    arrivalDate: '2025-08-06',
  },
  {
    id: '7',
    requestType: 'حمل کننده',
    originCityTitle: 'اهواز',
    destinationCityTitle: 'مونیخ',
    mainOriginCityTitle: 'اهواز',
    mainDestinationCityTitle: 'فرایبورگ',
    departureDate: '2025-08-10',
    arrivalDate: '2025-08-15',
  },
  {
    id: '8',
    requestType: 'فرستنده',
    originCityTitle: 'کرمان',
    destinationCityTitle: 'نورنبرگ',
    mainOriginCityTitle: 'کرمان',
    mainDestinationCityTitle: 'درسدن',
    departureDate: '2025-09-01',
    arrivalDate: '2025-09-06',
  },
];


function RequestListForm() {
  const [filters, setFilters] = useState<any>(null);
  const [hasFilter, setHasFilter] = useState(false);
  const toggle = useToggle();
  const navigate = useNavigate();

  const handleButtonClick = (id: string) => {
    navigate(`/RequestDetail/${id}`);
    toggle();
  };

  const handleFilterSubmit = (data: any) => {
    setFilters(data);
  };

  // const filteredData = filters
  //   ? TableData.filter((item) => {
  //       const matchesName =
  //         !filters.name || item.brandName.includes(filters.name);
  //       return matchesName;
  //     })
  //   : TableData;

const transformedData =
  TableData.length > 0
    ? TableData.map((item: any) => ({
        original: item,
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
            firstText={"مشاهده جزئیات درخواست"}
          />
        ),
      }))
    : [];

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setHasFilter(!hasFilter)}
          className="py-3 px-4 border border-black font-semibold hover:bg-black hover:text-white rounded-[16px]"
        >
          انتخاب فیلتر
        </button>
      </div>

      {hasFilter && <FilterForm onSubmit={handleFilterSubmit} />}

    <DynamicTable
          // showIndex={true}
          rowKey="id"
        //   onPageChange={setCurrentPage}
        //   currentPageNumber={currentPage}
        //   isLoading={isLoading}
          pagination={true}
        //   PageNumber={Math.ceil(data?.data?.totalCount / 10)}
        //   totalPage={data?.data?.totalCount}
                rowClassName={"border-2 border-solid border-[#E5E7EB]"}
                className={"mt-[24px]"}
         headers={[
  { key: "id", label: "شناسه", hidden: true },
  { key: "requestType", label: "نوع درخواست" },
  { key: "originCityTitle", label: "شهر مبدا" },
  { key: "destinationCityTitle", label: "شهر مقصد" },
  { key: "mainOriginCityTitle", label: "مبدا اصلی" },
  { key: "mainDestinationCityTitle", label: "مقصد اصلی" },
  { key: "departureDate", label: "تاریخ حرکت" },
  { key: "arrivalDate", label: "تاریخ رسیدن" },
  { key: "button", label: "" },
]}

          data={transformedData}
          selectionMode={"single"}
        //   onRowSelect={handleRowClick}
        />
    </>
  );
}

export default RequestListForm;
