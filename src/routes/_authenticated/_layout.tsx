import { createFileRoute, Outlet } from "@tanstack/react-router";
import HeaderLayout from "@/lib/ui/header/HeaderLayout";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <div className="flex flex-col w-full h-[100svh]">
        <div className="border-b border-ui-border-muted p-4">
          <HeaderLayout />
        </div>
        <div className="flex-1 overflow-auto h-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    );
  },
});
