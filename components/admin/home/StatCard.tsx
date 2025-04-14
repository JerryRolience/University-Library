export function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: number;
  delta: number;
}) {
  const isPositive = delta >= 0;

  return (
    <div className="bg-white p-5 flex-1 rounded-xl shadow flex flex-col gap-1 w-[350px]">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-lg">{label}</span>
        <span
          className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}
        </span>
      </div>
      <h3 className="text-3xl font-bold mt-4">{value}</h3>
    </div>
  );
}
