import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const allocations = [
  { name: "Property", value: "49.0%", color: "#00C49F" },
  { name: "Infrastructure", value: "43.0%", color: "#0088FE" },
  { name: "Private Equity", value: "5.0%", color: "#FFBB28" },
  { name: "Alternatives", value: "3.0%", color: "#FF8042" },
];

export function TablePrivate() {
  const totalValue = "$1000"; // replace with dynamic calc later

  return (
    <div className="rounded-2xl border bg-orange-50 shadow-md w-[23rem]">
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-100">
            <TableHead className="font-semibold text-gray-800">
              Unlisted Assets
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
              <TableCell className="text-right">{item.value}</TableCell>
            </TableRow>
          ))}

          <TableRow className="bg-orange-100 font-semibold">
            <TableCell>Total Unlisted</TableCell>
            <TableCell className="text-right">{totalValue}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
