import type { User } from "@/types/users";

export async function getUsersApi(token: string | null) : Promise<User[]> {
  const response = await fetch("/api/users", {
    headers: { authorization: `Bearer ${token}` || "" },
  });
  return response.json();
}
