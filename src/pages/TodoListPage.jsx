import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTodos } from '../hooks/useTodos';
import { updateTodoStatus, deleteTodo } from '../services/todoService'; // ✅ deleteTodo eklendi
import {
  updateTodoStatusLocally,
  removeTodo, // ✅ slice'dan removeTodo eklendi
} from '../store/slices/todoSlice';

import TodoList from '../components/todo/TodoList';
import TodoFilter from '../components/todo/TodoFilter';
import Pagination from '../components/common/Pagination';

function TodoListPage() {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [filters, setFilters] = useState({
    sort: 'due_date',
    order: 'asc',
    status: undefined,
    priority: undefined,
  });

  const { todos, loading, error } = useTodos(filters, query, pagination);
  const paginationMeta = useSelector((state) => state.todos.meta?.pagination || state.todos.meta);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [query]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination({ page: 1, limit: newLimit });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setQuery('');
    setSearch('');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateTodoStatus(id, newStatus);
      console.log('🔥 API Yanıtı:', response);

      if (response.status === 'success') {
        dispatch(updateTodoStatusLocally(response.data));
      } else {
        throw new Error(response.message || 'API başarısız yanıt verdi');
      }
    } catch (err) {
      alert('Durum güncellenemedi');
      console.error('Hata:', err);
    }
  };

  // ✅ Silme işlemi burada
  const handleDelete = async (id) => {
    if (!window.confirm('Bu todo silinsin mi?')) return;
    try {
      await deleteTodo(id);
      dispatch(removeTodo(id));
    } catch (err) {
      alert('Silme işlemi başarısız oldu');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center h-[48px] flex items-center justify-center">
        Todo Listesi
      </h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Başlık veya açıklama ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ara
        </button>
      </form>

      <TodoFilter onChange={handleFilterChange} />

      {loading && <div>Yükleniyor...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <TodoList
        todos={todos}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete} // ✅ gönderildi
      />

      <Pagination
        pagination={paginationMeta}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}

export default TodoListPage;