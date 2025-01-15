import { RouterProvider } from "@tanstack/react-router";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { router } from "./router";

function App() {
  const { isAuthenticated, isLoading, logout } = useAuthQuery();
  const login = () => {
    // Wrap the login function to match expected signature
    auth.login();
  };
  const auth = { isAuthenticated, isLoading, login, logout };
  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
