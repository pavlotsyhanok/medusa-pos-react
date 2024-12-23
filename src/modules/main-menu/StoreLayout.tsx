import React from "react";
import StoreMenu from "./StoreMenu";
import ActveCartsList from "./active-carts/ActveCartsList";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full lg:w-[800px]">
          <ActveCartsList />
        </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[800px]">
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
