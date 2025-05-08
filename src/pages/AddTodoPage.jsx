import { useNavigate } from 'react-router-dom';
import { createTodo } from '../services/todoService';
import TodoForm from '../components/todo/TodoForm';
import { toast } from 'react-toastify';

export default function AddTodoPage() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            const response = await createTodo(formData);
            if (response.status === 'success') {
                toast.success('Yeni todo başarıyla oluşturuldu!');
                navigate('/todos');
            } else {
                toast.error('Ekleme işlemi başarısız.');
            }
        } catch (error) {
            toast.error('Sunucu hatası oluştu.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Yeni Todo Oluştur</h1>
                <TodoForm onSubmit={handleCreate} />
            </div>
        </div>
    );
}
