import React from "react";
import DataCard from "./data-dashboards/DataCard";
import TotalSalesChart from "./data-dashboards/TotalSalesChart";

function StoreDataArea() {
  return (
    <div className="flex flex-col gap-2 lg:min-w-[500px] lg:w-fit w-full">
      <div className="flex gap-4 w-full">
        <DataCard variant="sales" />
        <DataCard variant="registrations" />
      </div>
      {/* <TotalSalesChart /> */}
    </div>
  );
}

export default StoreDataArea;
