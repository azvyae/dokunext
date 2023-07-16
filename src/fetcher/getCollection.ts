export async function getCollection(token: string | null, collection: string) {
  const res = await fetch(
    `/postman/api?` +
    new URLSearchParams({
      collection: collection
    }),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return res;
}