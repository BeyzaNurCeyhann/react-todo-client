import { useState, useEffect } from 'react';

function TodoFilter({ onChange }) {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sort, setSort] = useState('due_date');
  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    onChange((prev) => ({
      ...prev,
      page: 1,
      limit,
      sort,
      order,
      status: status || undefined,
      priority: priority || undefined,
    }));
  }, [status, priority, sort, order, limit]);

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-6 items-end">

      {/* Durum */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tümü</option>
          <option value="pending">Bekliyor</option>
          <option value="in_progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal Edildi</option>
        </select>
      </div>

      {/* Öncelik */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Öncelik</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tümü</option>
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>
      </div>

      {/* Sıralama Alanı */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama Alanı</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="due_date">Teslim Tarihi</option>
          <option value="priority">Öncelik</option>
          <option value="created_at">Oluşturulma Tarihi</option>
        </select>
      </div>

      {/* Sıralama */}
      <div className="flex-1 min-w-[160px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama Yönü</label>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>

    </div>
  );
}

export default TodoFilter;
