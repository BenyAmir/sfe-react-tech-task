import type { User } from "@/types/users";

export async function getUserApi(id:string,token: string | null) : Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    headers: { authorization: `Bearer ${token}`},
  });
  return response.json();
}
