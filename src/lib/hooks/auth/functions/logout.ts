import medusaClient from "@/lib/utils/axios.config";

export async function logout() {
  try {
    // Delete JWT cookie
    document.cookie = "medusa_jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Remove Authorization header
    delete medusaClient.defaults.headers.common["Authorization"];

    // Clear local storage if you're using it
    localStorage.removeItem('medusa_jwt_token');

    // Optional: Call backend to invalidate the session
    // await medusaClient.delete("/auth/session");

    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}
