import { createStore } from "little-state-machine";

import { FormDataType } from "../types/holdings";

export function updateForm(
  state: FormDataType,
  payload: Partial<FormDataType>,
) {
  return {
    ...state,
    ...payload,
  };
}
