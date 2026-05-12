import { GlobalState } from "little-state-machine";
import { SubmitHandler } from "react-hook-form";

export const WizardFormSubmit: SubmitHandler<GlobalState> = async (values) => {
  const params = new URLSearchParams({
    fund: values.Fund,
    option: values.option,
  });
  const data = await fetch_holdings(params);
  return data;
};

const fetch_holdings = async (params: URLSearchParams) => {
  const res = await fetch(`/api/holdings?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch holdings: ${res.status}`);
  return res.json();
};

export const fetch_options = async (fund: string) => {
  console.log("fetch_options called with fund:", fund);
  const params = new URLSearchParams({ fund });
  const res = await fetch(`/api/options?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch options: ${res.status}`);
  return res.json();
};
