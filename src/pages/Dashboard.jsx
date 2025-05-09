import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchStatusStats, fetchPriorityStats } from "../services/statService";
import { fetchUpcomingTodos, updateTodoStatus } from "../services/todoService";

function Dashboard() {
    const [statusStats, setStatusStats] = useState(null);
    const [priorityStats, setPriorityStats] = useState(null);
    const [upcomingTodos, setUpcomingTodos] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadStats = async () => {
            const [statusRes, priorityRes, upcomingRes] = await Promise.all([
                fetchStatusStats(),
                fetchPriorityStats(),
                fetchUpcomingTodos(),
            ]);

            if (statusRes.status === 'success') setStatusStats(statusRes.data);
            if (priorityRes.status === 'success') setPriorityStats(priorityRes.data);
            if (upcomingRes.status === 'success') setUpcomingTodos(upcomingRes.data);
        };

        loadStats();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateTodoStatus(id, newStatus);
            setUpcomingTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, status: newStatus } : todo
                )
            );
            toast.success("Durum güncellendi!");
        } catch (err) {
            toast.error("Durum güncellenemedi!");
        }
    };

    const statusColors = {
        pending: 'text-blue-600',
        in_progress: 'text-yellow-500',
        completed: 'text-green-600',
        cancelled: 'text-red-600',
    };

    return (
        <div className="p-6 space-y-10">
            {/* Başlık ve Sağ Üst İstatistik Kutuları */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h1 className="text-2xl font-bold">📊 Todo İstatistikleri</h1>
                {statusStats && (
                    <div className="flex gap-4">
                        <div className="bg-green-100 px-4 py-2 rounded shadow text-center">
                            <div className="text-xs text-gray-600 font-medium">Toplam Todo</div>
                            <div className="text-lg font-bold text-green-800">{statusStats.total}</div>
                        </div>
                        <div className="bg-red-100 px-4 py-2 rounded shadow text-center">
                            <div className="text-xs text-gray-600 font-medium">Geciken Todo</div>
                            <div className="text-lg font-bold text-red-800">{statusStats.overdue}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Duruma Göre */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Duruma Göre</h2>
                {!statusStats ? (
                    <div className="text-gray-500">Yükleniyor...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(statusStats)
                            .filter(([key]) => !['total', 'overdue'].includes(key))
                            .map(([status, count]) => (
                                <div key={status} className="bg-white p-4 shadow rounded text-center">
                                    <div className="text-sm text-gray-500 capitalize">{status.replace('_', ' ')}</div>
                                    <div className={`text-3xl font-bold ${statusColors[status] || 'text-gray-700'}`}>
                                        {count}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Önceliğe Göre */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Önceliğe Göre</h2>
                {!priorityStats ? (
                    <div className="text-gray-500">Yükleniyor...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(priorityStats)
                            .filter(([key]) => !['total', 'overdue'].includes(key))
                            .map(([priority, count]) => (
                                <div key={priority} className="bg-white p-4 shadow rounded text-center">
                                    <div className="text-sm text-gray-500 capitalize">{priority}</div>
                                    <div className="text-3xl font-bold text-yellow-500">{count}</div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Yaklaşan Todo’lar */}
            <div>
                <h2 className="text-xl font-semibold mt-10 mb-4">Yaklaşan Todo’lar</h2>
                {!upcomingTodos ? (
                    <div className="text-gray-500">Yükleniyor...</div>
                ) : upcomingTodos.length === 0 ? (
                    <div className="text-gray-500">Yaklaşan todo bulunamadı.</div>
                ) : (
                    <div className="space-y-3">
                        {upcomingTodos.map((todo) => (
                            <div
                                key={todo.id}
                                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
                            >
                                <div className="mb-2 sm:mb-0">
                                    <div className="font-semibold text-gray-800">{todo.title}</div>
                                    <div className="text-sm text-gray-600">
                                        Bitiş: {new Date(todo.due_date).toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                                    <select
                                        value={todo.status}
                                        onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                    >
                                        <option value="pending">Bekliyor</option>
                                        <option value="in_progress">Devam Ediyor</option>
                                        <option value="completed">Tamamlandı</option>
                                        <option value="cancelled">İptal Edildi</option>
                                    </select>
                                    <button
                                        onClick={() => navigate(`/todos/${todo.id}/edit`)}
                                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                                    >
                                        Detay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
