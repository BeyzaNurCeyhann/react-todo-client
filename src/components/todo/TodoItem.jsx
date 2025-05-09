import { useNavigate } from 'react-router-dom';

function TodoItem({ todo, onStatusChange, onDelete }) {
  const { id, title, description, due_date, created_at, status, priority, categories } = todo;
  const navigate = useNavigate();

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const statusOptions = [
    { value: 'pending', label: 'Bekliyor' },
    { value: 'in_progress', label: 'Devam Ediyor' },
    { value: 'completed', label: 'Tamamlandı' },
    { value: 'cancelled', label: 'İptal Edildi' },
  ];

  return (
    <div className="h-[200px] bg-white shadow-md rounded p-4 border border-gray-200 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>

        <div className="text-sm text-right leading-snug">
          <div>
            <span className="font-medium text-blue-700">Oluşturulma Tarihi:</span>{' '}
            <span className="text-blue-700">{formatDate(created_at)}</span>
          </div>
          <div>
            <span className="font-medium text-red-700">Teslim Tarihi:</span>{' '}
            <span className="text-red-700">{formatDate(due_date)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-3 line-clamp-3">{description}</p>

      <div className="flex flex-wrap gap-2 text-sm justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{priority}</span>
          {categories?.map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-1 rounded text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => onStatusChange?.(id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => navigate(`/todos/${id}/edit`)}
            className="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
          >
            Düzenle
          </button>

          <button
            onClick={() => onDelete?.(id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
