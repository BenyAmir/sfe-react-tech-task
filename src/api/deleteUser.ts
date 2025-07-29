
// If ids is an array, delete group; else, delete single
export async function deleteUserApi(ids: number | number[], token: string | null) {
  let url: string;
  if (Array.isArray(ids)) {
    url = `/api/users/delete?ids=${ids.join(",")}`;
  } else {
    url = `/api/users/${ids}`;
  }
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate network delay
  const res = await fetch(url, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
