import React from "react";
import StoreMenu from "./StoreMenu";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-fit">
        <div className="w-full lg:w-auto">
          {children}
        </div>
        <div className="w-full lg:w-auto">
          <StoreMenu />
        </div>
      </div>
    </div>
  );
}

export default StoreLayout;
