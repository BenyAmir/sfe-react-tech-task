import type { UserModel } from "@/types/users";

export async function editUserApi(
  id: number,
  data: UserModel,
  token: string | null
) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
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
  if (!response.ok) {
    throw new Error("User creation failed");
  }
  return response.json();
}
