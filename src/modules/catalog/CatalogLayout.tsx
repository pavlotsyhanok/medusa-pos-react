import React from "react";

function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4fr_2fr] h-full w-full">
      <div className="p-4 border-r border-ui-border-muted h-full">
        {children}
      </div>
      <div className="flex flex-col w-full p-4 h-full">Controls</div>
    </div>
  );
}

export default CatalogLayout;
