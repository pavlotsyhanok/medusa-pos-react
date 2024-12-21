import medusaClient from "@/lib/utils/axios.config";
import { LoginCredentials, LoginResponse } from "../types/Login";

export async function login(credentials: LoginCredentials) {
  return await medusaClient.post<LoginResponse>(
    "/auth/user/emailpass",
    credentials
  );
}
