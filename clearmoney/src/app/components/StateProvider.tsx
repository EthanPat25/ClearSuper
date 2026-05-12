"use client";

import { createStore } from "little-state-machine";

createStore({
  Fund: "",
  option: "",
  age: 0,
  balance: 0,
});

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
