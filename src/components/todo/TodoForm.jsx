import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchCategories } from '../../services/categoryService';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .max(255, 'Başlık en fazla 255 karakter olabilir')
        .required('Başlık zorunludur'),
    description: Yup.string(),
    status: Yup.string().oneOf(['pending', 'in_progress', 'completed', 'cancelled']),
    priority: Yup.string().oneOf(['low', 'medium', 'high']),
    due_date: Yup.date().nullable(),
    category_ids: Yup.array()
        .of(Yup.number())
        .min(1, 'En az bir kategori seçmelisiniz'),
});

function TodoForm({ initialData = {}, onSubmit }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories();
                if (response.status === 'success') {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Kategori çekme hatası:', error);
            }
        };

        loadCategories();
    }, []);

    const initialValues = {
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        category_ids: [],
        ...initialData,
        category_ids: initialData?.categories?.map(c => c.id) || [],
        due_date: initialData?.due_date?.slice(0, 10) || '',
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit({
                    ...values,
                    category_ids: values.category_ids.map(Number),
                });
            }}
        >
            {({ values, handleChange, setFieldValue }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block font-medium">Başlık</label>
                        <Field
                            name="title"
                            className="w-full border px-3 py-2 rounded"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <div>
                        <label className="block font-medium">Açıklama</label>
                        <Field
                            as="textarea"
                            name="description"
                            className="w-full border px-3 py-2 rounded"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <div>
                        <label className="block font-medium">Durum</label>
                        <Field as="select" name="status" className="w-full border px-3 py-2 rounded">
                            <option value="pending">Bekliyor</option>
                            <option value="in_progress">Devam Ediyor</option>
                            <option value="completed">Tamamlandı</option>
                            <option value="cancelled">İptal Edildi</option>
                        </Field>
                    </div>

                    <div>
                        <label className="block font-medium">Öncelik</label>
                        <Field as="select" name="priority" className="w-full border px-3 py-2 rounded">
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek</option>
                        </Field>
                    </div>

                    <div>
                        <label className="block font-medium">Bitiş Tarihi</label>
                        <Field
                            type="date"
                            name="due_date"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Kategoriler</label>
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map(cat => (
                                <label key={cat.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="category_ids"
                                        value={cat.id}
                                        checked={values.category_ids.includes(cat.id)}
                                        onChange={() => {
                                            const set = new Set(values.category_ids);
                                            if (set.has(cat.id)) set.delete(cat.id);
                                            else set.add(cat.id);
                                            setFieldValue('category_ids', Array.from(set));
                                        }}
                                    />
                                    <span>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                        <ErrorMessage name="category_ids" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                        Kaydet
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default TodoForm;
