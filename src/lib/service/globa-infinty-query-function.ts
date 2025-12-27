export async function infintyQuiry<ResponseType>({
  url,
  pageParam = 1,

}: {
  url: string;
  pageParam?: number | unknown;
  limit?: number;
}) {
  const query = new URLSearchParams({
    page: String(pageParam),

  }).toString();

  const res = await fetch(`${url}?${query}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Network error");
  }

  const payload: ResponseType = await res.json();

  return payload;
}
