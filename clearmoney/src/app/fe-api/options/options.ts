export const fetch_options = async (fund: string) => {
  const params = new URLSearchParams({ fund });
  const res = await fetch(`/api/options?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch options: ${res.status}`);
  return res.json();
};

export const fetch_option_allocations = async (option_ids: string[]) => {
  const params = new URLSearchParams({ option_ids: option_ids.join(",") });
  const res = await fetch(`/api/option-allocations?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch allocations: ${res.status}`);
  return res.json();
};
