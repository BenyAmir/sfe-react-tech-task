export async function deleteUserApi(id: number, token: string | null) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
