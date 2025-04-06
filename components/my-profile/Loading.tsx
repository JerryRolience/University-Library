import { IoRefresh } from "react-icons/io5";

export function Loading({ handleRefresh }: { handleRefresh: () => void }) {
  return (
    <div className="w-full xl:flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-light-100">Borrowed Books</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-xs sm:text-sm text-light-200 hover:text-light-100 transition-colors"
        >
          <IoRefresh size={14} />
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-dark-300 rounded-lg p-5 lg:p-24 h-64 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
