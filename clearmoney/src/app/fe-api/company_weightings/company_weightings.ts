export const fetch_company_weightings = async (
  fund: string,
  companyId: string,
) => {
  const params = new URLSearchParams({ fund, companyId });
  const res = await fetch(
    `/api/company_weightings_across_options?${params.toString()}`,
  );
  if (!res.ok)
    throw new Error(`Failed to fetch company weightings: ${res.status}`);
  return res.json();
};
