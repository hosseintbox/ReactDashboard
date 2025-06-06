import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
return (
<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] min-h-[300px]">
  <div className="flex min-h-[300px] flex-wrap divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800">
    {/* Shared card styles */}
    {[
      { label: "Customers", value: "3,782", change: "11.01%", icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />, badge: "success" },
      { label: "Customers", value: "3,782", change: "11.01%", icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />, badge: "success" },
      { label: "Orders", value: "5,359", change: "9.05%", icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />, badge: "error" },
      { label: "Revenue", value: "$24,987", change: "6.44%", icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />, badge: "success" },
    ].map((item, index) => (
      <div
        key={index}
        className="w-full sm:w-1/2 lg:w-1/4 p-5 md:p-6 flex flex-col gap-8 min-h-[150px]"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {item.icon}
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{item.value}</h4>
          </div>
          <Badge color={'success'}>
            {item.badge === "success" ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {item.change}
          </Badge>
        </div>
      </div>
    ))}
  </div>
</div>

);

}
