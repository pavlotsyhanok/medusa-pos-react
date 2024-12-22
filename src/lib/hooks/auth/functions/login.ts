import medusaClient from "@/lib/utils/axios.config";
import { LoginCredentials, LoginResponse } from "../types/Login";

export async function login(credentials: LoginCredentials) {
  const response = await medusaClient.post<LoginResponse>(
    "/auth/user/emailpass",
    credentials
  );

  if (response.data.token) {
    document.cookie = `medusa_jwt_token=${response.data.token}; path=/`;
    medusaClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }

  return response;
}
