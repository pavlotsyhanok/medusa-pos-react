import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./router";
import { useAuthQuery } from "./lib/hooks/auth/AuthProvider";
import PageLoader from "./lib/ui/PageLoader";

const queryClient = new QueryClient();

function Router() {
  const auth = useAuthQuery();

  if (auth.isLoading) {
    return <PageLoader />;
  }

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: auth.isAuthenticated,
          isLoading: auth.isLoading,
          login: () => {
            throw new Error(
              "Direct login() call not supported - use auth.login() with credentials instead"
            );
          },
          logout: auth.logout,
        },
      }}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const container = document.getElementById("app");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
