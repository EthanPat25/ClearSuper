export const fetch_industry_weightings = async (
  fund: string,
  sector: string,
) => {
  const params = new URLSearchParams({ fund, sector });
  const res = await fetch(`/api/industry_weightings?${params.toString()}`);

  if (!res.ok)
    throw new Error(`Failed to fetch sector weightings: ${res.status}`);
  return res.json();
};
