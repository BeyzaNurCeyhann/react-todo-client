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
    <div className="flex flex-wrap gap-4 items-end mb-6">

      <div>
        <label className="block text-sm font-medium text-gray-700">Durum</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Tümü</option>
          <option value="pending">Bekliyor</option>
          <option value="in_progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal Edildi</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Öncelik</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Tümü</option>
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sıralama Alanı</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="due_date">Teslim Tarihi</option>
          <option value="priority">Öncelik</option>
          <option value="created_at">Oluşturulma Tarihi</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sıralama</label>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>


    </div>
  );
}

export default TodoFilter;