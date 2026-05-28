export const fetch_holdings = async (params: URLSearchParams) => {
  const res = await fetch(`/api/holdings?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch holdings: ${res.status}`);
  return res.json();
};
