import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    Fund: string;
    option: string;
    age?: number;
    balance: number;
  }
}
