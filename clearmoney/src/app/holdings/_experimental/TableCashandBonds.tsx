import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataforwardProps } from "./Components/BondsandCashHoldings";
import { NumericFormat } from "react-number-format";

export function TableCashandBonds({
  dataforward,
}: {
  dataforward: dataforwardProps;
}) {
  const totalValue = dataforward.totalamount.toFixed(2); // replace with dynamic calc later

  const cashPct: number = dataforward.cashAmount.toFixed(2);
  const bondsPct: number = dataforward.bondsAmount.toFixed(2);
  const allocations = [
    { name: "Cash", value: cashPct, color: "#2E7D32" }, // green
    { name: "Fixed Interest (Bonds)", value: bondsPct, color: "#1976D2" }, // blue
  ];

  return (
    <div className="rounded-2xl border bg-orange-50 shadow-md w-[23rem]">
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-100">
            <TableHead className="font-semibold text-gray-800">
              Cash and Fixed Interest (Bonds)
            </TableHead>
            <TableHead className="font-semibold text-gray-800 text-right">
              Allocation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocations.map((item) => (
            <TableRow key={item.name} className="hover:bg-orange-100/30">
              <TableCell className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </TableCell>
              <TableCell className="text-right">
                <NumericFormat
                  value={item.value}
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  displayType="text"
                />
              </TableCell>
            </TableRow>
          ))}

          {/* Total row */}
          <TableRow className="bg-orange-100 font-semibold">
            <TableCell>Total Cash and Bonds</TableCell>
            <TableCell className="text-right">
              <NumericFormat
                value={totalValue}
                thousandSeparator
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                displayType="text"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
