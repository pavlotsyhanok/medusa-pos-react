interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export type { LoginCredentials, LoginResponse };