import { ApiError } from "@/lib/utils";
import type { UserModel, UserWithPassword } from "@/types/users";

export async function createUserApi(
  data: UserModel,
  token: string | null
) : Promise<UserWithPassword> {
  const response = await fetch("/api/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      role: data.isAdmin ? "admin" : "user",
    }),
  });

  const result = await response.json();
  
    if (!response.ok) {
      throw new ApiError(
        response.status === 401 ? 'User creation failed' : `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        result,
        response.headers
      );
    }
  
    return result;
};