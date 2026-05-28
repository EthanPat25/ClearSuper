export const fetch_options = async (fund: string) => {
  const params = new URLSearchParams({ fund });
  const res = await fetch(`/api/options?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch options: ${res.status}`);
  return res.json();
};
