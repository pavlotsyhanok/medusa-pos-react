import React from "react";
import StoreMenu from "./StoreMenu";

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full px-30 h-[100svh]">
      <div className="border-b border-ui-border-muted p-4">
        {/* Top Menu */}
        Top Menu
      </div>
      <div className="flex flex-col w-full h-full items-center justify-start p-4 gap-4">
        <div>{children}</div>
        <StoreMenu />
      </div>
    </div>
  );
}

export default StoreLayout;
