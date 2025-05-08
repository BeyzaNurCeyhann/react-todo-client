import { useEffect, useState } from 'react';
import { fetchStatusStats, fetchPriorityStats } from "../services/statService";
import { fetchUpcomingTodos, updateTodoStatus } from "../services/todoService";

function Dashboard() {
    const [statusStats, setStatusStats] = useState({});
    const [priorityStats, setPriorityStats] = useState({});
    const [upcomingTodos, setUpcomingTodos] = useState([]);

    useEffect(() => {
        const loadStats = async () => {
            const statusRes = await fetchStatusStats();
            const priorityRes = await fetchPriorityStats();
            const upcomingRes = await fetchUpcomingTodos();

            if (statusRes.status === 'success') setStatusStats(statusRes.data);
            if (priorityRes.status === 'success') setPriorityStats(priorityRes.data);
            if (upcomingRes.status === 'success') setUpcomingTodos(upcomingRes.data);
        };

        loadStats();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        await updateTodoStatus(id, newStatus);
        setUpcomingTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, status: newStatus } : todo
            )
        );
    };

    const statusColors = {
        pending: 'text-blue-600',
        in_progress: 'text-yellow-500',
        completed: 'text-green-600',
        cancelled: 'text-red-600',
    };

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

            {/* Durum Bazlı Kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(statusStats)
                    .filter(([key]) => !['total', 'overdue'].includes(key))
                    .map(([status, count]) => (
                        <div key={status} className="bg-white p-4 shadow rounded text-center">
                            <div className="text-sm text-gray-500 capitalize">
                                {status.replace('_', ' ')}
                            </div>
                            <div className={`text-3xl font-bold ${statusColors[status] || 'text-gray-700'}`}>
                                {count}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Ekstra Kartlar: Total & Overdue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {'total' in statusStats && (
                    <div className="bg-white p-4 shadow rounded text-center">
                        <div className="text-sm text-gray-500">Toplam Todo</div>
                        <div className="text-3xl font-bold text-gray-700">{statusStats.total}</div>
                    </div>
                )}
                {'overdue' in statusStats && (
                    <div className="bg-white p-4 shadow rounded text-center">
                        <div className="text-sm text-gray-500">Geciken</div>
                        <div className="text-3xl font-bold text-red-600">{statusStats.overdue}</div>
                    </div>
                )}
            </div>

            {/* Öncelik İstatistikleri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(priorityStats).map(([priority, count]) => (
                    <div key={priority} className="bg-white p-4 shadow rounded text-center">
                        <div className="text-sm text-gray-500 capitalize">{priority}</div>
                        <div className="text-3xl font-bold text-yellow-500">{count}</div>
                    </div>
                ))}
            </div>

            {/* Yaklaşan Todo’lar */}
            <div>
                <h2 className="text-xl font-semibold mt-10 mb-4">Yaklaşan Todo’lar</h2>
                <div className="space-y-2">
                    {upcomingTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white p-4 shadow rounded flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">{todo.title}</div>
                                <div className="text-sm text-gray-500">
                                    {new Date(todo.due_date).toLocaleDateString('tr-TR')}
                                </div>
                            </div>
                            <select
                                value={todo.status}
                                onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="pending">Bekliyor</option>
                                <option value="in_progress">Devam Ediyor</option>
                                <option value="completed">Tamamlandı</option>
                                <option value="cancelled">İptal Edildi</option>
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;