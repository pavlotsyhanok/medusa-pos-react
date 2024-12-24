import React from "react";
import StoreMenu from "./StoreMenu";
import ActiveCartsList from "./active-carts/ActiveCartsList";
import { Text } from "@medusajs/ui";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center w-full lg:h-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-[800px] p-4 pb-0">
          <Text size="small" className="text-ui-fg-muted pb-3">
            Active Carts
          </Text>
          <ActiveCartsList />
        </div>

        <div className="w-full max-w-[800px] p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-auto">
              <Text size="small" className="text-ui-fg-muted py-4">
                My Performance
              </Text>
              {children}
            </div>
            <div className="w-full lg:w-auto flex-1">
              <Text size="small" className="text-ui-fg-muted py-4">
                Actions
              </Text>
              <StoreMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreLayout;
