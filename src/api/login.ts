import { ApiError } from "@/lib/utils";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.username, password: data.password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status === 401 ? 'Invalid username or password' : `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response.statusText,
      result,
      response.headers
    );
  }

  return result;
}
