import React from "react";
import StoreMenu from "./StoreMenu";
import ActiveCartsList from "./active-carts/ActiveCartsList";
import { Text } from "@medusajs/ui";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full lg:w-[800px]">
        <Text size="base" className="text-ui-fg-muted py-3">
          Active Carts
        </Text>
        <ActiveCartsList />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[800px]">
        <div className="w-full lg:w-auto">
          <Text size="base" className="text-ui-fg-muted py-4">
            My Performance
          </Text>
          {children}
        </div>
        <div className="w-full lg:w-auto">
          <Text size="base" className="text-ui-fg-muted py-4">
            Actions
          </Text>
          <StoreMenu />
        </div>
      </div>
    </div>
  );
}

export default StoreLayout;
