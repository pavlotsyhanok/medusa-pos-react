import { createFileRoute, Outlet } from "@tanstack/react-router";
import HeaderLayout from "@/lib/ui/header/HeaderLayout";
import ControlsLayout from "@/lib/ui/header/ControlsLayout";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <div className="flex flex-col min-h-[100svh] h-[100svh] w-full">
        <header className="flex-none border-b border-ui-border-muted p-4">
          <HeaderLayout />
        </header>
        <main className="flex-1 overflow-auto items-center justify-center pb-[10vh]">
          <Outlet />
        </main>
        <div className="fixed bottom-0 left-0 right-0">
          <ControlsLayout />
        </div>
      </div>
    );
  },
});
