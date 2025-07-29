import { ApiError } from "@/lib/utils";

// If ids is an array, delete group; else, delete single
export async function deleteUserApi(ids: number | number[], token: string | null) : Promise<void>  {
  let url: string;
  if (Array.isArray(ids)) {
    url = `/api/users/delete?ids=${ids.join(",")}`;
  } else {
    url = `/api/users/${ids}`;
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers: { authorization: `Bearer-${token}` },
  });

  const result = await response.json();
    
      if (!response.ok) {
        throw new ApiError(
          response.status === 401 ? 'Failed to delete' : `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText,
          result,
          response.headers
        );
      }
    
      return result;
}
