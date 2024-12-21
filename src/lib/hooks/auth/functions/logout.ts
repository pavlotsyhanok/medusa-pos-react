import medusaClient from "@/lib/utils/axios.config";

export async function logout() {
  return await medusaClient.delete("/auth/session");
}
