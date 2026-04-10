import { GlobalState } from "little-state-machine";
import { SubmitHandler } from "react-hook-form";

export const WizardFormSubmit: SubmitHandler<GlobalState> = async (values) => {
  console.log(values.Fund);
  console.log(values.option);
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
