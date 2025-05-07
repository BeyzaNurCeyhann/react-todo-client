function Pagination({ pagination, onPageChange, onLimitChange }) {
    if (!pagination) return null;

    const pages = [];
    for (let i = 1; i <= pagination.last_page; i++) {
        pages.push(i);
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">

            <div className="flex gap-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded ${pagination.current_page === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div>
                <label className="text-sm text-gray-600 mr-2">Satır Sayısı:</label>
                <select
                    value={pagination.per_page}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
}
export default Pagination;