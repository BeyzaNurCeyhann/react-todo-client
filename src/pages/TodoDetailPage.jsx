import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodoById, updateTodo } from '../services/todoService';
import TodoForm from '../components/todo/TodoForm';
import { toast } from 'react-toastify';

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('detay');

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await fetchTodoById(id);
        if (response.status === 'success') {
          setTodo(response.data);
        } else {
          toast.error('Todo bulunamadı.');
        }
      } catch (error) {
        toast.error('Sunucu hatası.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await updateTodo(id, formData);
      if (response.status === 'success') {
        toast.success('Todo güncellendi!');
        navigate('/todos');
      } else {
        toast.error('Güncelleme başarısız.');
      }
    } catch (error) {
      toast.error('Sunucu hatası.');
      console.error(error);
    }
  };

  if (loading) return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo Detay / Düzenle</h1>

        {/* Sekmeler */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('detay')}
            className={`px-4 py-2 rounded-t-md ${activeTab === 'detay'
                ? 'bg-white border-b-2 border-blue-600 font-bold text-blue-600'
                : 'bg-gray-200 text-gray-700'
              }`}
          >
            Detay
          </button>
          <button
            onClick={() => setActiveTab('duzenle')}
            className={`px-4 py-2 rounded-t-md ${activeTab === 'duzenle'
                ? 'bg-white border-b-2 border-blue-600 font-bold text-blue-600'
                : 'bg-gray-200 text-gray-700'
              }`}
          >
            Düzenle
          </button>
        </div>

        {/* Sekme İçeriği */}
        {activeTab === 'detay' && (
          <div className="space-y-4 text-gray-800">
            <p><strong>Başlık:</strong> {todo.title}</p>
            <p><strong>Açıklama:</strong> {todo.description}</p>
            <p><strong>Durum:</strong> {todo.status}</p>
            <p><strong>Öncelik:</strong> {todo.priority}</p>
            <p><strong>Teslim Tarihi:</strong> {new Date(todo.due_date).toLocaleDateString('tr-TR')}</p>
            <div>
              <strong>Kategoriler:</strong>{' '}
              {todo.categories?.map(cat => (
                <span
                  key={cat.id}
                  className="inline-block text-white text-sm px-2 py-1 rounded mr-2"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'duzenle' && (
          <TodoForm initialData={todo} onSubmit={handleUpdate} />
        )}
      </div>
    </div>
  );
}
