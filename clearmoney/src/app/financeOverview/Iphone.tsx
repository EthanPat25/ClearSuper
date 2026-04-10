import { Iphone } from "@/components/ui/iphone";

export function Phone() {
  return (
    <div className="relative w-[19rem]">
      <div className="pointer-events-none absolute -inset-10 flex items-center justify-center">
        <div className="bg-teal-200/30 blur-2xl rounded-full w-[24rem] h-[24rem]" />
      </div>
      <Iphone className="relative fill-[#1a1a1a]" src="/test.png" />
    </div>
  );
}
