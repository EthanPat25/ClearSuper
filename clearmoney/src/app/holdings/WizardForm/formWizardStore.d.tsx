import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    Fund: string;
    option_name: string;
    option_id: string;
    age?: number;
    balance: number;
    currentStep: string;
  }
}
