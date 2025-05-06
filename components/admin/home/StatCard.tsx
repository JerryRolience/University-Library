export function StatCard({ label, value, delta, loading = false }: { label: string; value: number; delta: number; loading?: boolean }) {
  const isPositive = delta >= 0;

  return (
    <div className="bg-white p-5 flex-1 rounded-xl shadow flex flex-col gap-1 w-[350px] min-h-[120px]">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-lg">{label}</span>
        {!loading && delta !== 0 && <span className={`text-sm flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>{isPositive ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}</span>}
      </div>

      {loading ? <div className="animate-pulse h-8 w-1/2 bg-gray-200 rounded mt-4" /> : <h3 className="text-3xl font-bold mt-4">{value}</h3>}
    </div>
  );
}
