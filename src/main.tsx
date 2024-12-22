import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { useAuthQuery } from "./lib/hooks/auth/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLoader from "./lib/ui/PageLoader";

const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuthQuery();

  if (auth.isLoading) {
    return <PageLoader />;
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
