export async function getUserApi(id:string,token: string | null) {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    headers: { authorization: `Bearer ${token}` || "" },
  });
  return response.json();
}
