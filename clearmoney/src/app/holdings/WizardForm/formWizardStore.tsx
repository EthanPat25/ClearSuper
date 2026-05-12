import { createStore } from "little-state-machine";

export type FormDataType = {
  Fund: string;
  option: string;
  age?: number;
  balance: number;
};

createStore({
  Fund: "",
  option: "",
  age: undefined,
  balance: 0,
});

export function updateForm(
  state: FormDataType,
  payload: Partial<FormDataType>
) {
  return {
    ...state,
    ...payload,
  };
}
