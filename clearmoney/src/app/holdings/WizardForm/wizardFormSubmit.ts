import { GlobalState } from "little-state-machine";
import { SubmitHandler } from "react-hook-form";
import { fetch_holdings } from "@/app/fe-api/holdings/holdings";

export const WizardFormSubmit: SubmitHandler<GlobalState> = async (values) => {
  const params = new URLSearchParams({
    fund: values.Fund,
    option: values.option_id,
  });
  const data = await fetch_holdings(params);
  return data;
};
