import React from "react";
import DataCard from "./data-dashboards/DataCard";
import TotalSalesChart from "./data-dashboards/TotalSalesChart";
import { Container } from "@medusajs/ui";

function StoreDataArea() {
  return (
    <div className="flex flex-col gap-4 lg:min-w-[500px] lg:w-fit w-full">
      <div className="flex gap-4 w-full">
        <DataCard variant="sales" />
        <DataCard variant="registrations" />
      </div>
      <Container className="p-4"><TotalSalesChart /></Container>
    </div>
  );
}

export default StoreDataArea;
