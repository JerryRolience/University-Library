import { IoRefresh } from "react-icons/io5";

export function ErrorComponent({
  error,
  handleRefresh,
}: {
  error: string;
  handleRefresh: () => void;
}) {
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
      <div className="bg-dark-300 rounded-lg p-6 text-center">
        <p className="text-light-200">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-light-100 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
