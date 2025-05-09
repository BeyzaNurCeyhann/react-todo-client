import { useEffect, useState } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategoryTodos
} from '../services/categoryService';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', color: '#000000' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      if (res.status === 'success') {
        setCategories(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      toast.error('Kategoriler yüklenemedi');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCategory(editingId, form);
        toast.success('Kategori güncellendi ✅');
      } else {
        await createCategory(form);
        toast.success('Kategori oluşturuldu ✅');
      }
      setForm({ name: '', color: '#000000' });
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      toast.error('İşlem başarısız');
      console.error(err);
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, color: category.color });
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu kategori silinecek!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal',
      confirmButtonColor: '#e3342f',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategory(id);
      toast.success('Kategori silindi ✅');
      await loadCategories();
    } catch (err) {
      toast.error('Silme işlemi başarısız');
      console.error(err);
    }
  };

  const handleShowTodos = async (categoryId) => {
    try {
      const res = await fetchCategoryTodos(categoryId);
      if (res.status === 'success') {
        const todoList = res.data.length
          ? `<ul class="text-left">${res.data.map(todo => `<li>• ${todo.title}</li>`).join('')}</ul>`
          : '<p>Bu kategoriye ait görev yok.</p>';

        Swal.fire({
          title: 'Kategori Görevleri',
          html: todoList,
          confirmButtonText: 'Kapat',
          width: 500
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Hata', 'Todo bilgileri alınamadı.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">📁 Kategori Yönetimi</h1>

      {/* Kategori Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full border px-3 py-2 rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
          <input
            type="color"
            value={form.color}
            onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
            className="w-12 h-10 p-0 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', color: '#000000' });
              setEditingId(null);
            }}
            className="ml-4 text-sm text-gray-500 hover:underline"
          >
            İptal
          </button>
        )}
      </form>

      {/* Kategori Listesi */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-gray-50 border border-gray-200 rounded p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: cat.color }}></div>
              <span className="font-medium">{cat.name}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleShowTodos(cat.id)}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Todos
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
