import React from "react";
import StoreMenu from "./StoreMenu";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-[100svh]">
      <div className="border-b border-ui-border-muted p-4">
        {/* Top Menu */}
        Top Menu
      </div>
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4"> {/* Make margin top equal to top menu height to compensate for the top menu */}
          <div className="">
            {children}
          </div>
          <div className="w-full lg:w-auto">
            <StoreMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreLayout;
