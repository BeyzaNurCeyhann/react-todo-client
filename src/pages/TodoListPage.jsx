import { useTodos } from '../hooks/useTodos';

function TodoListPage() {
  const queryParams = {
    page: 1,
    limit: 10,
    sort: 'due_date',
    order: 'asc',
    status: 'completed',
  };

  const { todos, loading, error } = useTodos(queryParams);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Listesi</h1>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListPage;