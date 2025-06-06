import Chart from "react-apexcharts";
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import DynamicTable from "../tools/table/DynamicTable";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../hooks/toggle/useToggle";
import ChartTab from "../common/ChartTab";
import TableCell from "../tools/table/TableCell";
import { TableData } from "../../assets/mock/mockData";
import DetailButton from "../tools/button/DetailButton";

export default function StatisticsChart() {
  const [activeButton,setActiveButton]=useState("Origin");
    const toggle = useToggle();
  const navigate = useNavigate();
  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], // Define line colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: "dd MMM yyyy", // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Revenue",
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
  ];
    const handleButtonClick = (id: string) => {
    navigate(`/RequestDetail/${id}`);
    toggle();
  };
const transformedData =
  TableData.length > 0
    ? TableData.slice(0, 5).map((item: any) => ({
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
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
     <div className="flex flex-row gap-3 ">
      <button 
        onClick={()=>setActiveButton("Origin")}
        className={` ${ activeButton ==='Origin'? 'bg-black text-white':'text-black bg-white' } font-semibold border border-black px-3 py-2 rounded-[16px]  hover:bg-black hover:text-white `}>
        <span>از مبدا شما</span>
      </button>
          <button  
            onClick={()=>setActiveButton("Destination")}
           className={` ${ activeButton ==='Destination'? 'bg-black text-white':'text-black bg-white' } font-semibold border border-black px-3 py-2 rounded-[16px]  hover:bg-black hover:text-white `}>
        <span>به مقصد شما</span>
      </button>
     </div>
  
      <DynamicTable
          // showIndex={true}
          rowKey="id"
        //   onPageChange={setCurrentPage}
        //   currentPageNumber={currentPage}
        //   isLoading={isLoading}
          pagination={false}
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
      {/* <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div> */}
      <div className="flex  justify-end mt-2">
   {activeButton =="Destination" ?
      
    (<button 
     onClick={()=> navigate("/DestinationRequest")}
      className="  border border-black px-3 py-2 rounded-[16px]  hover:bg-black hover:text-white"> 
 مشاهده همه
    </button>) :(
      <button 
       
      
      onClick={()=> navigate("/OriginRequest")}
       className="  border border-black px-3 py-2 rounded-[16px]  hover:bg-black hover:text-white">
 مشاهده همه
      </button>
    )
    }
      </div>
     
    </div>
  );
}
