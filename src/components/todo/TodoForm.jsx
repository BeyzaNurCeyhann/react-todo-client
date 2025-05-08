import { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/categoryService';

function TodoForm({ initialData = {}, onSubmit }) {
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        category_ids: [],
        ...initialData,
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories();
                if (response.status === 'success') {
                    setCategories(response.data);

                    if (initialData && initialData.categories) {
                        const ids = initialData.categories.map((cat) => cat.id);
                        setForm((prev) => ({
                            ...prev,
                            ...initialData,
                            category_ids: ids,
                        }));
                    }
                }
            } catch (error) {
                console.error('Kategori çekme hatası:', error);
            }
        };

        loadCategories();
    }, [initialData.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryCheckboxChange = (id) => {
        setForm((prev) => {
            const updated = prev.category_ids.includes(id)
                ? prev.category_ids.filter((catId) => catId !== id)
                : [...prev.category_ids, id];
            return { ...prev, category_ids: updated };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const preparedForm = {
            ...form,
            category_ids: form.category_ids.map((cat) =>
                typeof cat === 'object' ? cat.id : Number(cat)
            ),
        };

        onSubmit?.(preparedForm);
    };

    const handleUpdateSubmit = async (formData) => {
        try {
            const updated = await updateTodo(formData.id, formData);
            dispatch(updateTodoLocally(updated.data));
            setEditingTodo(null);
            toast.success('Todo başarıyla güncellendi!');
        } catch (error) {
            toast.error('Güncelleme başarısız.');
            console.error(error);
        }
    };

    if (!form.title && !form.description && form.category_ids.length === 0) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium">Başlık</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>


            <div>
                <label className="block font-medium">Açıklama</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>


            <div>
                <label className="block font-medium">Durum</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                    <option value="pending">Bekliyor</option>
                    <option value="in_progress">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">İptal Edildi</option>
                </select>
            </div>


            <div>
                <label className="block font-medium">Öncelik</label>
                <select name="priority" value={form.priority} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Bitiş Tarihi</label>
                <input
                    type="date"
                    name="due_date"
                    value={form.due_date?.slice(0, 10) || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>


            <div>
                <label className="block font-medium mb-1">Kategoriler</label>

                {console.log("form.category_ids", form.category_ids)}
                {console.log("ncategories", categories)}

                <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => {
                        const selectedCategoryIds = form.category_ids.map((c) =>
                            typeof c === 'object' ? c.id : Number(c)
                        );

                        const isChecked = selectedCategoryIds.includes(cat.id);

                        return (
                            <label key={cat.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={cat.id}
                                    checked={isChecked}
                                    onChange={() => handleCategoryCheckboxChange(cat.id)}
                                />
                                <span>{cat.name}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                Kaydet
            </button>
        </form>
    );
}

export default TodoForm;