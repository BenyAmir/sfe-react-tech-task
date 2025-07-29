import { ApiError } from "@/lib/utils";
import type { User } from "@/types/users";

export async function getUsersApi(token: string | null) : Promise<User[]> {
  const response = await fetch("/api/users", {
    headers: { authorization: `Bearer ${token}` || "" },
  });

  const result = await response.json();
  
    if (!response.ok) {
      throw new ApiError(
        response.status === 401 ? 'An error occurred while fetching users.' : `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        result,
        response.headers
      );
    }
  
    return result;
}
