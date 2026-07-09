export const fetch_isLifecycle = async (fundName: string) => {
  const params = new URLSearchParams({ fund_name: fundName });
  const res = await fetch(`/api/checkLifecycle?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok)
    throw new Error(`Failed to fetch lifecycle status: ${res.status}`);
  return res.json();
};
