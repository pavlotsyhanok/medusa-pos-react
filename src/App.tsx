import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/hooks/auth/AuthProvider";
import { router } from "./router";

function App() {
  return <RouterProvider router={router} context={{ auth: undefined }} />;
}

export default App;
