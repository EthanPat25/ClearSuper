import { AllocationPie } from "../types/holdings";

const AllocationPieComponent = ({
  allocation,
}: {
  allocation: AllocationPie;
}) => {
  const size = 40,
    cx = 20,
    cy = 20,
    r = 11,
    strokeW = 9;
  const circ = 2 * Math.PI * r;

  const segments = [
    { value: allocation.listed, color: "#00C49F" },
    { value: allocation.unlisted, color: "#3B82F6" },
    { value: allocation.cashAndBonds, color: "#F59E0B" },
  ].filter((s) => s.value > 0);

  let offset = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="flex-shrink-0"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeW}
      />
      {segments.map((s, i) => {
        const dash = (s.value / 100) * circ;
        const circle = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
        offset -= dash;
        return circle;
      })}
    </svg>
  );
};

export default AllocationPieComponent;
