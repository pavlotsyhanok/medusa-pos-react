import { RouterProvider } from "@tanstack/react-router";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { router } from "./router";

function App() {
  const auth = useAuthQuery();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
