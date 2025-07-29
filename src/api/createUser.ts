import type { UserCreateModel, UserWithPassword } from "@/types/users";

export async function createUserApi(
  data: UserCreateModel,
  token: string | null
) : Promise<UserWithPassword> {
  const response = await fetch("http://localhost:3000/api/users/create", {
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
  if (!response.ok) {
    throw new Error("User creation failed");
  }
  return response.json();
};