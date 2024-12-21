import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./lib/hooks/AuthProvider";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth: undefined }} />
    </AuthProvider>
  );
}

export default App;